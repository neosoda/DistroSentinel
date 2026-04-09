#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import ast
import json
import os
import re
import sys
import time
from pathlib import Path
from typing import Any, Dict, List, Literal, Tuple

import requests

Difficulty = Literal["Débutant", "Intermédiaire", "Avancé", "Expert"]

ROOT = Path.cwd()
INPUT_FILE = ROOT / "src" / "data" / "rawDistros.ts"
OUTPUT_FILE = ROOT / "src" / "data" / "enrichedDistros.ts"

OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", "http://10.212.134.6:1234/v1")
MODEL = os.getenv("OPENAI_MODEL", "qwen2.5-coder-14b-instruct")
BATCH_SIZE = int(os.getenv("BATCH_SIZE", "8"))
MAX_RETRIES = int(os.getenv("MAX_RETRIES", "3"))
TIMEOUT = int(os.getenv("TIMEOUT", "180"))

RawDistro = Dict[str, str]
EnrichedDistro = Dict[str, Any]


def log(msg: str) -> None:
    print(msg, flush=True)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def extract_raw_array(ts_content: str) -> str:
    pattern = r"export\s+const\s+rawData\s*(?::\s*RawDistro\[\])?\s*=\s*(\[[\s\S]*?\])\s*;"
    match = re.search(pattern, ts_content)
    if not match:
        raise ValueError("Impossible de trouver export const rawData = [...] dans rawDistros.ts")
    return match.group(1)


def parse_ts_objects(array_literal: str) -> List[RawDistro]:
    # Transforme {distro:"X", base:"Y"} en dict Python via regex simple,
    # valable ici car le dataset est plat et string-only.
    objects = re.findall(r"\{([^{}]+)\}", array_literal, flags=re.S)
    if not objects:
        raise ValueError("Aucun objet trouvé dans rawData")

    result: List[RawDistro] = []
    for obj in objects:
        pairs = re.findall(r'(\w+)\s*:\s*"((?:[^"\\]|\\.)*)"', obj)
        item: RawDistro = {}
        for key, value in pairs:
            item[key] = bytes(value, "utf-8").decode("unicode_escape")
        required = {"distro", "base", "audience", "points", "usage"}
        if not required.issubset(item.keys()):
            raise ValueError(f"Entrée invalide détectée: {item}")
        result.append(item)
    return result


def chunked(data: List[RawDistro], size: int) -> List[List[RawDistro]]:
    return [data[i:i + size] for i in range(0, len(data), size)]


def normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", value.strip())


def infer_package_manager(raw: RawDistro) -> str:
    distro = raw["distro"].lower()
    base = raw["base"].lower()

    if "alpine" in distro:
        return "apk"
    if "gentoo" in distro:
        return "emerge"
    if "void" in distro:
        return "xbps"
    if "nixos" in distro:
        return "nix"
    if "haiku" in distro:
        return "pkgman"
    if "solus" in distro:
        return "eopkg"
    if "clear linux" in distro:
        return "swupd"
    if "pclinuxos" in distro:
        return "apt-rpm"
    if "tiny core" in distro:
        return "tce"
    if "openwrt" in distro:
        return "opkg"
    if "buildroot" in distro:
        return "build system interne"
    if "slackware" in distro:
        return "slackpkg"
    if "porteus" in distro:
        return "slackpkg / modules Porteus"
    if "slax" in distro:
        return "apt ou modules selon édition"
    if "qubes os" in distro:
        return "dnf/apt via templates"
    if "freebsd" in distro:
        return "pkg"
    if "openbsd" in distro:
        return "pkg_add"
    if "dragonflybsd" in distro:
        return "pkg"
    if "mageia" in distro:
        return "dnf"
    if "openmandriva" in distro:
        return "dnf"
    if "opensuse" in distro or "opensuse" in base:
        return "zypper"
    if "fedora silverblue" in distro:
        return "rpm-ostree + flatpak"
    if "endless os core" in distro:
        return "flatpak / ostree"
    if "nitrux" in distro:
        return "apt + appimage"

    if any(x in base for x in ["debian", "ubuntu"]) or any(
        x in distro for x in ["mint", "kali", "mx linux", "raspberry pi os"]
    ):
        return "apt"

    if any(x in base for x in ["arch"]) or any(
        x in distro for x in [
            "manjaro", "garuda", "endeavouros", "archcraft",
            "arcolinux", "artix", "rebornos", "cachyos", "holoiso"
        ]
    ):
        return "pacman"

    if "fedora" in base or any(x in distro for x in ["nobara", "bazzite"]):
        return "dnf"

    if any(x in base for x in ["rhel", "centos"]) or any(
        x in distro for x in ["almalinux", "rocky linux", "oracle linux", "centos stream"]
    ):
        return "dnf"

    return "à préciser"


def infer_release_model(raw: RawDistro) -> str:
    distro = raw["distro"].lower()
    base = raw["base"].lower()
    points = raw["points"].lower()
    usage = raw["usage"].lower()

    if "fedora silverblue" in distro:
        return "Immutable"
    if "opensuse microos" in distro:
        return "Immutable"
    if "endless os core" in distro:
        return "Immutable"
    if "nitrux" in distro:
        return "Hybride"
    if "buildroot" in distro or "openwrt" in distro:
        return "Spécialisé embarqué"
    if "gentoo" in distro:
        return "Rolling source-based"

    if any(x in distro for x in [
        "arch", "manjaro", "endeavouros", "garuda", "void",
        "solus", "artix", "rebornos", "cachyos", "holoiso"
    ]) or "rolling" in points:
        return "Rolling"

    if distro in {"ubuntu", "ubuntu server"}:
        return "Stable / LTS"

    if any(x in base for x in ["rhel"]) or any(
        x in distro for x in [
            "almalinux", "rocky linux", "oracle linux",
            "linux mint", "debian", "raspberry pi os", "mx linux"
        ]
    ):
        return "Stable / LTS"

    if "fedora" in distro:
        return "Release régulière"

    if "opensuse" in distro:
        return "Stable ou rolling selon édition"

    if "sécurité" in usage and "qubes" in distro:
        return "Stable orienté sécurité"

    return "Stable"


def infer_difficulty(raw: RawDistro) -> Difficulty:
    audience = raw["audience"].lower()
    distro = raw["distro"].lower()
    points = raw["points"].lower()

    if (
        "expert" in audience
        or any(x in distro for x in [
            "gentoo", "nixos", "openbsd", "freebsd", "dragonflybsd",
            "qubes", "buildroot", "tiny core", "kolibrios", "slackware"
        ])
    ):
        return "Expert"

    if (
        "avancé" in audience
        or any(x in distro for x in [
            "alpine", "void", "siduction", "clear linux", "fedora", "porteus"
        ])
        or "rolling" in points
    ):
        return "Avancé"

    if any(x in audience for x in ["intermédiaire", "pro", "gamer", "utilisateurs kde", "créatifs"]):
        return "Intermédiaire"

    return "Débutant"


def build_fallback(raw: RawDistro) -> EnrichedDistro:
    return {
        "distro": raw["distro"],
        "base": raw["base"],
        "audience": raw["audience"],
        "points": raw["points"],
        "usage": raw["usage"],
        "description": normalize_text(
            f'{raw["distro"]} est une distribution orientée {raw["usage"].lower()} avec un positionnement {raw["points"].lower()}.'
        ),
        "forWho": normalize_text(
            f'Convient surtout aux profils {raw["audience"].lower()} recherchant {raw["usage"].lower()}.'
        ),
        "whyChoose": [
            f"Bon fit pour {raw['usage'].lower()}",
            f"Positionnement clair : {raw['points'].lower()}",
            "Prise en main cohérente selon son public cible",
        ],
        "limitations": [
            "Peut demander des vérifications selon le matériel ou les usages avancés",
            "Choix à confirmer selon le niveau réel de l'utilisateur",
        ],
        "useCases": [
            raw["usage"],
            f"Découverte de {raw['distro']}",
            "Usage ciblé selon le profil utilisateur",
        ],
        "technical": {
            "base": normalize_text(raw["base"]),
            "packageManager": infer_package_manager(raw),
            "releaseModel": infer_release_model(raw),
            "difficulty": infer_difficulty(raw),
        },
    }


def repair_list(values: Any, expected: int, fallback: List[str]) -> List[str]:
    if not isinstance(values, list):
        values = []
    cleaned = [normalize_text(str(v)) for v in values if str(v).strip()]
    cleaned = cleaned[:expected]
    while len(cleaned) < expected:
        cleaned.append(fallback[len(cleaned)])
    return cleaned


def repair_entry(raw: RawDistro, partial: Dict[str, Any]) -> EnrichedDistro:
    fallback = build_fallback(raw)

    description = normalize_text(str(partial.get("description") or fallback["description"]))
    for_who = normalize_text(str(partial.get("forWho") or fallback["forWho"]))

    technical = partial.get("technical") or {}
    if not isinstance(technical, dict):
        technical = {}

    difficulty = str(technical.get("difficulty") or fallback["technical"]["difficulty"])
    if difficulty not in {"Débutant", "Intermédiaire", "Avancé", "Expert"}:
        difficulty = fallback["technical"]["difficulty"]

    return {
        "distro": raw["distro"],
        "base": raw["base"],
        "audience": raw["audience"],
        "points": raw["points"],
        "usage": raw["usage"],
        "description": description,
        "forWho": for_who,
        "whyChoose": repair_list(
            partial.get("whyChoose"),
            3,
            fallback["whyChoose"],
        ),
        "limitations": repair_list(
            partial.get("limitations"),
            2,
            fallback["limitations"],
        ),
        "useCases": repair_list(
            partial.get("useCases"),
            3,
            fallback["useCases"],
        ),
        "technical": {
            "base": normalize_text(str(technical.get("base") or fallback["technical"]["base"])),
            "packageManager": normalize_text(str(technical.get("packageManager") or fallback["technical"]["packageManager"])),
            "releaseModel": normalize_text(str(technical.get("releaseModel") or fallback["technical"]["releaseModel"])),
            "difficulty": difficulty,
        },
    }


def extract_json_array(text: str) -> str:
    codeblock = re.search(r"```json\s*([\s\S]*?)```", text, flags=re.I)
    if codeblock:
        return codeblock.group(1).strip()

    codeblock2 = re.search(r"```\s*([\s\S]*?)```", text, flags=re.I)
    if codeblock2:
        return codeblock2.group(1).strip()

    start = text.find("[")
    end = text.rfind("]")
    if start != -1 and end != -1 and end > start:
        return text[start:end + 1]

    raise ValueError("Impossible d'extraire un tableau JSON valide")


def build_prompt(batch: List[RawDistro]) -> str:
    return f"""
Tu enrichis une liste de distributions Linux pour un catalogue pédagogique.

Contraintes absolues :
- retourne uniquement un JSON valide
- format = tableau JSON
- même nombre d'objets que l'entrée
- même ordre que l'entrée
- ne change jamais distro/base/audience/points/usage
- aucun champ vide
- whyChoose = exactement 3 chaînes
- limitations = exactement 2 chaînes
- useCases = exactement 3 chaînes
- description = 1 ou 2 phrases
- forWho = 1 phrase
- ton clair, pédagogique, compact
- pas de marketing
- public novice + technique
- en français

Format obligatoire :
[
  {{
    "distro": "...",
    "base": "...",
    "audience": "...",
    "points": "...",
    "usage": "...",
    "description": "...",
    "forWho": "...",
    "whyChoose": ["...", "...", "..."],
    "limitations": ["...", "..."],
    "useCases": ["...", "...", "..."],
    "technical": {{
      "base": "...",
      "packageManager": "...",
      "releaseModel": "...",
      "difficulty": "Débutant"
    }}
  }}
]

Entrée :
{json.dumps(batch, ensure_ascii=False, indent=2)}
""".strip()


def call_model(prompt: str) -> str:
    url = OPENAI_BASE_URL.rstrip("/") + "/chat/completions"
    payload = {
        "model": MODEL,
        "temperature": 0.2,
        "messages": [
            {
                "role": "system",
                "content": "Tu es un générateur JSON strict. Tu ne retournes que du JSON valide.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
    }

    response = requests.post(url, json=payload, timeout=TIMEOUT)
    response.raise_for_status()
    data = response.json()
    return data["choices"][0]["message"]["content"].strip()


def enrich_batch(batch: List[RawDistro]) -> List[EnrichedDistro]:
    last_error: Exception | None = None

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            content = call_model(build_prompt(batch))
            json_text = extract_json_array(content)
            parsed = json.loads(json_text)

            if not isinstance(parsed, list):
                raise ValueError("La réponse n'est pas une liste JSON")
            if len(parsed) != len(batch):
                raise ValueError(f"Longueur invalide: attendu {len(batch)}, reçu {len(parsed)}")

            repaired = [repair_entry(raw, obj if isinstance(obj, dict) else {}) for raw, obj in zip(batch, parsed)]
            return repaired
        except Exception as exc:
            last_error = exc
            log(f"[WARN] tentative {attempt}/{MAX_RETRIES} échouée: {exc}")
            time.sleep(1.5)

    if last_error:
        raise last_error
    raise RuntimeError("Échec inconnu dans enrich_batch")


def ts_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def render_ts(data: List[EnrichedDistro]) -> str:
    lines: List[str] = []
    lines.append("/* eslint-disable */")
    lines.append('export type Difficulty = "Débutant" | "Intermédiaire" | "Avancé" | "Expert";')
    lines.append("")
    lines.append("export type EnrichedDistro = {")
    lines.append("  distro: string;")
    lines.append("  base: string;")
    lines.append("  audience: string;")
    lines.append("  points: string;")
    lines.append("  usage: string;")
    lines.append("  description: string;")
    lines.append("  forWho: string;")
    lines.append("  whyChoose: [string, string, string];")
    lines.append("  limitations: [string, string];")
    lines.append("  useCases: [string, string, string];")
    lines.append("  technical: {")
    lines.append("    base: string;")
    lines.append("    packageManager: string;")
    lines.append("    releaseModel: string;")
    lines.append("    difficulty: Difficulty;")
    lines.append("  };")
    lines.append("};")
    lines.append("")
    lines.append("export const enrichedDistros: EnrichedDistro[] = [")

    for item in data:
        lines.append("  {")
        lines.append(f"    distro: `{ts_escape(item['distro'])}`,")
        lines.append(f"    base: `{ts_escape(item['base'])}`,")
        lines.append(f"    audience: `{ts_escape(item['audience'])}`,")
        lines.append(f"    points: `{ts_escape(item['points'])}`,")
        lines.append(f"    usage: `{ts_escape(item['usage'])}`,")
        lines.append(f"    description: `{ts_escape(item['description'])}`,")
        lines.append(f"    forWho: `{ts_escape(item['forWho'])}`,")
        lines.append("    whyChoose: [")
        for v in item["whyChoose"]:
            lines.append(f"      `{ts_escape(v)}`,")
        lines.append("    ],")
        lines.append("    limitations: [")
        for v in item["limitations"]:
            lines.append(f"      `{ts_escape(v)}`,")
        lines.append("    ],")
        lines.append("    useCases: [")
        for v in item["useCases"]:
            lines.append(f"      `{ts_escape(v)}`,")
        lines.append("    ],")
        lines.append("    technical: {")
        lines.append(f"      base: `{ts_escape(item['technical']['base'])}`,")
        lines.append(f"      packageManager: `{ts_escape(item['technical']['packageManager'])}`,")
        lines.append(f"      releaseModel: `{ts_escape(item['technical']['releaseModel'])}`,")
        lines.append(f"      difficulty: `{ts_escape(item['technical']['difficulty'])}`,")
        lines.append("    },")
        lines.append("  },")

    lines.append("];")
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    if not INPUT_FILE.exists():
        log(f"[FATAL] Fichier introuvable: {INPUT_FILE}")
        return 1

    ts_content = read_text(INPUT_FILE)
    array_literal = extract_raw_array(ts_content)
    raw_data = parse_ts_objects(array_literal)

    if not raw_data:
        log("[FATAL] rawData vide")
        return 1

    log(f"[INFO] Source: {INPUT_FILE}")
    log(f"[INFO] Distros trouvées: {len(raw_data)}")
    log(f"[INFO] Modèle: {MODEL}")
    log(f"[INFO] Endpoint: {OPENAI_BASE_URL}")

    enriched: List[EnrichedDistro] = []

    batches = chunked(raw_data, BATCH_SIZE)
    for idx, batch in enumerate(batches, start=1):
        log(f"[INFO] Lot {idx}/{len(batches)} : {batch[0]['distro']} -> {batch[-1]['distro']}")
        result = enrich_batch(batch)
        enriched.extend(result)

    if len(enriched) != len(raw_data):
        log(f"[FATAL] Nombre final invalide: {len(enriched)} au lieu de {len(raw_data)}")
        return 1

    out = render_ts(enriched)
    write_text(OUTPUT_FILE, out)

    log(f"[OK] Fichier généré: {OUTPUT_FILE}")
    log(f"[OK] Première distro: {enriched[0]['distro']}")
    log(f"[OK] Dernière distro: {enriched[-1]['distro']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())