export type EnrichedDistro = {
  distro: string;
  base: string;
  audience: string;
  points: string;
  usage: string;
  description: string;
  forWho: string;
  whyChoose: string[];
  limitations: string[];
  useCases: string[];
  technical: {
    base: string;
    packageManager: string;
    releaseModel: string;
    difficulty: string;
  };
};

export const enrichedDistros: EnrichedDistro[] = [
  {
    distro: "ThinLinc",
    base: "RHEL/CentOS",
    audience: "Pro",
    points: "Accès distant Linux sécurisé, jusqu’à 10 utilisateurs gratuits",
    usage: "VDI/Bureaux distants",
    description: "ThinLinc est basée sur RHEL/CentOS. Elle sert surtout pour vdi/bureaux distants.",
    forWho: "Pour pro qui veulent accès distant linux sécurisé, jusqu’à 10 utilisateurs gratuits.",
    whyChoose: [
      "Excellente réactivité graphique",
      "Sécurité native renforcée",
      "Gratuit pour les petites structures"
    ],
    limitations: [
      "Logiciel propriétaire",
      "Demande une infrastructure serveur dédiée"
    ],
    useCases: [
      "Télétravail sécurisé",
      "Centralisation de ressources",
      "Infrastructure VDI"
    ],
    technical: {
      base: "Red Hat Enterprise Linux / CentOS",
      packageManager: "dnf",
      releaseModel: "stable / LTS",
      difficulty: "Avancé"
    }
  },
  {
    distro: "AlmaLinux",
    base: "RHEL",
    audience: "Pro",
    points: "Clone RHEL communautaire, très stable",
    usage: "Serveurs",
    description: "AlmaLinux est basée sur RHEL. Elle sert surtout pour serveurs.",
    forWho: "Pour pro qui veulent clone rhel communautaire, très stable.",
    whyChoose: [
      "Compatibilité RHEL fiable",
      "Gouvernance communautaire transparente",
      "Migration très simple"
    ],
    limitations: [
      "Orientée quasi exclusivement serveur",
      "Cycle calqué sur les sorties RHEL"
    ],
    useCases: [
      "Serveurs de production critiques",
      "Hébergement Web",
      "Infrastructure Cloud"
    ],
    technical: {
      base: "Red Hat Enterprise Linux",
      packageManager: "dnf",
      releaseModel: "stable / LTS",
      difficulty: "Avancé"
    }
  },
  {
    distro: "Alpine Linux",
    base: "Indépendante",
    audience: "Avancé",
    points: "Ultra-légère, musl, orientée sécurité",
    usage: "Containers/Minimal",
    description: "Alpine Linux est une distribution indépendante. Elle sert surtout pour containers/minimal.",
    forWho: "Pour avancé qui veulent très légère, musl, orientée sécurité.",
    whyChoose: [
      "Taille minuscule idéale pour Docker",
      "Surface d'attaque réduite par défaut",
      "Système de paquets très rapide"
    ],
    limitations: [
      "Utilise musl au lieu de glibc (incompatibilités)",
      "Configuration manuelle exigeante"
    ],
    useCases: [
      "Microservices et containers",
      "Pare-feu et routeurs légers",
      "Systèmes embarqués"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "apk",
      releaseModel: "rolling",
      difficulty: "Avancé"
    }
  },
  {
    distro: "AnduinOS",
    base: "Ubuntu",
    audience: "Débutant",
    points: "Interface proche de Windows",
    usage: "Migration Windows",
    description: "AnduinOS est basée sur Ubuntu. Elle sert surtout pour migration windows.",
    forWho: "Pour débutant qui veulent interface proche de windows.",
    whyChoose: [
      "Apprentissage quasi nul pour ex-Windows",
      "Compatibilité logicielle Ubuntu",
      "Installation simplifiée"
    ],
    limitations: [
      "Personnalisation limitée par défaut",
      "Support communautaire plus restreint"
    ],
    useCases: [
      "Usage domestique quotidien",
      "Bureautique simple",
      "Découverte de Linux"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "antiX",
    base: "Debian",
    audience: "Débutant/Ancien matériel",
    points: "Sans systemd, très léger",
    usage: "PC anciens",
    description: "antiX est basée sur Debian. Elle sert surtout pour pc anciens.",
    forWho: "Pour débutant/ancien matériel qui veulent sans systemd, très léger.",
    whyChoose: [
      "Consommation RAM dérisoire",
      "Poids plume sur le disque",
      "Réactivité bonne"
    ],
    limitations: [
      "Interface visuelle datée",
      "Nécessite parfois des réglages post-install"
    ],
    useCases: [
      "Recyclage de vieux PC",
      "Poste de travail minimaliste",
      "Live USB persistant"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Arch Linux",
    base: "Indépendante",
    audience: "Expert",
    points: "Rolling release, KISS",
    usage: "Systèmes sur mesure",
    description: "Arch Linux est une distribution indépendante. Elle sert surtout pour systèmes sur mesure.",
    forWho: "Pour expert qui veulent rolling release, kiss.",
    whyChoose: [
      "Dernières versions de logiciels disponibles",
      "Une documentation (Wiki) complète",
      "Zéro superflu installé par défaut"
    ],
    limitations: [
      "Installation uniquement en ligne de commande",
      "Risque de casse lors des mises à jour majeures"
    ],
    useCases: [
      "Station de travail personnalisée",
      "Développement logiciel avancé",
      "Système de bureau sur mesure"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "pacman",
      releaseModel: "rolling",
      difficulty: "Expert"
    }
  },
  {
    distro: "Archcraft",
    base: "Arch",
    audience: "Intermédiaire",
    points: "Arch préconfiguré, esthétique",
    usage: "Desktop léger",
    description: "Archcraft est basée sur Arch. Elle sert surtout pour desktop léger.",
    forWho: "Pour intermédiaire qui veulent arch préconfiguré, esthétique.",
    whyChoose: [
      "Interface soignée 'out of the box'",
      "Très performant sur matériel modeste",
      "Base Arch complète et puissante"
    ],
    limitations: [
      "Configuration basée sur des fichiers texte",
      "Logithèque graphique moins évidente"
    ],
    useCases: [
      "Configuration de bureau design",
      "Usage quotidien stylé",
      "Apprentissage des Tiling Window Managers"
    ],
    technical: {
      base: "Arch Linux",
      packageManager: "pacman",
      releaseModel: "rolling",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "ArcoLinux",
    base: "Arch",
    audience: "Apprenant",
    points: "Distribution pédagogique Arch",
    usage: "Apprentissage",
    description: "ArcoLinux est basée sur Arch. Elle sert surtout pour apprentissage.",
    forWho: "Pour apprenant qui veulent distribution pédagogique arch.",
    whyChoose: [
      "Progression pédagogique structurée",
      "Outils de configuration simplifiés",
      "Accès aux dépôts AUR"
    ],
    limitations: [
      "Peut paraître complexe au premier abord",
      "Nombreuses versions pouvant dérouter"
    ],
    useCases: [
      "Apprentissage des systèmes Linux",
      "Transition vers Arch pure",
      "Découverte d'environnements variés"
    ],
    technical: {
      base: "Arch Linux",
      packageManager: "pacman",
      releaseModel: "rolling",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "Artix Linux",
    base: "Arch",
    audience: "Avancé",
    points: "Arch sans systemd",
    usage: "Puristes",
    description: "Artix Linux est basée sur Arch. Elle sert surtout pour puristes.",
    forWho: "Pour avancé qui veulent arch sans systemd.",
    whyChoose: [
      "Liberté de choix de l'init (OpenRC, runit...)",
      "Performance brute optimisée",
      "Puissance de l'écosystème Arch"
    ],
    limitations: [
      "Incomptabilités logicielles liées à systemd",
      "Dépôts spécifiques à maintenir"
    ],
    useCases: [
      "Installation minimaliste sans systemd",
      "Poste de développement performant",
      "Expérimentation système"
    ],
    technical: {
      base: "Arch Linux",
      packageManager: "pacman",
      releaseModel: "rolling",
      difficulty: "Avancé"
    }
  },
  {
    distro: "Bazzite",
    base: "Fedora",
    audience: "Gamer",
    points: "Optimisé gaming, SteamOS-like",
    usage: "Jeux",
    description: "Bazzite est basée sur Fedora. Elle sert surtout pour jeux.",
    forWho: "Pour gamer qui veulent optimisé gaming, steamos-like.",
    whyChoose: [
      "Drivers et codecs pré-installés",
      "Performance gaming améliorée",
      "Interface Steam Game Mode disponible"
    ],
    limitations: [
      "Modèle immuable déroutant pour certains",
      "Moins orienté bureautique traditionnelle"
    ],
    useCases: [
      "Station de jeu principale",
      "Bazzite pour consoles portables",
      "Home-cinéma multimédia"
    ],
    technical: {
      base: "Fedora",
      packageManager: "dnf",
      releaseModel: "release régulière",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "BigLinux",
    base: "Manjaro",
    audience: "Débutant",
    points: "Prêt à l’emploi, orienté desktop",
    usage: "Usage général",
    description: "BigLinux est basée sur Manjaro. Elle sert surtout pour usage général.",
    forWho: "Pour débutant qui veulent prêt à l’emploi, orienté desktop.",
    whyChoose: [
      "Installation et réglages très simples",
      "Suite d'outils de maintenance intégrée",
      "Optimisations pour le cloud et les webapps"
    ],
    limitations: [
      "Traductions parfois incomplètes",
      "Cible principale centrée sur le Brésil"
    ],
    useCases: [
      "Usage personnel polyvalent",
      "Bureautique et Web",
      "Poste de travail multimédia"
    ],
    technical: {
      base: "Manjaro / Arch",
      packageManager: "pacman",
      releaseModel: "rolling",
      difficulty: "Débutant"
    }
  },
  {
    distro: "blendOS",
    base: "Arch",
    audience: "Avancé",
    points: "Multi-distros via conteneurs",
    usage: "Expérimentation",
    description: "blendOS est basée sur Arch. Elle sert surtout pour expérimentation.",
    forWho: "Pour avancé qui veulent multi-distros via conteneurs.",
    whyChoose: [
      "Universalité logicielle large",
      "Stabilité d'un système immuable",
      "Support natif des applications Android"
    ],
    limitations: [
      "Gestion complexe des conteneurs isolés",
      "Concept très novateur et parfois instable"
    ],
    useCases: [
      "Environnement de test multi-distro",
      "Poste de travail hybride",
      "Expérimentation technologique"
    ],
    technical: {
      base: "Arch Linux",
      packageManager: "pacman",
      releaseModel: "rolling",
      difficulty: "Avancé"
    }
  },
  {
    distro: "Bodhi Linux",
    base: "Ubuntu",
    audience: "Débutant",
    points: "Très léger, Enlightenment",
    usage: "PC faibles",
    description: "Bodhi Linux est basée sur Ubuntu. Elle sert surtout pour pc faibles.",
    forWho: "Pour débutant qui veulent très léger, enlightenment.",
    whyChoose: [
      "Consommation de ressources minimale",
      "Environnement de bureau unique et beau",
      "Basée sur la stabilité d'Ubuntu LTS"
    ],
    limitations: [
      "Interface déroutante au début",
      "Logiciels pré-installés réduits au minimum"
    ],
    useCases: [
      "Recyclage de matériel ancien",
      "Netbooks et portables limités",
      "Système secondaire très rapide"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "BunsenLabs",
    base: "Debian",
    audience: "Minimaliste",
    points: "Openbox, stabilité",
    usage: "Productivité",
    description: "BunsenLabs est basée sur Debian. Elle sert surtout pour productivité.",
    forWho: "Pour minimaliste qui veulent openbox, stabilité.",
    whyChoose: [
      "Vraiment très léger et rapide",
      "Stabilité solide de Debian",
      "Script d'accueil facilitant l'installation"
    ],
    limitations: [
      "Absence de menu 'Démarrer' traditionnel",
      "Configuration reposant sur des fichiers texte"
    ],
    useCases: [
      "Poste de productivité sans distraction",
      "Ordinateurs aux ressources limitées",
      "Usage via raccourcis clavier (power-user)"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "CachyOS",
    base: "Arch",
    audience: "Avancé",
    points: "Optimisations CPU/performance",
    usage: "Desktop performant",
    description: "CachyOS est basée sur Arch. Elle sert surtout pour desktop performant.",
    forWho: "Pour avancé qui veulent optimisations cpu/performance.",
    whyChoose: [
      "Noyaux optimisés sur mesure",
      "Vitesse de lancement accrue",
      "Outils de configuration très puissants"
    ],
    limitations: [
      "Bénéfices moins visibles sur vieux matériel",
      "Nécessite de comprendre les réglages système"
    ],
    useCases: [
      "Calcul intensif et compilation",
      "Station de travail haute performance",
      "Usage desktop très réactif"
    ],
    technical: {
      base: "Arch Linux",
      packageManager: "pacman",
      releaseModel: "rolling",
      difficulty: "Avancé"
    }
  },
  {
    distro: "CentOS Stream",
    base: "RHEL",
    audience: "Pro",
    points: "Branche upstream de RHEL",
    usage: "Tests serveurs",
    description: "CentOS Stream est basée sur RHEL. Elle sert surtout pour tests serveurs.",
    forWho: "Pour pro qui veulent branche upstream de rhel.",
    whyChoose: [
      "Accès anticipé aux nouveautés RHEL",
      "Excellent pour le test de compatibilité",
      "Stabilité de niveau entreprise"
    ],
    limitations: [
      "Pas un clone stable de RHEL pure",
      "Usage production critique débattue"
    ],
    useCases: [
      "Hébergement de services Web",
      "Lab de test pour infrastructure PRO",
      "Développement Cloud"
    ],
    technical: {
      base: "Red Hat Enterprise Linux",
      packageManager: "dnf",
      releaseModel: "rolling",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "Chimera Linux",
    base: "Indépendante",
    audience: "Expert",
    points: "musl + outils BSD",
    usage: "Systèmes alternatifs",
    description: "Chimera Linux est une distribution indépendante. Elle sert surtout pour systèmes alternatifs.",
    forWho: "Pour expert qui veulent musl + outils bsd.",
    whyChoose: [
      "Architecture propre et sans GNU",
      "Utilise LLVM au lieu de GCC par défaut",
      "Haute performance grâce à musl"
    ],
    limitations: [
      "Logithèque limitée par l'absence de glibc",
      "Courbe d'apprentissage très raide"
    ],
    useCases: [
      "Serveur minimaliste spécialisé",
      "Recherche en architecture système",
      "Système de bureau non conventionnel"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "apk",
      releaseModel: "rolling",
      difficulty: "Expert"
    }
  },
  {
    distro: "Debian",
    base: "Indépendante",
    audience: "Tous",
    points: "Très stable, universelle",
    usage: "Serveur/Desktop",
    description: "Debian est une distribution indépendante. Elle sert surtout pour serveur/desktop.",
    forWho: "Pour tous qui veulent très stable, universelle.",
    whyChoose: [
      "Stabilité solide prouvée",
      "Dépôts de logiciels immenses",
      "Support matériel exceptionnel"
    ],
    limitations: [
      "Versions logicielles parfois anciennes",
      "Installation moins guidée que chez la concurrence"
    ],
    useCases: [
      "Serveur de production critique",
      "Station de travail stable",
      "Base pour d'autres distributions"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Deepin",
    base: "Debian",
    audience: "Débutant",
    points: "Interface moderne et soignée",
    usage: "Desktop grand public",
    description: "Deepin est basée sur Debian. Elle sert surtout pour desktop grand public.",
    forWho: "Pour débutant qui veulent interface moderne et soignée.",
    whyChoose: [
      "L'une des plus belles interfaces graphiques",
      "Bouton 'App Store' très fourni",
      "Excellente expérience utilisateur"
    ],
    limitations: [
      "Lourdeur relative de l'interface",
      "Collecte de données parfois critiquée"
    ],
    useCases: [
      "Station de bureau média",
      "Usage familial et Web",
      "Ordinateur personnel esthétique"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Devuan",
    base: "Debian",
    audience: "Avancé",
    points: "Debian sans systemd",
    usage: "Environnements maîtrisés",
    description: "Devuan est basée sur Debian. Elle sert surtout pour environnements maîtrisés.",
    forWho: "Pour avancé qui veulent debian sans systemd.",
    whyChoose: [
      "Alternative sérieuse sans systemd",
      "Conserve toute la robustesse de Debian",
      "Plus léger sur les services système"
    ],
    limitations: [
      "Certains logiciels (GNOME) plus durs à installer",
      "Peut demander de la configuration manuelle"
    ],
    useCases: [
      "Serveur traditionnel sans systemd",
      "Systèmes embarqués fiables",
      "Desktop minimaliste contrôlé"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Avancé"
    }
  },
  {
    distro: "DragonFlyBSD",
    base: "BSD",
    audience: "Expert",
    points: "HAMMER FS, performance",
    usage: "Serveur spécialisé",
    description: "DragonFlyBSD est basée sur BSD. Elle sert surtout pour serveur spécialisé.",
    forWho: "Pour expert qui veulent hammer fs, performance.",
    whyChoose: [
      "Système de fichiers HAMMER très performant",
      "Gestion multicœur très optimisée",
      "Clustering et haute disponibilité"
    ],
    limitations: [
      "Support matériel Wifi/Audio limité",
      "Port de logiciels moins large que Linux"
    ],
    useCases: [
      "Serveur de stockage haute densité",
      "Infrastructures réseau lourdes",
      "Recherche en architecture noyau"
    ],
    technical: {
      base: "BSD (indépendant de Linux)",
      packageManager: "pkg",
      releaseModel: "stable",
      difficulty: "Expert"
    }
  },
  {
    distro: "Edubuntu",
    base: "Ubuntu",
    audience: "Éducation",
    points: "Suite éducative",
    usage: "Écoles",
    description: "Edubuntu est basée sur Ubuntu. Elle sert surtout pour écoles.",
    forWho: "Pour éducation qui veulent suite éducative.",
    whyChoose: [
      "Nombreux logiciels éducatifs inclus",
      "Configuration simplifiée pour les labos",
      "Base Ubuntu archi-stable"
    ],
    limitations: [
      "Surcharge logicielle pour d'autres usages",
      "Moins pertinente pour un usage pro"
    ],
    useCases: [
      "Équipement de classes d'école",
      "Ordinateur familial éducatif",
      "Laboratoires informatiques publics"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "elementary OS",
    base: "Ubuntu",
    audience: "Débutant",
    points: "UX inspirée macOS",
    usage: "Desktop personnel",
    description: "elementary OS est basée sur Ubuntu. Elle sert surtout pour desktop personnel.",
    forWho: "Pour débutant qui veulent ux inspirée macos.",
    whyChoose: [
      "Interface épurée et cohérente",
      "Respect strict de la vie privée",
      "Applications natives très fluides"
    ],
    limitations: [
      "Système assez fermé par défaut",
      "Personnalisation visuelle complexe"
    ],
    useCases: [
      "Bureautique et usage quotidien",
      "Navigation Web et multimédia",
      "Transition douce depuis Mac"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "EndeavourOS",
    base: "Arch",
    audience: "Intermédiaire",
    points: "Arch simplifié",
    usage: "Desktop rolling",
    description: "EndeavourOS est basée sur Arch. Elle sert surtout pour desktop rolling.",
    forWho: "Pour intermédiaire qui veulent arch simplifié.",
    whyChoose: [
      "Installation d'Arch en 5 minutes",
      "Très peu de personnalisations par défaut",
      "Communauté d'aide exceptionnelle"
    ],
    limitations: [
      "Nécessite de connaître un peu pacman",
      "Moins automatisé qu'Ubuntu ou Mint"
    ],
    useCases: [
      "Station de travail moderne",
      "Développement web/logiciel",
      "Usage quotidien toujours à jour"
    ],
    technical: {
      base: "Arch Linux",
      packageManager: "pacman",
      releaseModel: "rolling",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "Endless OS",
    base: "Debian",
    audience: "Grand public",
    points: "Fonctionne hors-ligne",
    usage: "Éducation",
    description: "Endless OS est basée sur Debian. Elle sert surtout pour éducation.",
    forWho: "Pour grand public qui veulent fonctionne hors-ligne.",
    whyChoose: [
      "Contenu encyclopédique pré-installé",
      "Interface simple comme un smartphone",
      "Robuste grâce au système immuable"
    ],
    limitations: [
      "Installation logicielle bridée aux Flatpaks",
      "Consommation d'espace disque élevée par défaut"
    ],
    useCases: [
      "Éducation hors-ligne",
      "Usage débutant en zone blanche",
      "Premier ordinateur pour enfants"
    ],
    technical: {
      base: "Debian",
      packageManager: "flatpak / ostree",
      releaseModel: "immutable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Fedora",
    base: "Indépendante",
    audience: "Avancé",
    points: "Technologies récentes",
    usage: "Développement",
    description: "Fedora est une distribution indépendante. Elle sert surtout pour développement.",
    forWho: "Pour avancé qui veulent technologies récentes.",
    whyChoose: [
      "Toute première à sortir les nouveautés",
      "Stabilité surprenante pour du 'bleeding-edge'",
      "Excellente intégration de GNOME"
    ],
    limitations: [
      "Cycle de vie court (9 mois)",
      "Gestion des codecs par défaut restrictive"
    ],
    useCases: [
      "Poste de développement pro",
      "Déploiement de serveurs tests RHEL",
      "Exploration graphique Linux"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "dnf",
      releaseModel: "release régulière",
      difficulty: "Avancé"
    }
  },
  {
    distro: "FreeBSD",
    base: "BSD",
    audience: "Expert",
    points: "ZFS natif, robustesse",
    usage: "Serveurs",
    description: "FreeBSD est basée sur BSD. Elle sert surtout pour serveurs.",
    forWho: "Pour expert qui veulent zfs natif, robustesse.",
    whyChoose: [
      "Pile réseau très performante",
      "Gestion de stockage fiable via ZFS",
      "Documentation système exhaustive"
    ],
    limitations: [
      "Hardware Wifi parfois mal supporté",
      "Passage obligatoire par la commande"
    ],
    useCases: [
      "Serveur de fichiers professionnel",
      "Pare-feu haute sécurité",
      "Hébergement Web haute performance"
    ],
    technical: {
      base: "FreeBSD (indépendant de Linux)",
      packageManager: "pkg",
      releaseModel: "stable",
      difficulty: "Expert"
    }
  },
  {
    distro: "Garuda Linux",
    base: "Arch",
    audience: "Gamer",
    points: "Performance et gaming",
    usage: "Jeux",
    description: "Garuda Linux est basée sur Arch. Elle sert surtout pour jeux.",
    forWho: "Pour gamer qui veulent performance et gaming.",
    whyChoose: [
      "Noyau Linux Zen optimisé gaming",
      "Outils graphiques de configuration tout-en-un",
      "Système de snapshots automatiques Btrfs"
    ],
    limitations: [
      "Consommation RAM élevée au repos",
      "Design très marqué pouvant lasser"
    ],
    useCases: [
      "Machine de jeu dédiée",
      "Traitement vidéo et streaming",
      "Station desktop performante"
    ],
    technical: {
      base: "Arch Linux",
      packageManager: "pacman",
      releaseModel: "rolling",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "Gentoo",
    base: "Indépendante",
    audience: "Expert",
    points: "Compilation à la carte",
    usage: "Optimisation extrême",
    description: "Gentoo est une distribution indépendante. Elle sert surtout pour optimisation extrême.",
    forWho: "Pour expert qui veulent compilation à la carte.",
    whyChoose: [
      "Performance optimisée au processeur",
      "Flexibilité logicielle large",
      "Connaissance profonde du système"
    ],
    limitations: [
      "Installation extrêmement longue",
      "Maintenance gourmande en temps"
    ],
    useCases: [
      "Calcul scientifique et industriel",
      "Serveurs haute performance",
      "Station de travail pour puristes"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "emerge",
      releaseModel: "rolling source-based",
      difficulty: "Expert"
    }
  },
  {
    distro: "Haiku",
    base: "BeOS-like",
    audience: "Curieux",
    points: "OS alternatif moderne",
    usage: "Exploration",
    description: "Haiku est basée sur BeOS-like. Elle sert surtout pour exploration.",
    forWho: "Pour curieux qui veulent os alternatif moderne.",
    whyChoose: [
      "Rapidité de lancement foudroyante",
      "Interface simple et unifiée",
      "Philosophie orientée bureau"
    ],
    limitations: [
      "Support matériel limité",
      "Peu d'applications professionnelles"
    ],
    useCases: [
      "Exploration système",
      "Anciens PC peu puissants",
      "Loisir et développement alternatif"
    ],
    technical: {
      base: "Indépendante (BeOS-like)",
      packageManager: "pkgman",
      releaseModel: "rolling",
      difficulty: "Expert"
    }
  },
  {
    distro: "HoloISO",
    base: "Arch",
    audience: "Gamer",
    points: "Clone SteamOS",
    usage: "Console PC",
    description: "HoloISO est basée sur Arch. Elle sert surtout pour console pc.",
    forWho: "Pour gamer qui veulent clone steamos.",
    whyChoose: [
      "Interface SteamOS console native",
      "Optimisé pour le jeu à la manette",
      "Base Arch très moderne"
    ],
    limitations: [
      "Compatible surtout avec les GPU AMD",
      "Stabilité inégale sur certains matériels"
    ],
    useCases: [
      "PC Gaming de salon",
      "Consoles portables alternatives",
      "Machine arcade moderne"
    ],
    technical: {
      base: "Arch Linux",
      packageManager: "pacman",
      releaseModel: "rolling",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "KDE Neon",
    base: "Ubuntu",
    audience: "Utilisateurs KDE",
    points: "KDE très récent",
    usage: "Desktop KDE",
    description: "KDE Neon est basée sur Ubuntu. Elle sert surtout pour desktop kde.",
    forWho: "Pour utilisateurs kde qui veulent kde très récent.",
    whyChoose: [
      "Premier à recevoir les mises à jour KDE",
      "Compatibilité logicielle Ubuntu large",
      "Bureau fluide et personnalisable"
    ],
    limitations: [
      "Nigthly builds parfois instables",
      "Orientée exclusivement vers KDE"
    ],
    useCases: [
      "Travail desktop moderne",
      "Showcase technologique KDE",
      "Développement Plasma"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "KolibriOS",
    base: "Indépendante",
    audience: "Expert",
    points: "OS très minimal",
    usage: "Démonstration technique",
    description: "KolibriOS est une distribution indépendante. Elle sert surtout pour démonstration technique.",
    forWho: "Pour expert qui veulent os très minimal.",
    whyChoose: [
      "Démarrage en moins de 3 secondes",
      "Performance CPU sans équivalent",
      "Poids plume (moins de 2 Mo)"
    ],
    limitations: [
      "Applications utilitaires basiques",
      "Presque aucun driver moderne"
    ],
    useCases: [
      "Démonstration de performance",
      "Système de secours très léger",
      "Apprentissage de l'assembleur"
    ],
    technical: {
      base: "Indépendante (ASM)",
      packageManager: "spécifique",
      releaseModel: "rolling",
      difficulty: "Expert"
    }
  },
  {
    distro: "Kubuntu",
    base: "Ubuntu",
    audience: "Débutant",
    points: "Ubuntu + KDE",
    usage: "Desktop",
    description: "Kubuntu est basée sur Ubuntu. Elle sert surtout pour desktop.",
    forWho: "Pour débutant qui veulent ubuntu + kde.",
    whyChoose: [
      "Personnalisation visuelle sans limite",
      "Excellente logithèque intégrée",
      "Stabilité et support Ubuntu"
    ],
    limitations: [
      "Plus gourmande que Lubuntu ou Xubuntu",
      "Trop d'options pour un novice total"
    ],
    useCases: [
      "Poste de bureautique avancé",
      "Poste de travail personnel",
      "Machine multimédia"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Linux Lite",
    base: "Ubuntu",
    audience: "Débutant",
    points: "Simple et léger",
    usage: "Ex-Windows",
    description: "Linux Lite est basée sur Ubuntu. Elle sert surtout pour ex-windows.",
    forWho: "Pour débutant qui veulent simple et léger.",
    whyChoose: [
      "Interface simple et familière",
      "Rapidité sur petit processeur",
      "Outils graphiques de bienvenue"
    ],
    limitations: [
      "Design un peu austère par défaut",
      "Vise uniquement le 64-bit désormais"
    ],
    useCases: [
      "Migration Windows réussie",
      "Bureautique légère",
      "Surf web sécurisé"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Linux Mint",
    base: "Ubuntu/Debian",
    audience: "Débutant",
    points: "Ergonomique et stable",
    usage: "Desktop principal",
    description: "Linux Mint est basée sur Ubuntu/Debian. Elle sert surtout pour desktop principal.",
    forWho: "Pour débutant qui veulent ergonomique et stable.",
    whyChoose: [
      "Ergonomie exceptionnelle (Cinnamon)",
      "Gestionnaire de mises à jour sûr",
      "Grande communauté d'entraide"
    ],
    limitations: [
      "Vraiment conservatrice sur les versions",
      "Peut paraître monotone pour les technophiles"
    ],
    useCases: [
      "Ordinateur principal familial",
      "Bureautique quotidienne",
      "Poste de travail fiable"
    ],
    technical: {
      base: "Ubuntu ou Debian",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Linux Mint Debian Edition",
    base: "Debian",
    audience: "Débutant",
    points: "Mint sans Ubuntu",
    usage: "Desktop stable",
    description: "Linux Mint Debian Edition est basée sur Debian. Elle sert surtout pour desktop stable.",
    forWho: "Pour débutant qui veulent mint sans ubuntu.",
    whyChoose: [
      "Indépendance vis-à-vis de Canonical",
      "Robustesse du socle Debian stable",
      "Même interface que Mint standard"
    ],
    limitations: [
      "Drivers un peu moins variés qu'Ubuntu",
      "Installation de PPAs moins directe"
    ],
    useCases: [
      "Station desktop robuste",
      "Alternative Debian polie",
      "Usage quotidien au long cours"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Lubuntu",
    base: "Ubuntu",
    audience: "Débutant",
    points: "LXQt très léger",
    usage: "PC modestes",
    description: "Lubuntu est basée sur Ubuntu. Elle sert surtout pour pc modestes.",
    forWho: "Pour débutant qui veulent lxqt très léger.",
    whyChoose: [
      "Consommation RAM record",
      "Rapidité d'exécution fluide",
      "Base logicielle Ubuntu immense"
    ],
    limitations: [
      "Interface visuelle assez basique",
      "Moins d'effets graphiques par défaut"
    ],
    useCases: [
      "Netbooks et machines de poche",
      "Usage Web sur vieux PC",
      "Station légère pour serveurs"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Mageia",
    base: "Mandriva",
    audience: "Intermédiaire",
    points: "Classique et stable",
    usage: "Desktop",
    description: "Mageia est basée sur Mandriva. Elle sert surtout pour desktop.",
    forWho: "Pour intermédiaire qui veulent classique et stable.",
    whyChoose: [
      "Panneau de contrôle tout-en-un",
      "Stabilité exemplaire du système",
      "Installation hautement personnalisable"
    ],
    limitations: [
      "Communauté moins large qu'autrefois",
      "Cycle de sortie assez lent"
    ],
    useCases: [
      "Usage desktop généraliste",
      "Bureautique en administration",
      "Station de travail fidèle"
    ],
    technical: {
      base: "Mandriva (Indépendante)",
      packageManager: "dnf",
      releaseModel: "stable",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "Manjaro",
    base: "Arch",
    audience: "Intermédiaire",
    points: "Arch user-friendly",
    usage: "Desktop rolling",
    description: "Manjaro est basée sur Arch. Elle sert surtout pour desktop rolling.",
    forWho: "Pour intermédiaire qui veulent arch user-friendly.",
    whyChoose: [
      "Derniers logiciels via dépôts testés",
      "Gestionnaire de drivers excellent",
      "Accès facilité à l'Arch User Repository"
    ],
    limitations: [
      "Délai de mise à jour par rapport à Arch",
      "Personnalisations parfois encombrantes"
    ],
    useCases: [
      "Usage quotidien performant",
      "Développement et Web design",
      "Station gaming performante"
    ],
    technical: {
      base: "Arch Linux",
      packageManager: "pacman",
      releaseModel: "rolling",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "MX Linux",
    base: "Debian",
    audience: "Tous",
    points: "Rapide et stable",
    usage: "Desktop polyvalent",
    description: "MX Linux est basée sur Debian. Elle sert surtout pour desktop polyvalent.",
    forWho: "Pour tous qui veulent rapide et stable.",
    whyChoose: [
      "Outils de configuration géniaux",
      "Vraiment très rapide à l'usage",
      "Stabilité exceptionnelle approuvée"
    ],
    limitations: [
      "Design XFCE un peu daté par défaut",
      "Mélange Debian stable et paquets récents"
    ],
    useCases: [
      "Poste de travail polyvalent",
      "Usage quotidien tout-en-un",
      "Machines aux performances modestes"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Nitrux",
    base: "Debian",
    audience: "Intermédiaire",
    points: "Immutable, AppImage",
    usage: "Desktop moderne",
    description: "Nitrux est basée sur Debian. Elle sert surtout pour desktop moderne.",
    forWho: "Pour intermédiaire qui veulent immutable, appimage.",
    whyChoose: [
      "Interface futuriste et soignée",
      "Cœur du système immuable sûr",
      "Support natif des AppImages"
    ],
    limitations: [
      "Flux de travail inhabituel",
      "Support matériel récent parfois omis"
    ],
    useCases: [
      "Desktop moderne et design",
      "Ordinateur portable multimédia",
      "Expérimentation graphique"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt + appimage",
      releaseModel: "immutable / hybride",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "NixOS",
    base: "Indépendante",
    audience: "Expert",
    points: "Configuration déclarative",
    usage: "Infra reproductible",
    description: "NixOS est une distribution indépendante. Elle sert surtout pour infra reproductible.",
    forWho: "Pour expert qui veulent configuration déclarative.",
    whyChoose: [
      "Possibilité de rollback garanti",
      "Configuration système centralisée",
      "Isolation des dépendances fiable"
    ],
    limitations: [
      "Langage Nix difficile à apprendre",
      "Arborescence système non standard"
    ],
    useCases: [
      "Développement en cloud natif",
      "Infrastructures reproductibles",
      "Système de bureau inaltérable"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "nix",
      releaseModel: "immutable",
      difficulty: "Expert"
    }
  },
  {
    distro: "Nobara",
    base: "Fedora",
    audience: "Gamer",
    points: "Fedora optimisé jeux",
    usage: "Gaming",
    description: "Nobara est basée sur Fedora. Elle sert surtout pour gaming.",
    forWho: "Pour gamer qui veulent fedora optimisé jeux.",
    whyChoose: [
      "Patchs de performance pré-appliqués",
      "Drivers NVIDIA installés proprement",
      "Optimisé pour Wine et Proton"
    ],
    limitations: [
      "Dépôts tiers moins contrôlés",
      "Maintenance par une seule personne"
    ],
    useCases: [
      "Station de jeux principale",
      "Streaming et création Web",
      "Usage desktop moderne réactif"
    ],
    technical: {
      base: "Fedora",
      packageManager: "dnf",
      releaseModel: "release régulière",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "OpenIndiana",
    base: "Solaris",
    audience: "Expert",
    points: "ZFS avancé",
    usage: "Stockage",
    description: "OpenIndiana est basée sur Solaris. Elle sert surtout pour stockage.",
    forWho: "Pour expert qui veulent zfs avancé.",
    whyChoose: [
      "Fonctions ZFS les plus matures",
      "Environnement réseau très sûr",
      "Outils d'inspection (DTrace) pro"
    ],
    limitations: [
      "Support matériel très restreint",
      "Logithèque desktop anémique"
    ],
    useCases: [
      "Serveur de stockage critique",
      "Appliance réseau spécialisée",
      "Lab Unix traditionnel"
    ],
    technical: {
      base: "Illumos (Solaris-like)",
      packageManager: "pkg",
      releaseModel: "stable",
      difficulty: "Expert"
    }
  },
  {
    distro: "OpenMandriva",
    base: "Mandriva",
    audience: "Intermédiaire",
    points: "RPM moderne",
    usage: "Desktop",
    description: "OpenMandriva est basée sur Mandriva. Elle sert surtout pour desktop.",
    forWho: "Pour intermédiaire qui veulent rpm moderne.",
    whyChoose: [
      "Hautes performances avec LLVM",
      "Outils de configuration Mandriva",
      "Support natif pour processeurs modernes"
    ],
    limitations: [
      "Petite équipe de développement",
      "Documentation un peu éparpillée"
    ],
    useCases: [
      "Usage desktop polyvalent",
      "Multimédia et bureautique",
      "Expérimentation RPM"
    ],
    technical: {
      base: "Mandriva (Indépendante)",
      packageManager: "dnf",
      releaseModel: "stable",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "openSUSE",
    base: "Indépendante",
    audience: "Tous",
    points: "Leap stable / Tumbleweed rolling",
    usage: "Desktop/Serveur",
    description: "openSUSE est une distribution indépendante. Elle sert surtout pour desktop/serveur.",
    forWho: "Pour tous qui veulent leap stable / tumbleweed rolling.",
    whyChoose: [
      "Centre de contrôle YaST unique",
      "Stabilité exemplaire (Leap)",
      "Excellente gestion du système Btrfs"
    ],
    limitations: [
      "Configuration par défaut très bavarde",
      "Interface YaST parfois intimidante"
    ],
    useCases: [
      "Poste de bureautique robuste",
      "Serveur d'entreprise polyvalent",
      "Machine de test rolling (Tumbleweed)"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "zypper",
      releaseModel: "Leap stable / Tumbleweed rolling",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "PCLinuxOS",
    base: "Indépendante",
    audience: "Débutant",
    points: "Rolling stable",
    usage: "Desktop",
    description: "PCLinuxOS est une distribution indépendante. Elle sert surtout pour desktop.",
    forWho: "Pour débutant qui veulent rolling stable.",
    whyChoose: [
      "Format 'installer une fois pour toujours'",
      "Très bons outils de configuration",
      "Drivers propriétaires intégrés"
    ],
    limitations: [
      "Communauté restreinte et vieillissante",
      "Pas de support 32-bit récent"
    ],
    useCases: [
      "Usage personnel domestique",
      "Bureautique principale",
      "Poste multimédia simple"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "apt-rpm",
      releaseModel: "rolling stable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "PeppermintOS",
    base: "Debian",
    audience: "Débutant",
    points: "Léger, web apps",
    usage: "PC faibles",
    description: "PeppermintOS est basée sur Debian. Elle sert surtout pour pc faibles.",
    forWho: "Pour débutant qui veulent léger, web apps.",
    whyChoose: [
      "Intégration Web fiable",
      "Consommation ressources légère",
      "Installation très rapide"
    ],
    limitations: [
      "Logithèque locale limitée par défaut",
      "Design un peu sommaire"
    ],
    useCases: [
      "Transformation vieux PC en Chromebook",
      "Usage Web quotidien léger",
      "Machine secondaire nomade"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Pop!_OS",
    base: "Ubuntu",
    audience: "Dev/Gamer",
    points: "Optimisé GPU et workflow",
    usage: "Workstation",
    description: "Pop!_OS est basée sur Ubuntu. Elle sert surtout pour workstation.",
    forWho: "Pour dev/gamer qui veulent optimisé gpu et workflow.",
    whyChoose: [
      "Gestionnaire de fenêtres tiling inclus",
      "Version avec drivers NVIDIA pré-packagés",
      "Chiffrement disque par défaut soigné"
    ],
    limitations: [
      "Plus lourde en ressources que la moyenne",
      "Design très sombre imposé"
    ],
    useCases: [
      "Station de développement moderne",
      "PC portable de travail intensif",
      "Poste de jeu performant"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "Porteus",
    base: "Slackware",
    audience: "Avancé",
    points: "Live USB modulaire",
    usage: "Dépannage",
    description: "Porteus est basée sur Slackware. Elle sert surtout pour dépannage.",
    forWho: "Pour avancé qui veulent live usb modulaire.",
    whyChoose: [
      "Construction modulaire par fichiers",
      "Démarrage fulgurant (15s)",
      "Changements sauvegardables ou éphémères"
    ],
    limitations: [
      "Pas idéale pour une installation disque",
      "Configuration typée Slackware complexe"
    ],
    useCases: [
      "Système de secours pour clé USB",
      "Borne internet publique sécurisée",
      "Diagnostic matériel rapide"
    ],
    technical: {
      base: "Slackware",
      packageManager: "slackpkg",
      releaseModel: "stable",
      difficulty: "Avancé"
    }
  },
  {
    distro: "PrimTux",
    base: "Debian/Ubuntu",
    audience: "Éducation",
    points: "Conçu pour enfants",
    usage: "Écoles",
    description: "PrimTux est basée sur Debian/Ubuntu. Elle sert surtout pour écoles.",
    forWho: "Pour éducation qui veulent conçu pour enfants.",
    whyChoose: [
      "Menus simplifiés par âge (3 à 10 ans)",
      "Filtrage internet automatique inclus",
      "Enorme banque de jeux pédagogiques"
    ],
    limitations: [
      "Interface enfantine impropre aux ados",
      "Consommation espace disque pour les jeux"
    ],
    useCases: [
      "PC recyclé pour école primaire",
      "Ordinateur familial sécurisé",
      "Apprentissage de l'informatique enfants"
    ],
    technical: {
      base: "Debian / Ubuntu",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Puppy Linux",
    base: "Indépendante",
    audience: "Débutant",
    points: "Ultra-léger, RAM-based",
    usage: "Dépannage",
    description: "Puppy Linux est une distribution indépendante. Elle sert surtout pour dépannage.",
    forWho: "Pour débutant qui veulent très léger, ram-based.",
    whyChoose: [
      "Ne demande presque pas de RAM",
      "Fonctionne sans disque dur si besoin",
      "Outils de configuration simplifiés"
    ],
    limitations: [
      "Interface graphique très datée",
      "Gestion de paquets un peu confuse"
    ],
    useCases: [
      "Sauver des données sur PC crashé",
      "Usage Web sur matériel antique",
      "Poste de voyage sur clé USB"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "ppm",
      releaseModel: "rolling",
      difficulty: "Débutant"
    }
  },
  {
    distro: "PureOS",
    base: "Debian",
    audience: "Sécurité",
    points: "100% libre, privacy",
    usage: "Militants",
    description: "PureOS est basée sur Debian. Elle sert surtout pour militants.",
    forWho: "Pour sécurité qui veulent 100% libre, privacy.",
    whyChoose: [
      "Liberté logicielle garantie (FSF)",
      "Sécurité et vie privée par défaut",
      "Excellente intégration GNOME"
    ],
    limitations: [
      "Support matériel limité (pas de drivers non-libres)",
      "Incompatible avec certains firmwares récents"
    ],
    useCases: [
      "Usage personnel très sécurisé",
      "Poste de travail éthique",
      "Support pour PC Librem (System76/Purism)"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Q4OS",
    base: "Debian",
    audience: "Débutant",
    points: "Très léger, Trinity",
    usage: "Vieux PC",
    description: "Q4OS est basée sur Debian. Elle sert surtout pour vieux pc.",
    forWho: "Pour débutant qui veulent très léger, trinity.",
    whyChoose: [
      "Rapidité bonne sur vieux PC",
      "Interface classique familière",
      "Outils d'installation simplifiés"
    ],
    limitations: [
      "Look visuel daté (époques 2000)",
      "Moins d'applications modernes intégrées"
    ],
    useCases: [
      "Bureautique sur matériel ancien",
      "Usage Web journalier sécurisé",
      "Ordinateur de secours rapide"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "RebornOS",
    base: "Arch",
    audience: "Avancé",
    points: "Arch complet préinstallé",
    usage: "Desktop custom",
    description: "RebornOS est basée sur Arch. Elle sert surtout pour desktop custom.",
    forWho: "Pour avancé qui veulent arch complet préinstallé.",
    whyChoose: [
      "Installateur extrêmement flexible",
      "Support Flatpak et AUR natif",
      "Accès aux dernières pépites Arch"
    ],
    limitations: [
      "Complexité des options d'install",
      "Demande une bonne connexion internet"
    ],
    useCases: [
      "Station Desktop multisupport",
      "Machine personnalisée pour dev",
      "Exploration de multiples bureaux"
    ],
    technical: {
      base: "Arch Linux",
      packageManager: "pacman",
      releaseModel: "rolling",
      difficulty: "Avancé"
    }
  },
  {
    distro: "Rocky Linux",
    base: "RHEL",
    audience: "Pro",
    points: "Clone RHEL communautaire",
    usage: "Serveurs",
    description: "Rocky Linux est basée sur RHEL. Elle sert surtout pour serveurs.",
    forWho: "Pour pro qui veulent clone rhel communautaire.",
    whyChoose: [
      "Stabilité professionnelle garantie",
      "Compatibilité logicielle RHEL 100%",
      "Cycle de vie long terme rassurant"
    ],
    limitations: [
      "Pas d'usage desktop multimédia",
      "Dépôts officiels conservateurs"
    ],
    useCases: [
      "Serveur Web d'entreprise",
      "Hébergement bases de données",
      "Infrastructure critique Cloud"
    ],
    technical: {
      base: "Red Hat Enterprise Linux",
      packageManager: "dnf",
      releaseModel: "stable / LTS",
      difficulty: "Avancé"
    }
  },
  {
    distro: "Siduction",
    base: "Debian Sid",
    audience: "Avancé",
    points: "Debian unstable maîtrisé",
    usage: "Desktop avancé",
    description: "Siduction est basée sur Debian Sid. Elle sert surtout pour desktop avancé.",
    forWho: "Pour avancé qui veulent debian unstable maîtrisé.",
    whyChoose: [
      "Paquets Debian les plus frais",
      "Installation simplifiée via Calamares",
      "Communtauté experte très réactive"
    ],
    limitations: [
      "Risque inhérent au dépôt Unstable",
      "Mises à jour quotidiennes volumineuses"
    ],
    useCases: [
      "Station desktop pour passionnés",
      "Développement logiciel récent",
      "Exploration des nouveautés Debian"
    ],
    technical: {
      base: "Debian Sid",
      packageManager: "apt",
      releaseModel: "rolling unstable",
      difficulty: "Avancé"
    }
  },
  {
    distro: "Slackware",
    base: "Indépendante",
    audience: "Expert",
    points: "Unix traditionnel",
    usage: "Puristes",
    description: "Slackware est une distribution indépendante. Elle sert surtout pour puristes.",
    forWho: "Pour expert qui veulent unix traditionnel.",
    whyChoose: [
      "Simplicité et stabilité Unix",
      "Zéro dépendance logicielle automatique",
      "Parfaite pour apprendre le système"
    ],
    limitations: [
      "Pas de gestionnaire de dépendances natif",
      "Configuration manuelle par fichiers scripts"
    ],
    useCases: [
      "Serveur minimaliste hyper-stable",
      "Apprentissage profond de Linux",
      "Station pour puristes barbus"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "slackpkg",
      releaseModel: "stable",
      difficulty: "Expert"
    }
  },
  {
    distro: "Slax",
    base: "Debian",
    audience: "Avancé",
    points: "Live rapide",
    usage: "USB boot",
    description: "Slax est basée sur Debian. Elle sert surtout pour usb boot.",
    forWho: "Pour avancé qui veulent live rapide.",
    whyChoose: [
      "Prend très peu de place sur USB",
      "Gestionnaire de fenêtres Fluxbox réactif",
      "Mises à jour via dépôts Debian"
    ],
    limitations: [
      "Moins riche qu'une install standard",
      "Configurable via modules spécifiques"
    ],
    useCases: [
      "Bureau portable de poche",
      "Dépannage rapide en déplacement",
      "Surf anonyme sur PC public"
    ],
    technical: {
      base: "Debian",
      packageManager: "slackpkg",
      releaseModel: "stable",
      difficulty: "Avancé"
    }
  },
  {
    distro: "SliTaz",
    base: "Indépendante",
    audience: "Expert",
    points: "Extrêmement minimal",
    usage: "Très vieux matériel",
    description: "SliTaz est une distribution indépendante. Elle sert surtout pour très vieux matériel.",
    forWho: "Pour expert qui veulent extrêmement minimal.",
    whyChoose: [
      "Poids plume révolutionnaire",
      "Vraiment utilisable sur Pentium III",
      "Outils système maison ingénieux"
    ],
    limitations: [
      "Dépôts de logiciels limités",
      "Incompatible avec les besoins modernes lourds"
    ],
    useCases: [
      "Ranimer des PC de muséum",
      "Serveur web minuscule",
      "Système de secours très léger"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "tazpkg",
      releaseModel: "rolling",
      difficulty: "Expert"
    }
  },
  {
    distro: "Solus",
    base: "Indépendante",
    audience: "Intermédiaire",
    points: "Orienté desktop",
    usage: "Usage personnel",
    description: "Solus est une distribution indépendante. Elle sert surtout pour usage personnel.",
    forWho: "Pour intermédiaire qui veulent orienté desktop.",
    whyChoose: [
      "Environnement Budgie très élégant",
      "Excellentes performances multimédia",
      "Installation logicielle très simple"
    ],
    limitations: [
      "Nombre de paquets inférieur à Debian/Arch",
      "Pas adaptée pour un usage serveur"
    ],
    useCases: [
      "Usage personnel multimédia",
      "Bureautique design",
      "Station Web et Streaming"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "eopkg",
      releaseModel: "rolling",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "SparkyLinux",
    base: "Debian",
    audience: "Intermédiaire",
    points: "Léger et flexible",
    usage: "Desktop",
    description: "SparkyLinux est basée sur Debian. Elle sert surtout pour desktop.",
    forWho: "Pour intermédiaire qui veulent léger et flexible.",
    whyChoose: [
      "Très nombreuses variantes d'usage",
      "Gestionnaire d'installations tiers APTus",
      "Légèreté générale de l'interface"
    ],
    limitations: [
      "Interface un peu hétéroclite",
      "Documentation parfois juste en français"
    ],
    useCases: [
      "Usage desktop polyvalent",
      "Dépannage système (version Rescue)",
      "Jeux Linux sur matériel modeste"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "SpiralLinux",
    base: "Debian",
    audience: "Débutant",
    points: "Debian prêt à l’emploi",
    usage: "Desktop stable",
    description: "SpiralLinux est basée sur Debian. Elle sert surtout pour desktop stable.",
    forWho: "Pour débutant qui veulent debian prêt à l’emploi.",
    whyChoose: [
      "Debian avec codecs pré-installés",
      "Drivers propriétaires configurés",
      "Snapshots Btrfs activés par défaut"
    ],
    limitations: [
      "Peu de différence avec Debian pur",
      "Communauté plus petite"
    ],
    useCases: [
      "Usage bureautique fiable",
      "Transition vers Debian facile",
      "Ordinateur de travail durable"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Tails",
    base: "Debian",
    audience: "Sécurité",
    points: "Anonymat via Tor",
    usage: "Journalisme",
    description: "Tails est basée sur Debian. Elle sert surtout pour journalisme.",
    forWho: "Pour sécurité qui veulent anonymat via tor.",
    whyChoose: [
      "Anonymat internet automatique",
      "Ne laisse aucune trace sur le disque",
      "Sécurisé contre l'espionnage"
    ],
    limitations: [
      "Perte des données au redémarrage",
      "Navigation internet ralentie par Tor"
    ],
    useCases: [
      "Activisme et journalisme sensible",
      "Surf confidentiel en voyage",
      "Audit de sécurité réseau"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Tiny Core Linux",
    base: "Indépendante",
    audience: "Expert",
    points: "Minimal extrême",
    usage: "Embarqué",
    description: "Tiny Core Linux est une distribution indépendante. Elle sert surtout pour embarqué.",
    forWho: "Pour expert qui veulent minimal extrême.",
    whyChoose: [
      "Taille système ridiculement petite",
      "Chargement instantané en mémoire vive",
      "Architecture modulaire unique"
    ],
    limitations: [
      "Installation très peu intuitive",
      "Dépôts de paquets restreints"
    ],
    useCases: [
      "Bornes tactiles et automates",
      "Recyclage de PC très vieux",
      "Serveurs de services légers"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "tce",
      releaseModel: "rolling",
      difficulty: "Expert"
    }
  },
  {
    distro: "Trisquel GNU/Linux",
    base: "Ubuntu",
    audience: "Libre",
    points: "100% logiciel libre",
    usage: "Institutions",
    description: "Trisquel GNU/Linux est basée sur Ubuntu. Elle sert surtout pour institutions.",
    forWho: "Pour libre qui veulent 100% logiciel libre.",
    whyChoose: [
      "Ethique logicielle irréprochable",
      "Excellente stabilité (LTS Ubuntu)",
      "Simple pour la bureautique scolaire"
    ],
    limitations: [
      "Risque d'écrans noirs sans pilotes",
      "Wifi moderne souvent non détecté"
    ],
    useCases: [
      "Équipement d'écoles éthiques",
      "Usage personnel 100% libre",
      "Sensibilisation au logiciel libre"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Tuxedo OS",
    base: "Ubuntu",
    audience: "Utilisateurs Tuxedo",
    points: "Optimisé matériel Tuxedo",
    usage: "Laptops Linux",
    description: "Tuxedo OS est basée sur Ubuntu. Elle sert surtout pour laptops linux.",
    forWho: "Pour utilisateurs tuxedo qui veulent optimisé matériel tuxedo.",
    whyChoose: [
      "Support matériel parfait pour Tuxedo",
      "Configuration KDE Plasma soignée",
      "Base Ubuntu LTS très fiable"
    ],
    limitations: [
      "Moins d'intérêt hors matériel Tuxedo",
      "Outils propriétaires de gestion batterie"
    ],
    useCases: [
      "Usage professionnel sur portable",
      "Poste desktop moderne et fiable",
      "Machine officielle de constructeur"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "Ubuntu",
    base: "Debian",
    audience: "Tous",
    points: "Distribution généraliste",
    usage: "Tous usages",
    description: "Ubuntu est basée sur Debian. Elle sert surtout pour tous usages.",
    forWho: "Pour tous qui veulent distribution généraliste.",
    whyChoose: [
      "Compatibilité matérielle gigantesque",
      "Support professionnel à long terme",
      "Documentation disponible partout"
    ],
    limitations: [
      "Utilisation forcée du format Snap",
      "Système parfois jugé trop commercial"
    ],
    useCases: [
      "Ordinateur de bureau à la maison",
      "Serveur Web et Cloud pro",
      "Développement logiciel Cloud"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Ubuntu Budgie",
    base: "Ubuntu",
    audience: "Débutant",
    points: "Budgie desktop",
    usage: "Desktop",
    description: "Ubuntu Budgie est basée sur Ubuntu. Elle sert surtout pour desktop.",
    forWho: "Pour débutant qui veulent budgie desktop.",
    whyChoose: [
      "Interface vraiment belle et fluide",
      "Logithèque Ubuntu immense",
      "Installation guidée et simple"
    ],
    limitations: [
      "Moins personnalisable que KDE/XFCE",
      "Performances modestes sur PC lents"
    ],
    useCases: [
      "Ordinateur de bureau élégant",
      "Usage personnel multimédia",
      "Bureautique quotidienne fluide"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Ubuntu Cinnamon",
    base: "Ubuntu",
    audience: "Débutant",
    points: "Cinnamon officiel",
    usage: "Desktop",
    description: "Ubuntu Cinnamon est basée sur Ubuntu. Elle sert surtout pour desktop.",
    forWho: "Pour débutant qui veulent cinnamon officiel.",
    whyChoose: [
      "Ergonomie classique Windows-like",
      "Intégration officielle Ubuntu",
      "Gestionnaire de fichiers Nemo pro"
    ],
    limitations: [
      "Doublon relatif avec Linux Mint",
      "Moins d'outils maison que Mint"
    ],
    useCases: [
      "Migration Windows douce",
      "Usage bureautique classique",
      "Poste de travail fiable"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Ubuntu Kylin",
    base: "Ubuntu",
    audience: "Grand public",
    points: "Orienté marché chinois",
    usage: "Desktop",
    description: "Ubuntu Kylin est basée sur Ubuntu. Elle sert surtout pour desktop.",
    forWho: "Pour grand public qui veulent orienté marché chinois.",
    whyChoose: [
      "Superbe bureau UKUI moderne",
      "Logithèque adaptée au marché chinois",
      "Intégrations locales fortes"
    ],
    limitations: [
      "Traductions imfiables en français",
      "Services de recherche géolocalisés"
    ],
    useCases: [
      "Usage desktop en Chine",
      "Bureautique design sobre",
      "Exploration d'interface innovante"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Ubuntu MATE",
    base: "Ubuntu",
    audience: "Débutant",
    points: "Interface classique",
    usage: "Desktop",
    description: "Ubuntu MATE est basée sur Ubuntu. Elle sert surtout pour desktop.",
    forWho: "Pour débutant qui veulent interface classique.",
    whyChoose: [
      "Rapidité et faible consommation",
      "Menue traditionnel intuitif",
      "Grande maturité logicielle"
    ],
    limitations: [
      "Look qui peut paraître ancien",
      "Moins spectaculaire que GNOME 40+"
    ],
    useCases: [
      "Usage professionnel stable",
      "Recyclage de matériel productif",
      "Bureautique quotidienne efficace"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Ubuntu Studio",
    base: "Ubuntu",
    audience: "Créatifs",
    points: "Audio/vidéo pro",
    usage: "Production multimédia",
    description: "Ubuntu Studio est basée sur Ubuntu. Elle sert surtout pour production multimédia.",
    forWho: "Pour créatifs qui veulent audio/vidéo pro.",
    whyChoose: [
      "Logiciels pro pré-configurés",
      "Noyau audio basse latence",
      "Gain de temps à l'installation"
    ],
    limitations: [
      "Système lourd et encombré",
      "Config matérielle minimale requise"
    ],
    useCases: [
      "Production musicale et studio",
      "Montage vidéo et animation",
      "DAO et design graphique"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "Ubuntu Unity",
    base: "Ubuntu",
    audience: "Nostalgique",
    points: "Interface Unity",
    usage: "Desktop",
    description: "Ubuntu Unity est basée sur Ubuntu. Elle sert surtout pour desktop.",
    forWho: "Pour nostalgique qui veulent interface unity.",
    whyChoose: [
      "Workflow Unity unique et rapide",
      "Excellente gestion des écrans laptop",
      "Base logicielle Ubuntu robuste"
    ],
    limitations: [
      "Interface qui divise les foules",
      "Nécessite de l'apprentissage moteur"
    ],
    useCases: [
      "Productivité desktop intense",
      "Usage sur écrans 16:9 étroits",
      "Poste de travail personnel"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Void Linux",
    base: "Indépendante",
    audience: "Avancé",
    points: "runit, rolling",
    usage: "Admins systèmes",
    description: "Void Linux est une distribution indépendante. Elle sert surtout pour admins systèmes.",
    forWho: "Pour avancé qui veulent runit, rolling.",
    whyChoose: [
      "Vitesse de boot foudroyante",
      "Gestionnaire de paquets XBPS génial",
      "Pas de systemd (init runit)"
    ],
    limitations: [
      "Installation en ligne de commande",
      "Logithèque plus réduite qu'Arch"
    ],
    useCases: [
      "Station serveur très rapide",
      "Desktop minimaliste performant",
      "Configuration système fine"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "xbps",
      releaseModel: "rolling",
      difficulty: "Expert"
    }
  },
  {
    distro: "Xubuntu",
    base: "Ubuntu",
    audience: "Débutant",
    points: "XFCE léger",
    usage: "PC modestes",
    description: "Xubuntu est basée sur Ubuntu. Elle sert surtout pour pc modestes.",
    forWho: "Pour débutant qui veulent xfce léger.",
    whyChoose: [
      "Très léger sur le processeur",
      "Hautement personnalisable visuellement",
      "Base logicielle géante Ubuntu"
    ],
    limitations: [
      "Interface austère par défaut",
      "Moins d'automatisme que Mint"
    ],
    useCases: [
      "Bureautique sur matériel modeste",
      "Usage quotidien stable",
      "Ordinateur portable de voyage"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Zorin OS",
    base: "Ubuntu",
    audience: "Débutant",
    points: "UX proche Windows",
    usage: "Migration Windows",
    description: "Zorin OS est basée sur Ubuntu. Elle sert surtout pour migration windows.",
    forWho: "Pour débutant qui veulent ux proche windows.",
    whyChoose: [
      "Beauté visuelle incroyable",
      "Zorin Connect (intégration mobile)",
      "Installation logicielle One-Click"
    ],
    limitations: [
      "Versions Pro payantes pour le design",
      "Base Ubuntu un peu datée en version Lite"
    ],
    useCases: [
      "Premier ordinateur sous Linux",
      "Ordinateur portable personnel",
      "Transition Windows vers Linux"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Kali Linux",
    base: "Debian",
    audience: "Expert",
    points: "Pentest et audit sécurité (tooling préinstallé)",
    usage: "Sécurité",
    description: "Kali Linux est basée sur Debian. Elle sert surtout pour sécurité.",
    forWho: "Pour expert qui veulent pentest et audit sécurité (tooling préinstallé).",
    whyChoose: [
      "Plus de 600 outils de sécurité",
      "Mode 'Undercover' (look Windows)",
      "Vitesse de boot et live USB au top"
    ],
    limitations: [
      "Pas faite pour un usage quotidien",
      "Inappropriée pour les débutants"
    ],
    useCases: [
      "Audit de sécurité informatique",
      "Tests d'intrusion (Pentest)",
      "Apprentissage cybersécurité"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "rolling",
      difficulty: "Expert"
    }
  },
  {
    distro: "Parrot OS",
    base: "Debian",
    audience: "Avancé",
    points: "Sécurité offensive + desktop utilisable (tooling + privacy)",
    usage: "Sécurité",
    description: "Parrot OS est basée sur Debian. Elle sert surtout pour sécurité.",
    forWho: "Pour avancé qui veulent sécurité offensive + desktop utilisable (tooling + privacy).",
    whyChoose: [
      "Outils de sécurité complets",
      "Navigateur et VPN vie privée",
      "Environnement de bureau léger"
    ],
    limitations: [
      "Configuration complexe parfois",
      "Dépôts moins axés stabilité"
    ],
    useCases: [
      "Développement sécurisé",
      "Pentest et audit réseau",
      "Usage desktop privé quotidien"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "rolling",
      difficulty: "Avancé"
    }
  },
  {
    distro: "Qubes OS",
    base: "Xen",
    audience: "Expert",
    points: "Sécurité par isolation: apps séparées en VM (compartimentation)",
    usage: "Sécurité",
    description: "Qubes OS est basée sur Xen. Elle sert surtout pour sécurité.",
    forWho: "Pour expert qui veulent sécurité par isolation: apps séparées en vm (compartimentation).",
    whyChoose: [
      "Isolation quasi inviolable",
      "Compartimentage des données",
      "Gestionnaire de copies inter-VM"
    ],
    limitations: [
      "Matériel très puissant requis",
      "Workflow complexe au début"
    ],
    useCases: [
      "Traitement de données très sensibles",
      "Analyse de fichiers dangereux",
      "Travail confidentiel"
    ],
    technical: {
      base: "Xen (Hyperviseur)",
      packageManager: "dnf/apt selon templates",
      releaseModel: "stable orientée sécurité",
      difficulty: "Expert"
    }
  },
  {
    distro: "Oracle Linux",
    base: "RHEL",
    audience: "Pro",
    points: "Compatibilité RHEL orientée entreprise (écosystème Oracle)",
    usage: "Serveurs",
    description: "Oracle Linux est basée sur RHEL. Elle sert surtout pour serveurs.",
    forWho: "Pour pro qui veulent compatibilité rhel orientée entreprise (écosystème oracle).",
    whyChoose: [
      "Noyau optimisé pour les bases Oracle",
      "Support pro disponible chez Oracle",
      "Gratuit à l'utilisation sans support"
    ],
    limitations: [
      "Traces marketing Oracle présentes",
      "Inadaptée à l'usage personnel"
    ],
    useCases: [
      "Serveur de bases de données",
      "Infrastructure cloud d'entreprise",
      "Migration depuis CentOS"
    ],
    technical: {
      base: "Red Hat Enterprise Linux",
      packageManager: "dnf",
      releaseModel: "stable / LTS",
      difficulty: "Avancé"
    }
  },
  {
    distro: "OpenBSD",
    base: "BSD",
    audience: "Expert",
    points: "Sécurité by design, auditabilité, pf (firewall) réputé",
    usage: "Serveurs",
    description: "OpenBSD est basée sur BSD. Elle sert surtout pour serveurs.",
    forWho: "Pour expert qui veulent sécurité by design, auditabilité, pf (firewall) réputé.",
    whyChoose: [
      "Sécurité proactive permanente",
      "Code système très propre",
      "Pare-feu 'pf' exceptionnel"
    ],
    limitations: [
      "Performances multicœurs en retrait",
      "Hardware récent mal supporté"
    ],
    useCases: [
      "Passerelle et pare-feu réseau",
      "Serveur de courrier sécurisé",
      "Station de travail Unix sécurisée"
    ],
    technical: {
      base: "OpenBSD (indépendant de Linux)",
      packageManager: "pkg_add",
      releaseModel: "stable",
      difficulty: "Expert"
    }
  },
  {
    distro: "Clear Linux",
    base: "Indépendante",
    audience: "Avancé",
    points: "Optimisations performance CPU (stack pensée perf)",
    usage: "Performance",
    description: "Clear Linux est une distribution indépendante. Elle sert surtout pour performance.",
    forWho: "Pour avancé qui veulent optimisations performance cpu (stack pensée perf).",
    whyChoose: [
      "Performance CPU sans égal",
      "Mises à jour atomiques",
      "Zéro logiciel inutile"
    ],
    limitations: [
      "Support matériel non-Intel en retrait",
      "Dépôts d'applications limités"
    ],
    useCases: [
      "Calcul scientifique et Big Data",
      "Station de travail haute puissance",
      "Serveur cloud optimisé"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "swupd",
      releaseModel: "immutable",
      difficulty: "Avancé"
    }
  },
  {
    distro: "Fedora Silverblue",
    base: "Fedora",
    audience: "Avancé",
    points: "Desktop immutable (OSTree) + dev via containers",
    usage: "Immutable",
    description: "Fedora Silverblue est basée sur Fedora. Elle sert surtout pour immutable.",
    forWho: "Pour avancé qui veulent desktop immutable (ostree) + dev via containers.",
    whyChoose: [
      "Mises à jour inaltérables et sûres",
      "Rollback facile en cas de bug",
      "Workflow basé sur les conteneurs"
    ],
    limitations: [
      "Gestion logicielle complexe (Dnf)",
      "Incompatible avec de vieux paradigmes"
    ],
    useCases: [
      "Station de travail pour dev",
      "Test de logiciels isolés",
      "Système de bureau incassable"
    ],
    technical: {
      base: "Fedora",
      packageManager: "dnf",
      releaseModel: "immutable",
      difficulty: "Avancé"
    }
  },
  {
    distro: "openSUSE MicroOS",
    base: "openSUSE",
    audience: "Pro",
    points: "Système immutable orienté serveurs/containers, MAJ atomiques",
    usage: "Immutable",
    description: "openSUSE MicroOS est basée sur openSUSE. Elle sert surtout pour immutable.",
    forWho: "Pour pro qui veulent système immutable orienté serveurs/containers, maj atomiques.",
    whyChoose: [
      "Mises à jour atomiques garanties",
      "Auto-réparation après échec",
      "Optimisé pour Docker/Podman"
    ],
    limitations: [
      "Configuration système via Ignition",
      "Pas un desktop classique"
    ],
    useCases: [
      "Hôte de clusters Kubernetes",
      "Microservices en production",
      "Serveur d'apps conteneurisées"
    ],
    technical: {
      base: "openSUSE",
      packageManager: "zypper",
      releaseModel: "immutable",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "Endless OS Core",
    base: "Debian",
    audience: "Grand public",
    points: "Immutable + hors-ligne (pédago / découverte)",
    usage: "Immutable",
    description: "Endless OS Core est basée sur Debian. Elle sert surtout pour immutable.",
    forWho: "Pour grand public qui veulent immutable + hors-ligne (pédago / découverte).",
    whyChoose: [
      "Impossible de casser le système",
      "Interface visuelle soignée",
      "Usage simplifié au maximum"
    ],
    limitations: [
      "Flexibilité système quasi nulle",
      "Poids des images applicatives"
    ],
    useCases: [
      "Apprentissage scolaire",
      "Ordinateur public en accès libre",
      "Découverte informatique débutant"
    ],
    technical: {
      base: "Debian",
      packageManager: "flatpak / ostree",
      releaseModel: "immutable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "OpenWrt",
    base: "Indépendante",
    audience: "Expert",
    points: "Linux embarqué pour routeurs/switch/AP, réseau",
    usage: "Embarqué",
    description: "OpenWrt est une distribution indépendante. Elle sert surtout pour embarqué.",
    forWho: "Pour expert qui veulent linux embarqué pour routeurs/switch/ap, réseau.",
    whyChoose: [
      "Fonctions réseaux pros sur routeurs",
      "Système de paquets Opkg modulaire",
      "Consommation mémoire insignifiante"
    ],
    limitations: [
      "Installation risquée ('bricking')",
      "Interface Web (LuCI) technique"
    ],
    useCases: [
      "Routeur VPN haute performance",
      "Point d'accès Wifi sécurisé",
      "Passerelle réseau domestique"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "opkg",
      releaseModel: "spécialisé embarqué",
      difficulty: "Expert"
    }
  },
  {
    distro: "Buildroot",
    base: "Indépendante",
    audience: "Expert",
    points: "Générateur de systèmes embarqués minimalistes (toolchain + rootfs)",
    usage: "Embarqué",
    description: "Buildroot est une distribution indépendante. Elle sert surtout pour embarqué.",
    forWho: "Pour expert qui veulent générateur de systèmes embarqués minimalistes (toolchain + rootfs).",
    whyChoose: [
      "Personnalisation bit par bit",
      "Système très fin sur mesure",
      "Génération automatique d'image"
    ],
    limitations: [
      "Zéro gestionnaire de paquets final",
      "Courbe d'apprentissage industrielle"
    ],
    useCases: [
      "Objets connectés (IoT)",
      "Automates industriels",
      "Remplacement firmware compact"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "aucun gestionnaire classique utilisateur",
      releaseModel: "spécialisé embarqué",
      difficulty: "Expert"
    }
  },
  {
    distro: "Raspberry Pi OS",
    base: "Debian",
    audience: "Débutant",
    points: "Distribution officielle pour Raspberry Pi (pédago/DIY)",
    usage: "Éducation",
    description: "Raspberry Pi OS est basée sur Debian. Elle sert surtout pour éducation.",
    forWho: "Pour débutant qui veulent distribution officielle pour raspberry pi (pédago/diy).",
    whyChoose: [
      "Support matériel Raspberry parfait",
      "Logiciels pédagogiques préchargés",
      "Base stable Debian robuste"
    ],
    limitations: [
      "Interface visuelle un peu simple",
      "Performance limitée au CPU ARM"
    ],
    useCases: [
      "Apprendre la programmation Python",
      "Contrôle de robots (GPIO)",
      "Serveur domestique léger"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Débutant"
    }
  },
  {
    distro: "Ubuntu Server",
    base: "Debian",
    audience: "Pro",
    points: "Édition serveur officielle (cloud/infra)",
    usage: "Serveurs",
    description: "Ubuntu Server est basée sur Debian. Elle sert surtout pour serveurs.",
    forWho: "Pour pro qui veulent édition serveur officielle (cloud/infra).",
    whyChoose: [
      "Support Cloud Public exceptionnel",
      "Cycle de vie LTS de 5 à 10 ans",
      "Large choix de tutoriels en ligne"
    ],
    limitations: [
      "Un peu plus lourde que Debian Nu",
      "Installation forcée des Snaps"
    ],
    useCases: [
      "Serveur Web en production",
      "Hébergeur de bases de données",
      "Noeud pour cluster Kubernetes"
    ],
    technical: {
      base: "Debian",
      packageManager: "apt",
      releaseModel: "stable / LTS",
      difficulty: "Avancé"
    }
  },
  {
    distro: "KaOS",
    base: "Indépendante",
    audience: "Intermédiaire",
    points: "KDE-first (sélection resserrée), rolling contrôlée",
    usage: "Desktop",
    description: "KaOS est une distribution indépendante. Elle sert surtout pour desktop.",
    forWho: "Pour intermédiaire qui veulent kde-first (sélection resserrée), rolling contrôlée.",
    whyChoose: [
      "Optimisation Qt exemplaire",
      "Mises à jour rolling réfléchies",
      "Design original et soigné"
    ],
    limitations: [
      "Pas de support des apps GTK/Gnome",
      "Logithèque volontairement réduite"
    ],
    useCases: [
      "Poste desktop Qt pur",
      "Station multimédia design",
      "Usage quotidien cohérent"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "pacman",
      releaseModel: "rolling",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "LXLE",
    base: "Ubuntu",
    audience: "Débutant",
    points: "Orientée vieux PC (très léger)",
    usage: "PC anciens",
    description: "LXLE est basée sur Ubuntu. Elle sert surtout pour pc anciens.",
    forWho: "Pour débutant qui veulent orientée vieux pc (très léger).",
    whyChoose: [
      "Faible poids sur le processeur",
      "Fonds d'écran soignées inclus",
      "Scripts de maintenance automatiques"
    ],
    limitations: [
      "Dépôts logiciels parfois anciens",
      "Look visuel classique basique"
    ],
    useCases: [
      "Ressusciter un vieux PC portable",
      "Station Web pour séniors",
      "Usage bureautique économe"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "AerynOS",
    base: "Indépendante",
    audience: "Avancé",
    points: "Distribution indépendante",
    usage: "Usage général",
    description: "AerynOS est une distribution indépendante. Elle sert surtout pour usage général.",
    forWho: "Pour avancé qui veulent distribution indépendante.",
    whyChoose: [
      "Conception originale et fluide",
      "Environnement bureau réactif",
      "Philosophie orientée performance"
    ],
    limitations: [
      "Support communautaire naissant",
      "Logithèque spécifique restreinte"
    ],
    useCases: [
      "Exploration système",
      "Usage desktop journalier",
      "Station légère pour laptop"
    ],
    technical: {
      base: "Indépendante",
      packageManager: "spécifique",
      releaseModel: "rolling",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "pearOS",
    base: "Ubuntu",
    audience: "Débutant",
    points: "Clone macOS",
    usage: "Desktop",
    description: "pearOS est basée sur Ubuntu. Elle sert surtout pour desktop.",
    forWho: "Pour débutant qui veulent clone macos.",
    whyChoose: [
      "Beauté visuelle proche de Mac",
      "Ergonomie simple et intuitive",
      "Grande compatibilité Ubuntu"
    ],
    limitations: [
      "Maintenance parfois irrégulière",
      "Simplement une 'couche' cosmétique"
    ],
    useCases: [
      "Station desktop esthétique",
      "Migration douce depuis Mac",
      "Navigation Web stylée"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Débutant"
    }
  },
  {
    distro: "PikaOS",
    base: "Ubuntu",
    audience: "Gamer",
    points: "Orienté gaming",
    usage: "Jeux",
    description: "PikaOS est basée sur Ubuntu. Elle sert surtout pour jeux.",
    forWho: "Pour gamer qui veulent orienté gaming.",
    whyChoose: [
      "Drivers GPU pré-installés",
      "Noyau optimisé basse latence",
      "Outils de jeux intégrés (Wine/Steam)"
    ],
    limitations: [
      "Design visuel très marqué",
      "Dédié uniquement à la performance"
    ],
    useCases: [
      "Station gaming principale",
      "Console PC de salon",
      "Usage multimédia performant"
    ],
    technical: {
      base: "Ubuntu",
      packageManager: "apt",
      releaseModel: "rolling",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "ReactOS",
    base: "Indépendante",
    audience: "Curieux",
    points: "Clone Windows",
    usage: "Expérimentation",
    description: "ReactOS est une distribution indépendante. Elle sert surtout pour expérimentation.",
    forWho: "Pour curieux qui veulent clone windows.",
    whyChoose: [
      "Compatibilité Windows native",
      "Système très léger et rapide",
      "Open-source sans code Microsoft"
    ],
    limitations: [
      "Encore en stade Alpha (instable)",
      "Hardware moderne peu supporté"
    ],
    useCases: [
      "Exécuter des logiciels Windows anciens",
      "Expérimentation en Virtualbox",
      "Tests de compatibilité drivers"
    ],
    technical: {
      base: "Indépendante (Windows-compatible)",
      packageManager: "ReactOS App Manager",
      releaseModel: "rolling",
      difficulty: "Expert"
    }
  },
  {
    distro: "Redox OS",
    base: "Indépendante",
    audience: "Expert",
    points: "Écrit en Rust",
    usage: "Expérimentation",
    description: "Redox OS est une distribution indépendante. Elle sert surtout pour expérimentation.",
    forWho: "Pour expert qui veulent écrit en rust.",
    whyChoose: [
      "Sécurité mémoire native (Rust)",
      "Architecture micro-noyau moderne",
      "Performances potentielles élevées"
    ],
    limitations: [
      "Pas encore prêt pour un usage pro",
      "Peu de pilotes disponibles"
    ],
    useCases: [
      "Recherche en sécurité système",
      "Apprentissage du système d'exploitation",
      "Expérimentation en Rust"
    ],
    technical: {
      base: "Indépendante (Micro-noyau Rust)",
      packageManager: "pkg",
      releaseModel: "rolling",
      difficulty: "Expert"
    }
  },
  {
    distro: "VanillaOS",
    base: "Debian/Ubuntu",
    audience: "Intermédiaire",
    points: "Immutable, GNOME pur",
    usage: "Desktop moderne",
    description: "VanillaOS est basée sur Debian/Ubuntu. Elle sert surtout pour desktop moderne.",
    forWho: "Pour intermédiaire qui veulent immutable, gnome pur.",
    whyChoose: [
      "Cœur du système incassable",
      "Installe apps de n'importe quelle distro",
      "Look GNOME pur soignée"
    ],
    limitations: [
      "Concept complexe à assimiler",
      "Demande de la place disque pour les containers"
    ],
    useCases: [
      "Usage desktop stable pro",
      "Développement isolé",
      "Station Web et Média design"
    ],
    technical: {
      base: "Debian / Ubuntu",
      packageManager: "apx",
      releaseModel: "immutable",
      difficulty: "Intermédiaire"
    }
  },
  {
    distro: "Voyager Live",
    base: "Ubuntu/Debian",
    audience: "Débutant",
    points: "Esthétique soignée",
    usage: "Desktop",
    description: "Voyager Live est basée sur Ubuntu/Debian. Elle sert surtout pour desktop.",
    forWho: "Pour débutant qui veulent esthétique soignée.",
    whyChoose: [
      "Look soignée out of the box",
      "Scripts de configuration très pratiques",
      "Base robuste Ubuntu ou Debian"
    ],
    limitations: [
      "Interface parfois trop chargée",
      "Demande un peu de RAM pour les widgets"
    ],
    useCases: [
      "Poste de bureau personnel stylé",
      "Station multimédia complète",
      "Usage quotidien confortable"
    ],
    technical: {
      base: "Ubuntu / Debian",
      packageManager: "apt",
      releaseModel: "stable",
      difficulty: "Débutant"
    }
  }
];