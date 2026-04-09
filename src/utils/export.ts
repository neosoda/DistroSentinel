import { appStore } from "../store/state";
import { EnrichedDistro } from "../types";
import { getFilteredAndSortedData } from "../domain/filter";

export function downloadBlob(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

export function exportData(distros: EnrichedDistro[]): EnrichedDistro[] {
  const scope = (document.getElementById("exportScope") as HTMLSelectElement).value;
  return scope === "all" ? distros.slice().sort((a, b) => a.distro.localeCompare(b.distro)) : getFilteredAndSortedData(distros, appStore.State);
}

export function bindExportEvents(distros: EnrichedDistro[]) {
  const btnJson = document.getElementById("exportJson");
  const btnCsv = document.getElementById("exportCsv");
  
  if (btnJson) {
      btnJson.addEventListener("click", () => {
        const data = exportData(distros);
        const state = appStore.State;
        const payload = {
          generatedAt: new Date().toISOString(),
          count: data.length,
          scope: (document.getElementById("exportScope") as HTMLSelectElement).value,
          filters: {
            search: state.search,
            family: state.family,
            level: state.level,
            tags: Array.from(state.tags),
            matchAllTags: state.matchAllTags,
            mode: state.mode,
            sort: state.sort,
            favOnly: state.favOnly
          },
          data
        };
        downloadBlob("distros.json", JSON.stringify(payload, null, 2), "application/json");
      });
  }

  if (btnCsv) {
      btnCsv.addEventListener("click", () => {
        const data = exportData(distros);
        const headers = ["distro", "base", "audience", "usage", "family", "level", "tags", "points", "strengths", "weakness", "downloadLink", "distroSeaUrl", "logoUrl", "mode"];
        const rows = data.map(d => {
          const cols = [
            d.distro, d.base, d.audience, d.usage, d.family, d.level,
            (d.tags || []).join("|"),
            d.points,
            (d.strengths || []).join("|"),
            d.weakness,
            d.downloadLink,
            d.distroSeaUrl,
            d.logoUrl,
            d.mode
          ].map(v => {
            const s = String(v ?? "");
            if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
            return s;
          });
          return cols.join(",");
        });
        downloadBlob("distros.csv", [headers.join(","), ...rows].join("\n"), "text/csv");
      });
  }
}
