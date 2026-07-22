import type {
  BibliographyEntry,
  Coordinates,
  Species,
  SpeciesDetailedSections,
  SpeciesSectionMedia,
  SpeciesTraits
} from '../../types/domain';

interface SpeciesSeed {
  id: string;
  name: string;
  period: string;
  image?: string;
  rangeStartKya: number;
  rangeEndKya: number;
  region: string;
  summary: string;
  genetics: string;
  culture: string[];
  tools: string[];
  hybridations: string[];
  coordinates: Coordinates[];
  bibliography: BibliographyEntry[];
  profile: {
    status: string;
    anatomy: string;
    ecology: string;
    sites: string;
    debate: string;
    dna: string;
    cultureDetail: string;
    toolDetail: string;
    landmarkDetail: string;
    caution: string;
  };
  media?: Partial<Record<keyof SpeciesDetailedSections, SpeciesSectionMedia>>;
}

const defaultMedia: SpeciesSectionMedia = {
  image: '/images/species/homo-lineage.svg',
  alt: 'Illustration stylisee du genre Homo',
  caption: "Schema stylise pour situer une espece du genre Homo dans une histoire faite de branches, d'outils et de migrations.",
  credit: 'Illustration Paleogeneticor',
  sourceUrl: '/images/species/homo-lineage.svg'
};

const sapiensMedia = {
  genetics: {
    image: '/images/species/details/homo-hybridation.png',
    alt: 'Schema de phylogenie et hybridations du genre Homo',
    caption: 'Schema des hybridations du genre Homo, utile pour lire les apports neandertaliens et denisoviens chez Sapiens.',
    credit: 'Dbachmann / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Filogenia_Homo_Hibrida%C3%A7%C3%A3o.png'
  },
  culture: {
    image: '/images/species/details/venus-willendorf.jpg',
    alt: 'Venus de Willendorf',
    caption: 'Venus de Willendorf: image concrete pour aborder art mobilier, symboles et transmission culturelle.',
    credit: 'MatthiasKabel / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Venus_von_Willendorf_01.jpg'
  },
  landmarks: {
    image: '/images/species/details/jebel-irhoud-sapiens.jpg',
    alt: 'Fossiles Homo sapiens de Jebel Irhoud',
    caption: 'Jebel Irhoud: repere africain majeur pour comprendre les premiers Homo sapiens connus.',
    credit: 'MPI EVA Leipzig / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Homo_sapiens_from_Jebel_Irhoud.jpg'
  },
  tools: {
    image: '/images/species/details/jebel-irhoud-tools.png',
    alt: 'Outils en pierre de Jebel Irhoud',
    caption: "Outils de Jebel Irhoud: industrie lithique associee aux premiers fossiles africains attribues a Sapiens.",
    credit: 'MPI EVA Leipzig / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Stone_tools_from_Jebel_Irhoud.png'
  }
} satisfies Partial<Record<keyof SpeciesDetailedSections, SpeciesSectionMedia>>;

const neanderthalMedia = {
  genetics: {
    image: '/images/species/details/neanderthal-dna-extraction.jpg',
    alt: "Extraction d'ADN neandertalien en salle propre",
    caption: "Extraction d'ADN neandertalien en salle propre: contamination et protocole comptent autant que le fossile.",
    credit: 'NHGRI / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Neanderthal_DNA_extraction.jpg'
  },
  culture: {
    image: '/images/species/details/neanderthal-scratches.jpg',
    alt: 'Eclat de silex incise associe a Neandertal',
    caption: 'Eclat incise de Kiik-Koba: support utile pour expliquer les indices symboliques attribues a Neandertal.',
    credit: 'Gerbil / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Neandertal_scratches.jpg'
  },
  landmarks: {
    image: '/images/species/details/neanderthal-range-adna.webp',
    alt: 'Carte de repartition neandertalienne et segments ADN',
    caption: "Carte de repartition et segments d'ADN neandertalien dans des genomes humains anciens.",
    credit: 'Hajdinjak et al. / Wikimedia Commons',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Geographical_distribution_of_Neanderthal_archaeological_sites_and_genome-wide_distribution_of_Neanderthal_alleles_in_the_genomes_of_ancient_modern_humans.webp'
  },
  tools: {
    image: '/images/species/details/neanderthal-mousterian-point.png',
    alt: 'Pointe mousterienne',
    caption: 'Pointe mousterienne: piece simple en apparence, mais produite par une preparation technique controlee.',
    credit: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mousterian_point.png'
  }
} satisfies Partial<Record<keyof SpeciesDetailedSections, SpeciesSectionMedia>>;

const denisovanMedia = {
  genetics: {
    image: '/images/species/details/denisova-phalanx.jpg',
    alt: 'Replica de phalange denisovienne',
    caption: 'Phalange de Denisova: un fragment minuscule a suffi a identifier une lignee humaine par l ADN.',
    credit: 'Thilo Parg / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Denisova_Phalanx_distalis.jpg'
  },
  culture: {
    image: '/images/species/details/denisova-pendants.jpg',
    alt: 'Pendentifs et os coches de Denisova',
    caption: 'Parures et os coches de Denisova: des objets parlants, mais a attribuer avec prudence couche par couche.',
    credit: 'Thilo Parg / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Denisova_Cave_pendants_notched_bones.jpg'
  },
  landmarks: {
    image: '/images/species/details/denisova-cave.jpg',
    alt: 'Paysage pres de la grotte Denisova',
    caption: "Le secteur de Denisova dans l'Altai: repere central pour une lignee surtout connue par les biomolecules.",
    credit: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Black_Anui_of_Ust-Kansky_district._Denisova_cave.jpg'
  },
  tools: {
    image: '/images/species/details/denisova-lithic-artifacts.jpg',
    alt: 'Artefacts lithiques et osseux de Denisova',
    caption: "Artefacts de Denisova: la fiche distingue l'objet, la couche et l'attribution biologique.",
    credit: 'Thilo Parg / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Denisova_Cave_lithic_and_osseous_artifacts_grey.jpg'
  }
} satisfies Partial<Record<keyof SpeciesDetailedSections, SpeciesSectionMedia>>;

const seeds: SpeciesSeed[] = [
  {
    id: 'homo-habilis',
    name: 'Homo habilis',
    period: "Environ 2,3 a 1,4 million d'annees avant le present",
    image: '/images/species/homo-habilis.jpg',
    rangeStartKya: 2300,
    rangeEndKya: 1400,
    region: 'Afrique orientale et australe',
    summary: "Un des premiers representants attribues au genre Homo, associe a des outils simples et a une augmentation moderee du cerveau.",
    genetics: "Aucun ADN ancien n'est disponible; les parentes reposent sur morphologie, datations et contexte archeologique.",
    culture: ['Oldowayen', 'Decoupe de carcasses', 'Exploitation opportuniste des ressources'],
    tools: ['Galets amenages', 'Eclats simples', 'Percuteurs'],
    hybridations: ['Homo rudolfensis', 'Homo ergaster'],
    coordinates: [{ lat: -2.99, lng: 35.35 }, { lat: -25.93, lng: 27.78 }],
    bibliography: [
      { label: 'Early Homo at Olduvai Gorge', year: 1964, source: 'Nature' },
      { label: 'The genus Homo and early stone tools', year: 2015, source: 'Science' }
    ],
    profile: {
      status: "Taxon classique mais aux limites discutees.",
      anatomy: "Cerveau plus volumineux que chez les australopitheques, face encore primitive, main compatible avec la manipulation fine.",
      ecology: "Mosaique de savanes, boisements et rives lacustres d'Afrique orientale.",
      sites: "Olduvai, Koobi Fora, Sterkfontein et ensembles est-africains.",
      debate: "Certains fossiles attribues a H. habilis pourraient appartenir a plusieurs especes proches.",
      dna: "L'anciennete et les climats africains rendent la conservation de l'ADN improbable avec les methodes actuelles.",
      cultureDetail: "Les comportements connus restent surtout inferes par les traces de decoupe et les industries oldowayennes.",
      toolDetail: "Le debit simple produit des eclats coupants; l'outil n'est pas encore standardise comme plus tard dans l'Acheuleen.",
      landmarkDetail: "H. habilis situe l'entree du genre Homo dans une experimentation anatomique et technique.",
      caution: "Son statut de premiere espece Homo reste un point de discussion."
    }
  },
  {
    id: 'homo-rudolfensis',
    name: 'Homo rudolfensis',
    period: "Environ 2,4 a 1,8 million d'annees avant le present",
    image: '/images/species/homo-rudolfensis.jpg',
    rangeStartKya: 2400,
    rangeEndKya: 1800,
    region: 'Afrique orientale',
    summary: 'Contemporain de Homo habilis, souvent distingue par une face plus large et un volume cranien plus important.',
    genetics: "Aucun ADN ancien disponible; la discussion repose sur quelques fossiles craniens et mandibulaires.",
    culture: ['Contextes oldowayens', 'Occupation de milieux ouverts', 'Coexistence avec autres hominines'],
    tools: ['Eclats oldowayens', 'Galets tailles', 'Outils opportunistes'],
    hybridations: ['Homo habilis', 'Homo ergaster'],
    coordinates: [{ lat: 3.95, lng: 36.2 }],
    bibliography: [
      { label: 'KNM-ER 1470 and early Homo diversity', year: 2012, source: 'Nature' },
      { label: 'Early Homo diversity in East Africa', year: 2015, source: 'Science' }
    ],
    profile: {
      status: "Espece acceptee par de nombreux chercheurs, mais parfois regroupee avec H. habilis.",
      anatomy: "Face large et relativement plate, dents robustes, capacite cranienne plus elevee que plusieurs formes contemporaines.",
      ecology: "Paysages lacustres et plaines d'Afrique de l'Est.",
      sites: "Koobi Fora et region du lac Turkana.",
      debate: "Le debat lumpers/splitters est central: variation sexuelle, variation individuelle ou espece distincte ?",
      dna: "Aucune biomolecule exploitable n'est attendue pour l'instant.",
      cultureDetail: "Les associations culturelles sont indirectes car plusieurs hominines partagent les memes paysages.",
      toolDetail: "Les outils simples du contexte ne permettent pas toujours d'attribuer une industrie a une espece precise.",
      landmarkDetail: "H. rudolfensis montre que les premiers Homo etaient deja diversifies.",
      caution: "La rarete du registre fossile impose une lecture prudente."
    }
  },
  {
    id: 'homo-gautengensis',
    name: 'Homo gautengensis',
    period: "Environ 2,0 a 0,8 million d'annees avant le present",
    image: '/images/species/homo-gautengensis.jpg',
    rangeStartKya: 2000,
    rangeEndKya: 800,
    region: 'Afrique du Sud',
    summary: "Taxon propose pour classer certains fossiles sud-africains a morphologie primitive et mosaique.",
    genetics: "Aucun ADN ancien; le statut repose sur interpretation morphologique de fossiles fragmentaires.",
    culture: ['Contextes de grottes sud-africaines', 'Comportements difficiles a attribuer', 'Possible usage de ressources variees'],
    tools: ['Outils simples associes aux contextes regionaux', 'Eclats', 'Percuteurs'],
    hybridations: ['Homo habilis', 'Homo ergaster'],
    coordinates: [{ lat: -26.02, lng: 27.73 }],
    bibliography: [
      { label: 'A new species of Homo from South Africa', year: 2010, source: 'Homo' },
      { label: 'South African early Homo fossils', year: 2013, source: 'Journal of Human Evolution' }
    ],
    profile: {
      status: "Taxon propose et debattu, moins consensuel que H. erectus ou H. neanderthalensis.",
      anatomy: "Morphologie mosaique avec traits primitifs et caracteres attribues au genre Homo.",
      ecology: "Grottes et paysages ouverts d'Afrique australe.",
      sites: "Sterkfontein, Swartkrans et region du Gauteng.",
      debate: "Beaucoup de chercheurs preferent rattacher ces fossiles a d'autres especes d'Homo ancien.",
      dna: "Aucune conservation genetique connue.",
      cultureDetail: "Les sites sud-africains melangent souvent plusieurs hominines et carnivores, compliquant l'attribution.",
      toolDetail: "Les artefacts simples ne suffisent pas a definir une signature culturelle propre.",
      landmarkDetail: "Le taxon illustre la difficulte de nommer les especes a partir de restes fragmentaires.",
      caution: "A presenter comme hypothese taxonomique plutot que certitude stabilisee."
    }
  },
  {
    id: 'homo-ergaster',
    name: 'Homo ergaster',
    period: "Environ 2,0 a 1,0 million d'annees avant le present",
    image: '/images/species/homo-ergaster.jpg',
    rangeStartKya: 2000,
    rangeEndKya: 1000,
    region: 'Afrique',
    summary: "Forme africaine proche de Homo erectus, avec corps allonge, bipede efficace et expansion des traditions acheuleennes.",
    genetics: "Aucun ADN ancien; sa place repose sur anatomie postcranienne et comparaison avec H. erectus asiatique.",
    culture: ['Acheuleen ancien', 'Mobilite accrue', 'Exploitation de grands territoires'],
    tools: ['Bifaces anciens', 'Hachereaux', 'Eclats retouches'],
    hybridations: ['Homo erectus', 'Homo heidelbergensis'],
    coordinates: [{ lat: 3.95, lng: 36.2 }, { lat: -1.5, lng: 35.5 }],
    bibliography: [
      { label: 'The Nariokotome Homo erectus skeleton', year: 1993, source: 'Harvard University Press' },
      { label: 'Early African Homo erectus/ergaster', year: 2007, source: 'Nature' }
    ],
    profile: {
      status: "Souvent separe de H. erectus asiatique, parfois inclus dans un H. erectus au sens large.",
      anatomy: "Corps grand et elance, jambes longues, proportions proches des humains marcheurs et coureurs.",
      ecology: "Milieux africains ouverts, mobilite plus importante que chez les premiers Homo.",
      sites: "Turkana, Koobi Fora, Nariokotome et sites acheuleens africains.",
      debate: "La limite entre H. ergaster et H. erectus depend du choix taxonomique.",
      dna: "Aucune donnee genetique directe.",
      cultureDetail: "Les comportements suggerent une meilleure organisation spatiale et une exploitation plus large des paysages.",
      toolDetail: "L'Acheuleen introduit des bifaces plus symetriques et une planification technique accrue.",
      landmarkDetail: "H. ergaster marque un changement de silhouette, de mobilite et de technologie.",
      caution: "Les fossiles africains et asiatiques sont proches mais pas identiques."
    }
  },
  {
    id: 'homo-erectus',
    name: 'Homo erectus',
    period: "Environ 1,9 million a 110 000 ans avant le present",
    image: '/images/species/homo-erectus.jpg',
    rangeStartKya: 1900,
    rangeEndKya: 110,
    region: 'Afrique puis surtout Asie',
    summary: "Une des especes humaines les plus durables, associee a de longues expansions et a une grande diversite regionale.",
    genetics: "Aucun genome ancien confirme; les relations sont reconstruites par fossiles, datations et comparaisons morphologiques.",
    culture: ['Acheuleen selon regions', 'Occupations longues', 'Usage probable du feu dans certains contextes'],
    tools: ['Bifaces', 'Hachereaux', 'Eclats standardises'],
    hybridations: ['Homo ergaster', 'Homo floresiensis'],
    coordinates: [{ lat: -6.91, lng: 107.6 }, { lat: 39.69, lng: 115.92 }],
    bibliography: [
      { label: 'Java Man and Homo erectus', year: 1894, source: 'Historical fossil record' },
      { label: 'Late surviving Homo erectus at Ngandong', year: 2019, source: 'Nature' }
    ],
    profile: {
      status: "Taxon majeur et largement reconnu, mais tres variable dans le temps et l'espace.",
      anatomy: "Crane bas et allonge, arcades robustes, corps generalement moderne dans ses proportions.",
      ecology: "Milieux tropicaux et temperes d'Asie, avec occupations durables.",
      sites: "Java, Zhoukoudian, Sangiran, Ngandong et Dmanissi selon les definitions larges.",
      debate: "Sa duree exceptionnelle regroupe peut-etre plusieurs populations distinctes.",
      dna: "Les climats tropicaux et l'anciennete limitent fortement les chances d'ADN conserve.",
      cultureDetail: "Les comportements varient selon les regions; l'absence d'Acheuleen classique en Asie orientale a longtemps ete discutee.",
      toolDetail: "Les outils vont de traditions simples a des assemblages plus organises selon les sites.",
      landmarkDetail: "H. erectus montre la premiere grande installation durable du genre Homo hors d'Afrique.",
      caution: "Ne pas reduire H. erectus a une seule population asiatique uniforme."
    }
  },
  {
    id: 'homo-georgicus',
    name: 'Homo georgicus',
    period: "Environ 1,8 million d'annees avant le present",
    image: '/images/species/homo-georgicus.jpg',
    rangeStartKya: 1800,
    rangeEndKya: 1770,
    region: 'Caucase, Georgie',
    summary: "Population de Dmanissi, souvent consideree comme la plus ancienne presence humaine connue hors d'Afrique.",
    genetics: "Aucun ADN ancien; son statut repose sur un ensemble fossile exceptionnel mais tres ancien.",
    culture: ['Sortie precoce d Afrique', 'Occupation de Dmanissi', 'Adaptation hors milieu africain'],
    tools: ['Oldowayen', 'Eclats simples', 'Galets amenages'],
    hybridations: ['Homo erectus', 'Homo ergaster'],
    coordinates: [{ lat: 41.33, lng: 44.2 }],
    bibliography: [
      { label: 'Dmanisi and earliest Homo outside Africa', year: 2002, source: 'Science' },
      { label: 'A complete skull from Dmanisi', year: 2013, source: 'Science' }
    ],
    profile: {
      status: "Parfois defini comme espece, parfois comme forme ancienne de H. erectus.",
      anatomy: "Petite capacite cranienne, forte variabilite entre individus, corps capable de dispersion.",
      ecology: "Caucase a la charniere entre Afrique, Proche-Orient et Eurasie.",
      sites: "Dmanissi en Georgie.",
      debate: "Les fossiles montrent une variation qui nourrit le debat entre espece distincte et H. erectus ancien.",
      dna: "Aucune donnee genetique disponible.",
      cultureDetail: "La presence hors d'Afrique precede les technologies acheuleennes classiques.",
      toolDetail: "Les outils simples montrent qu'une technologie modeste suffisait pour une dispersion precoce.",
      landmarkDetail: "Dmanissi transforme le scenario des premieres sorties d'Afrique.",
      caution: "Le nom H. georgicus n'est pas accepte par tous."
    }
  },
  {
    id: 'homo-antecessor',
    name: 'Homo antecessor',
    period: 'Environ 850 000 a 770 000 ans avant le present',
    image: '/images/species/homo-antecessor.jpg',
    rangeStartKya: 850,
    rangeEndKya: 770,
    region: 'Europe occidentale, Espagne',
    summary: "Espece d'Atapuerca proposee comme forme europeenne ancienne, parfois placee pres des origines des lignees recentes.",
    genetics: "Pas de genome complet; des proteines anciennes ont aide a discuter sa position phylogenetique.",
    culture: ['Occupation ancienne de l Europe', 'Gran Dolina', 'Comportements de subsistance complexes'],
    tools: ['Mode 1 europeen', 'Eclats', 'Outils de boucherie'],
    hybridations: ['Homo heidelbergensis', 'Homo sapiens'],
    coordinates: [{ lat: 42.35, lng: -3.52 }],
    bibliography: [
      { label: 'Homo antecessor from Gran Dolina', year: 1997, source: 'Science' },
      { label: 'Palaeoproteomics of Homo antecessor', year: 2020, source: 'Nature' }
    ],
    profile: {
      status: "Espece reconnue dans de nombreux travaux, mais sa position exacte reste debattue.",
      anatomy: "Combinaison de traits primitifs et de certains traits faciaux plus modernes.",
      ecology: "Europe du Pleistocene inferieur, avec occupations dans la Sierra de Atapuerca.",
      sites: "Gran Dolina, Atapuerca.",
      debate: "Ancetre direct, branche soeur ou population laterale ? Les interpretations divergent.",
      dna: "Les proteines anciennes apportent un signal quand l'ADN n'est plus accessible.",
      cultureDetail: "Les traces de boucherie et d'occupation documentent une installation ancienne en Europe.",
      toolDetail: "Industries simples mais efficaces pour decoupe et traitement de carcasses.",
      landmarkDetail: "H. antecessor est un repere majeur pour le peuplement ancien de l'Europe.",
      caution: "La paleoproteomique affine la parente sans donner toute la resolution d'un genome."
    }
  },
  {
    id: 'homo-heidelbergensis',
    name: 'Homo heidelbergensis',
    period: 'Environ 600 000 a 200 000 ans avant le present',
    image: '/images/species/homo-heidelbergensis.jpg',
    rangeStartKya: 600,
    rangeEndKya: 200,
    region: 'Europe et Afrique selon definitions',
    summary: "Espece ou complexe de populations du Pleistocene moyen, souvent lie aux origines neandertaliennes.",
    genetics: "Des populations proches sont reliees aux Neandertaliens; le contour exact varie selon les auteurs.",
    culture: ['Acheuleen tardif', 'Chasse organisee', 'Occupation de milieux temperes'],
    tools: ['Bifaces', 'Lances en bois', 'Eclats prepares'],
    hybridations: ['Homo neanderthalensis', 'Homo rhodesiensis'],
    coordinates: [{ lat: 49.4, lng: 8.7 }, { lat: 52.84, lng: 10.96 }],
    bibliography: [
      { label: 'Mauer mandible and Homo heidelbergensis', year: 1908, source: 'Historical fossil record' },
      { label: 'Middle Pleistocene human evolution', year: 2016, source: 'Nature' }
    ],
    profile: {
      status: "Taxon utile mais souvent traite comme complexe plutot qu'espece nette.",
      anatomy: "Crane robuste, grand cerveau, traits intermediaires entre formes anciennes et Neandertaliens.",
      ecology: "Europe du Pleistocene moyen, avec alternances climatiques fortes.",
      sites: "Mauer, Boxgrove, Schoningen, Atapuerca selon cadres taxonomiques.",
      debate: "Le terme est parfois reserve a l'Europe, parfois etendu a l'Afrique.",
      dna: "Les fossiles tres anciens livrent rarement de l'ADN, mais des lignees proches sont documentees genetiquement.",
      cultureDetail: "Les donnees suggerent chasse planifiee et occupation durable de territoires.",
      toolDetail: "Les lances de Schoningen et les bifaces montrent une technologie avancee pour le Pleistocene moyen.",
      landmarkDetail: "H. heidelbergensis sert de pivot pour discuter l'origine de Neandertal.",
      caution: "Sa definition change selon que l'on separe ou regroupe les fossiles africains."
    }
  },
  {
    id: 'homo-rhodesiensis',
    name: 'Homo rhodesiensis',
    period: 'Environ 600 000 a 300 000 ans avant le present',
    image: '/images/species/homo-rhodesiensis.jpg',
    rangeStartKya: 600,
    rangeEndKya: 300,
    region: 'Afrique',
    summary: "Forme africaine du Pleistocene moyen, souvent discutee dans l'ascendance de Homo sapiens.",
    genetics: "Aucun genome direct; le taxon est discute a partir de fossiles africains robustes.",
    culture: ['Middle Stone Age ancien', 'Acheuleen africain tardif', 'Transitions techniques'],
    tools: ['Bifaces', 'Pointes', 'Eclats prepares'],
    hybridations: ['Homo sapiens', 'Homo heidelbergensis'],
    coordinates: [{ lat: -13.13, lng: 28.4 }],
    bibliography: [
      { label: 'Broken Hill skull and African Middle Pleistocene Homo', year: 1921, source: 'Historical fossil record' },
      { label: 'African origins of modern humans', year: 2019, source: 'Nature Ecology & Evolution' }
    ],
    profile: {
      status: "Taxon debattu, parfois remplace par H. heidelbergensis africain ou H. bodoensis dans des propositions recentes.",
      anatomy: "Crane robuste, grand visage, cerveau volumineux, traits non encore pleinement modernes.",
      ecology: "Afrique du Pleistocene moyen, milieux varies.",
      sites: "Broken Hill / Kabwe et autres fossiles africains moyens.",
      debate: "Le nom, l'extension et la relation avec Sapiens restent discutes.",
      dna: "Aucune donnee genetique directe.",
      cultureDetail: "Les contextes africains montrent des transitions progressives vers des comportements plus modernes.",
      toolDetail: "Les outils combinent traditions acheuleennes tardives et innovations du Middle Stone Age.",
      landmarkDetail: "H. rhodesiensis aide a poser la question des ancetres africains de Sapiens.",
      caution: "Le taxon doit etre presente comme convention de classement, non comme unanimite."
    }
  },
  {
    id: 'homo-naledi',
    name: 'Homo naledi',
    period: 'Environ 335 000 a 236 000 ans avant le present',
    image: '/images/species/homo-naledi.jpg',
    rangeStartKya: 335,
    rangeEndKya: 236,
    region: 'Afrique du Sud',
    summary: "Espece a morphologie mosaique, petit cerveau mais mains et pieds etonnamment modernes, decouverte dans Rising Star.",
    genetics: "Aucun ADN ancien confirme; les datations montrent une coexistence possible avec les premiers Sapiens.",
    culture: ['Rising Star', 'Acces a des grottes profondes', 'Comportements debattus'],
    tools: ['Aucun outillage propre certain', 'Attributions prudentes', 'Indices contextuels'],
    hybridations: ['Homo sapiens', 'Homo rhodesiensis'],
    coordinates: [{ lat: -26.02, lng: 27.7 }],
    bibliography: [
      { label: 'Homo naledi from Rising Star', year: 2015, source: 'eLife' },
      { label: 'Dating Homo naledi', year: 2017, source: 'eLife' }
    ],
    profile: {
      status: "Espece reconnue mais comportements et implications encore vivement discutes.",
      anatomy: "Petit cerveau, mains aptes a la manipulation, pieds proches des notres, epaules et tronc plus primitifs.",
      ecology: "Systeme de grottes sud-africain, contexte de depot difficile a interpreter.",
      sites: "Rising Star, chambres Dinaledi et Lesedi.",
      debate: "Les hypotheses de depot intentionnel ou de comportements symboliques sont controversees.",
      dna: "Aucune biomolecule exploitable publiee a ce jour.",
      cultureDetail: "Le contexte souterrain souleve des questions sur l'acces, les depots et les capacites comportementales.",
      toolDetail: "Sans industrie associee certaine, il faut eviter d'attribuer des outils par proximite.",
      landmarkDetail: "H. naledi montre qu'un petit cerveau peut coexister tardivement avec une anatomie postcranienne complexe.",
      caution: "Les interpretations comportementales doivent etre separees des faits anatomiques et chronologiques."
    }
  },
  {
    id: 'homo-neanderthalensis',
    name: 'Homo neanderthalensis',
    period: 'Environ 430 000 a 40 000 ans avant le present',
    image: '/images/species/homo-neanderthalensis.webp',
    rangeStartKya: 430,
    rangeEndKya: 40,
    region: 'Europe et Asie occidentale',
    summary: 'Espece humaine robuste adaptee aux environnements froids, connue par un abondant registre fossile et par plusieurs genomes anciens.',
    genetics: "Les genomes neandertaliens montrent des episodes d'introgression avec Homo sapiens et une diversite regionale limitee dans certains groupes tardifs.",
    culture: ['Mousterien', 'Utilisation du feu', 'Soin aux individus fragiles', 'Parures possibles'],
    tools: ['Racloirs', 'Pointes Levallois', 'Outils sur eclats'],
    hybridations: ['Homo sapiens', 'Denisoviens'],
    coordinates: [{ lat: 49.974, lng: 7.95 }, { lat: 43.35, lng: 5.53 }],
    bibliography: [
      { label: 'Draft sequence of the Neandertal genome', year: 2010, source: 'Science' },
      { label: 'A high-coverage Neandertal genome', year: 2014, source: 'Nature' }
    ],
    media: neanderthalMedia,
    profile: {
      status: "Espece majeure et bien documentee.",
      anatomy: "Corps trapu, squelette robuste, face projetee, grand volume cranien.",
      ecology: "Climats froids et temperes d'Eurasie occidentale.",
      sites: "Vindija, Neander, La Chapelle-aux-Saints, Shanidar, Mezmaiskaya.",
      debate: "Les causes de disparition et le degre de symbolisme restent discutes.",
      dna: "Plusieurs genomes de qualite documentent parente, introgression et diversite regionale.",
      cultureDetail: "Les indices de soins, feu, pigments et sepultures possibles montrent des comportements complexes.",
      toolDetail: "Levallois et Mousterien temoignent de chaines operatoires planifiees.",
      landmarkDetail: "Neandertal est la reference pour comprendre l'hybridation entre humains recents.",
      caution: "Eviter les caricatures: ni brute primitive, ni simple double de Sapiens."
    }
  },
  {
    id: 'denisovans',
    name: 'Denisoviens',
    period: 'Pleistocene moyen et superieur',
    image: '/images/species/denisovans.webp',
    rangeStartKya: 300,
    rangeEndKya: 30,
    region: 'Asie du Nord et traces genetiques en Oceanie et Asie',
    summary: "Groupe humain identifie d'abord par l'ADN ancien, avec un registre fossile encore tres rare.",
    genetics: 'Les Denisoviens ont contribue au patrimoine genetique de populations actuelles, notamment en Oceanie et dans certaines regions d Asie.',
    culture: ['Occupation de grottes', 'Adaptation a haute altitude probable', "Interactions avec d'autres humains"],
    tools: ['Industries lithiques regionales', 'Objets de parure associes au site de Denisova'],
    hybridations: ['Homo sapiens', 'Homo neanderthalensis'],
    coordinates: [{ lat: 51.397, lng: 84.68 }, { lat: 35.45, lng: 102.57 }],
    bibliography: [
      { label: 'Genetic history of an archaic hominin group from Denisova Cave', year: 2010, source: 'Nature' },
      { label: 'A late Middle Pleistocene Denisovan mandible from the Tibetan Plateau', year: 2019, source: 'Nature' }
    ],
    media: denisovanMedia,
    profile: {
      status: "Lignee genetique majeure, parfois nommee Homo denisova de facon informelle.",
      anatomy: "Anatomie encore mal connue; dents et mandibule suggerent une morphologie robuste.",
      ecology: "Asie continentale, Altai, plateau tibetain et traces genetiques plus larges.",
      sites: "Grotte de Denisova, Xiahe / Baishiya Karst Cave.",
      debate: "Le rang taxonomique exact reste ouvert faute de squelette complet.",
      dna: "L'ADN est central: il a revele le groupe avant les fossiles.",
      cultureDetail: "Les objets de Denisova doivent etre attribues avec prudence car plusieurs humains ont occupe la grotte.",
      toolDetail: "Les industries asiatiques sont variees et difficiles a relier a une seule lignee biologique.",
      landmarkDetail: "Denisova montre que la genetique peut decouvrir des populations invisibles morphologiquement.",
      caution: "Ne pas confondre site de Denisova, lignage denisovien et toutes les cultures asiatiques du Pleistocene."
    }
  },
  {
    id: 'homo-floresiensis',
    name: 'Homo floresiensis',
    period: 'Environ 700 000 a 50 000 ans avant le present',
    image: '/images/species/homo-floresiensis.jpg',
    rangeStartKya: 700,
    rangeEndKya: 50,
    region: 'Ile de Flores, Indonesie',
    summary: 'Petite espece insulaire surnommee le Hobbit, associee a une evolution de taille reduite sur Flores.',
    genetics: "Aucun ADN ancien disponible; les hypotheses reposent sur anatomie, insularite et contexte archeologique.",
    culture: ['Insularite', 'Chasse a petite faune et Stegodon nain', 'Occupation de Liang Bua'],
    tools: ['Eclats', 'Outils simples', 'Assemblages lithiques de Flores'],
    hybridations: ['Homo erectus', 'Homo luzonensis'],
    coordinates: [{ lat: -8.53, lng: 120.44 }],
    bibliography: [
      { label: 'A new small-bodied hominin from Flores', year: 2004, source: 'Nature' },
      { label: 'Homo floresiensis and island evolution', year: 2016, source: 'Nature' }
    ],
    profile: {
      status: "Espece reconnue, avec origine encore discutee.",
      anatomy: "Tres petite taille, petit cerveau, combinaison de traits primitifs et derives.",
      ecology: "Contexte insulaire, ressources limitees, faune endemique.",
      sites: "Liang Bua et Mata Menge pour des formes plus anciennes de Flores.",
      debate: "Descendance de H. erectus nanifie ou survivance d'une lignee plus ancienne ?",
      dna: "Le climat tropical rend la conservation de l'ADN tres difficile.",
      cultureDetail: "La survie sur ile implique adaptation locale et exploitation de ressources particulieres.",
      toolDetail: "Les outils montrent que petite taille et petit cerveau n'empechent pas des comportements techniques efficaces.",
      landmarkDetail: "H. floresiensis bouleverse l'idee d'une evolution humaine lineaire vers des corps toujours plus grands.",
      caution: "Les explications pathologiques sont largement moins retenues qu'au debut, mais les origines restent debattues."
    }
  },
  {
    id: 'homo-luzonensis',
    name: 'Homo luzonensis',
    period: 'Environ 70 000 a 50 000 ans avant le present',
    image: '/images/species/homo-luzonensis.jpg',
    rangeStartKya: 70,
    rangeEndKya: 50,
    region: 'Ile de Luzon, Philippines',
    summary: "Espece insulaire recente connue par des dents et os fragmentaires, montrant une mosaique de traits inattendue.",
    genetics: "Aucun ADN ancien; l'attribution repose sur morphologie dentaire et osseuse.",
    culture: ['Insularite philippine', 'Occupation de grotte', 'Coexistence regionale avec Sapiens possible'],
    tools: ['Outils regionaux non directement attribues', 'Eclats', 'Traces de boucherie regionales'],
    hybridations: ['Homo floresiensis', 'Homo sapiens'],
    coordinates: [{ lat: 17.7, lng: 121.82 }],
    bibliography: [
      { label: 'A new species of Homo from Luzon', year: 2019, source: 'Nature' },
      { label: 'Late Pleistocene hominins in the Philippines', year: 2019, source: 'Nature' }
    ],
    profile: {
      status: "Espece recente proposee en 2019 et encore discutee.",
      anatomy: "Dents et phalanges combinant traits modernes, primitifs et insulaires.",
      ecology: "Milieu insulaire tropical, avec fortes contraintes de dispersion maritime ou abaissements marins.",
      sites: "Grotte de Callao, Luzon.",
      debate: "La rarete des restes rend difficile la reconstruction du corps complet.",
      dna: "Pas d'ADN conserve publie.",
      cultureDetail: "Les comportements restent difficiles a definir faute d'associations archeologiques directes.",
      toolDetail: "Les outils regionaux ne peuvent pas etre attribues automatiquement a H. luzonensis.",
      landmarkDetail: "H. luzonensis confirme la diversite humaine tardive en Asie du Sud-Est insulaire.",
      caution: "La fiche doit distinguer ce qui est observe des hypotheses sur taille et mode de vie."
    }
  },
  {
    id: 'homo-sapiens',
    name: 'Homo sapiens',
    period: "Environ 300 000 ans avant le present a aujourd'hui",
    image: '/images/species/homo-sapiens.webp',
    rangeStartKya: 300,
    rangeEndKya: 0,
    region: 'Origine africaine puis expansion mondiale',
    summary: 'Espece humaine actuelle, documentee par les fossiles, l archeologie et les genomes anciens et modernes.',
    genetics: 'Les genomes anciens permettent de suivre les expansions, remplacements partiels, melanges et adaptations locales.',
    culture: ['Industries lithiques variees', 'Art mobilier et parietal', 'Navigation', 'Agriculture tardive'],
    tools: ['Lames', 'Aiguilles', 'Propulseurs', 'Microlithes'],
    hybridations: ['Homo neanderthalensis', 'Denisoviens'],
    coordinates: [{ lat: 31.8, lng: -7.1 }, { lat: -24.2, lng: 29.0 }],
    bibliography: [
      { label: 'The genomic history of Ice Age Europe', year: 2016, source: 'Nature' },
      { label: 'Ancient human genomes suggest three ancestral populations for present-day Europeans', year: 2014, source: 'Nature' }
    ],
    media: sapiensMedia,
    profile: {
      status: "Seule espece humaine encore vivante.",
      anatomy: "Crane globulaire, menton marque, squelette gracile en moyenne, grande variabilite mondiale.",
      ecology: "Origine africaine puis expansion dans presque tous les environnements terrestres.",
      sites: "Jebel Irhoud, Omo Kibish, Herto, Skhul, Qafzeh et nombreux sites mondiaux.",
      debate: "Les debats portent surtout sur la structure de l'origine africaine et les migrations successives.",
      dna: "Genomes anciens et modernes documentent migrations, melanges et adaptations.",
      cultureDetail: "La diversite culturelle est immense: art, parures, reseaux, agriculture et technologies composites.",
      toolDetail: "Les outils incluent pierre, os, bois animal, fibres, colles et objets composites.",
      landmarkDetail: "H. sapiens permet de relier toutes les autres especes humaines a notre propre histoire.",
      caution: "L'evolution de Sapiens n'est pas une marche inevitable vers le present."
    }
  },
  {
    id: 'homo-longi',
    name: 'Homo longi',
    period: 'Pleistocene moyen, environ 146 000 ans avant le present',
    image: '/images/species/homo-longi.png',
    rangeStartKya: 300,
    rangeEndKya: 146,
    region: 'Chine du Nord-Est',
    summary: "Taxon propose pour le crane de Harbin, parfois rapproche des Denisoviens ou d'autres humains asiatiques du Pleistocene moyen.",
    genetics: "Pas d'ADN publie pour le crane de Harbin; les liens denisoviens restent des hypotheses morphologiques et phylogenetiques.",
    culture: ['Asie du Pleistocene moyen', 'Contexte archeologique limite', 'Comparaisons morphologiques'],
    tools: ['Aucun outillage direct certain', 'Assemblages regionaux a discuter', 'Attributions prudentes'],
    hybridations: ['Denisoviens', 'Homo sapiens'],
    coordinates: [{ lat: 45.75, lng: 126.64 }],
    bibliography: [
      { label: 'Late Middle Pleistocene Harbin cranium', year: 2021, source: 'The Innovation' },
      { label: 'Middle Pleistocene Homo diversity in Asia', year: 2021, source: 'The Innovation' }
    ],
    profile: {
      status: "Taxon recent et conteste, utile pour discuter la diversite asiatique.",
      anatomy: "Grand crane robuste, face large, combinaison de traits archaiques et derives.",
      ecology: "Asie orientale du Pleistocene moyen, contexte exact du fossile limite.",
      sites: "Harbin, Chine.",
      debate: "H. longi est-il une espece distincte, un Denisovien, ou une autre population asiatique ?",
      dna: "Aucune donnee genetique directe; la comparaison avec Denisova est indirecte.",
      cultureDetail: "Le manque de contexte archeologique limite les conclusions comportementales.",
      toolDetail: "Aucune industrie ne peut etre attribuee avec certitude au crane de Harbin.",
      landmarkDetail: "H. longi rappelle que l'Asie du Pleistocene moyen est encore tres mal resolue.",
      caution: "A presenter comme proposition taxonomique recente, non comme consensus ferme."
    }
  }
];

function makeDetailedSections(seed: SpeciesSeed): SpeciesDetailedSections {
  const media = {
    genetics: seed.media?.genetics ?? defaultMedia,
    culture: seed.media?.culture ?? defaultMedia,
    landmarks: seed.media?.landmarks ?? defaultMedia,
    tools: seed.media?.tools ?? defaultMedia
  };

  return {
    genetics: {
      intro: `${seed.profile.dna} ${seed.profile.caution}`,
      media: media.genetics,
      highlights: [
        seed.genetics,
        `Statut scientifique: ${seed.profile.status}`,
        `Debat principal: ${seed.profile.debate}`
      ],
      topics: [
        {
          title: 'Position dans le genre Homo',
          summary: `${seed.name} est replace dans une histoire de parentes souvent debattue.`,
          details: [
            seed.profile.status,
            seed.profile.debate,
            `Les comparaisons mobilisent anatomie, chronologie, sites et, quand c'est possible, ADN ou proteines.`
          ],
          evidence: seed.profile.dna
        },
        {
          title: 'Anatomie et parente',
          summary: seed.profile.anatomy,
          details: [
            seed.profile.anatomy,
            `La morphologie est comparee aux especes proches: ${seed.hybridations.join(', ')}.`,
            "Les classifications different selon que l'on regroupe la variation ou que l'on distingue plus finement les fossiles."
          ],
          evidence: 'Morphologie comparee et datations'
        },
        {
          title: 'Limites de preuve',
          summary: seed.profile.caution,
          details: [
            seed.profile.caution,
            "Le registre fossile est incomplet et privilegie certaines regions ou conditions de conservation.",
            "Les absences d'ADN ne signifient pas absence de parente, seulement absence de preuve genetique directe."
          ],
          evidence: 'Biais de conservation et echantillonnage fossile'
        }
      ],
      metrics: [
        { label: 'Consensus taxonomique', value: consensusValue(seed.profile.status), note: seed.profile.status },
        { label: 'Donnees genetiques', value: dnaValue(seed.profile.dna), note: seed.profile.dna },
        { label: 'Registre fossile', value: fossilValue(seed.profile.sites), note: seed.profile.sites }
      ]
    },
    culture: {
      intro: seed.profile.cultureDetail,
      media: media.culture,
      highlights: [
        `Culture materielle: ${seed.culture.join(', ')}`,
        seed.profile.ecology,
        seed.profile.cultureDetail
      ],
      topics: [
        {
          title: 'Milieu et adaptations',
          summary: seed.profile.ecology,
          details: [
            seed.profile.ecology,
            "L'environnement influence mobilite, ressources disponibles, abris et contraintes techniques.",
            "Une espece ne se resume pas a un outil: elle occupe des paysages et des temporalites variables."
          ],
          evidence: 'Faune, sediments, isotopes, datations et repartition des sites'
        },
        {
          title: 'Comportements connus',
          summary: seed.profile.cultureDetail,
          details: [
            seed.profile.cultureDetail,
            `Les indices principaux incluent: ${seed.culture.join(', ')}.`,
            "Les comportements sont souvent inferes indirectement a partir des objets, os marques et contextes de depot."
          ],
          evidence: 'Assemblages archeologiques et traces de surface'
        },
        {
          title: 'Prudence d attribution',
          summary: "Un objet trouve dans une couche ne suffit pas toujours a identifier l'espece qui l'a produit.",
          details: [
            "Plusieurs hominines peuvent partager une region ou un site a des periodes proches.",
            "Les couches peuvent etre remaniees ou melanger des occupations successives.",
            seed.profile.caution
          ],
          evidence: 'Stratigraphie, datation et association directe'
        }
      ],
      metrics: [
        { label: 'Diversite culturelle', value: cultureValue(seed.culture.length), note: seed.culture.join(', ') },
        { label: 'Contexte archeologique', value: fossilValue(seed.profile.sites), note: seed.profile.sites },
        { label: 'Niveau de prudence', value: cautionValue(seed.profile.caution), note: 'Attribution a evaluer site par site' }
      ]
    },
    landmarks: {
      intro: seed.profile.landmarkDetail,
      media: media.landmarks,
      highlights: [
        `Periode: ${seed.period}`,
        `Region principale: ${seed.region}`,
        `Sites reperes: ${seed.profile.sites}`
      ],
      topics: [
        {
          title: 'Chronologie',
          summary: seed.period,
          details: [
            `Fourchette retenue: ${seed.period}.`,
            "Les bornes changent parfois avec de nouvelles datations ou de nouveaux fossiles.",
            "Les dates anciennes sont des intervalles de travail, pas des apparitions ou disparitions instantanees."
          ],
          evidence: 'Datations radiometriques, stratigraphie et comparaisons fauniques'
        },
        {
          title: 'Geographie',
          summary: seed.region,
          details: [
            `Aire principale documentee: ${seed.region}.`,
            seed.profile.sites,
            "La carte reflete aussi les zones fouillees et les conditions de conservation."
          ],
          evidence: 'Fossiles attribues, sites archeologiques et contexte regional'
        },
        {
          title: 'Role dans le recit evolutif',
          summary: seed.profile.landmarkDetail,
          details: [
            seed.profile.landmarkDetail,
            "Chaque espece sert de repere pour une question: origine du genre, dispersion, insularite, hybridation ou diversite tardive.",
            seed.profile.debate
          ],
          evidence: 'Synthese paleoanthropologique'
        }
      ],
      metrics: [
        { label: 'Anciennete', value: ageValue(seed.rangeStartKya), note: seed.period },
        { label: 'Amplitude temporelle', value: durationValue(seed.rangeStartKya, seed.rangeEndKya), note: `${seed.rangeStartKya - seed.rangeEndKya} ka` },
        { label: 'Extension connue', value: extensionValue(seed.region), note: seed.region }
      ]
    },
    tools: {
      intro: seed.profile.toolDetail,
      media: media.tools,
      highlights: [
        `Outils principaux: ${seed.tools.join(', ')}`,
        seed.profile.toolDetail,
        "Les outils doivent etre lus avec leur couche, leur datation et les especes presentes."
      ],
      topics: [
        {
          title: 'Chaine operatoire',
          summary: seed.profile.toolDetail,
          details: [
            seed.profile.toolDetail,
            "Une chaine operatoire decrit choix de matiere premiere, gestes de taille, usage et reaffutage.",
            "Elle renseigne autant sur les capacites techniques que sur l'organisation du territoire."
          ],
          evidence: 'Technologie lithique, remontages et traces d usure'
        },
        {
          title: 'Objets caracteristiques',
          summary: seed.tools.join(', '),
          details: [
            `Objets ou traditions associes: ${seed.tools.join(', ')}.`,
            "Ces categories simplifient des assemblages souvent plus variables.",
            "Un meme type d'outil peut etre partage par plusieurs especes ou populations."
          ],
          evidence: 'Assemblages lithiques et osseux'
        },
        {
          title: 'Ce que l outil ne prouve pas',
          summary: "Une industrie ne se confond pas automatiquement avec une espece biologique.",
          details: [
            "L'attribution est solide quand outils, fossiles et stratigraphie concordent.",
            "Elle est plus fragile quand les fossiles humains sont absents.",
            seed.profile.caution
          ],
          evidence: 'Association directe entre fossiles, artefacts et couches'
        }
      ],
      metrics: [
        { label: 'Complexite technique', value: toolValue(seed.tools), note: seed.tools.join(', ') },
        { label: 'Association directe', value: fossilValue(seed.profile.sites), note: seed.profile.sites },
        { label: 'Variation regionale', value: extensionValue(seed.region), note: seed.region }
      ]
    }
  };
}

const traitsById: Record<string, SpeciesTraits> = {
  'homo-habilis': {
    height: 'Environ 1,0 a 1,35 m',
    weight: 'Environ 30 a 45 kg',
    cranialCapacity: 'Environ 510 a 700 cm3',
    dnaRecovered: 'Non, aucun ADN ancien recupere',
    parentage: 'Premier Homo possible; proche de H. rudolfensis et des formes menant a H. ergaster',
    diet: 'Omnivore opportuniste: plantes, tubercules, viande recuperee ou decoupee',
    fire: 'Non documente',
    burials: 'Non documentees'
  },
  'homo-rudolfensis': {
    height: 'Inconnue; probablement proche des premiers Homo',
    weight: 'Inconnu; estimation fragile',
    cranialCapacity: 'Environ 700 a 800 cm3 selon fossiles attribues',
    dnaRecovered: 'Non, aucun ADN ancien recupere',
    parentage: 'Contemporain de H. habilis; statut separe debattu',
    diet: 'Omnivore probable, deduit de la denture et du contexte',
    fire: 'Non documente',
    burials: 'Non documentees'
  },
  'homo-gautengensis': {
    height: 'Inconnue',
    weight: 'Inconnu',
    cranialCapacity: 'Mal contrainte; petit a moyen volume cranien',
    dnaRecovered: 'Non, aucun ADN ancien recupere',
    parentage: 'Taxon sud-africain propose; parentage exact incertain',
    diet: 'Omnivore probable, avec ressources vegetales et animales',
    fire: 'Non documente avec certitude',
    burials: 'Non documentees'
  },
  'homo-ergaster': {
    height: 'Environ 1,55 a 1,85 m',
    weight: 'Environ 50 a 70 kg',
    cranialCapacity: 'Environ 700 a 900 cm3',
    dnaRecovered: 'Non, aucun ADN ancien recupere',
    parentage: 'Forme africaine proche ou incluse dans H. erectus',
    diet: 'Omnivore avec part carnivore accrue et exploitation de carcasses',
    fire: 'Possible mais preuves anciennes discutees',
    burials: 'Non documentees'
  },
  'homo-erectus': {
    height: 'Environ 1,45 a 1,80 m',
    weight: 'Environ 45 a 70 kg',
    cranialCapacity: 'Environ 600 a 1 100 cm3',
    dnaRecovered: 'Non, aucun genome ancien confirme',
    parentage: 'Lignee durable issue des premiers Homo; possible source de formes insulaires',
    diet: 'Omnivore generaliste, viande, plantes, ressources locales variees',
    fire: 'Usage probable dans certains sites, chronologie debattue',
    burials: 'Non documentees'
  },
  'homo-georgicus': {
    height: 'Environ 1,45 a 1,65 m',
    weight: 'Environ 40 a 55 kg',
    cranialCapacity: 'Environ 550 a 775 cm3',
    dnaRecovered: 'Non, aucun ADN ancien recupere',
    parentage: 'Population tres ancienne hors Afrique, souvent rapprochee de H. erectus',
    diet: 'Omnivore opportuniste dans le contexte de Dmanissi',
    fire: 'Non documente',
    burials: 'Non documentees'
  },
  'homo-antecessor': {
    height: 'Environ 1,60 a 1,75 m estime',
    weight: 'Environ 60 a 80 kg estime',
    cranialCapacity: 'Environ 1 000 cm3, estimation prudente',
    dnaRecovered: 'ADN non recupere; proteines anciennes analysees',
    parentage: 'Branche europeenne ancienne; position proche des lignees recentes debattue',
    diet: 'Omnivore; traces de boucherie et ressources animales documentees',
    fire: 'Non documente avec certitude',
    burials: 'Non documentees'
  },
  'homo-heidelbergensis': {
    height: 'Environ 1,60 a 1,80 m',
    weight: 'Environ 60 a 90 kg',
    cranialCapacity: 'Environ 1 100 a 1 400 cm3',
    dnaRecovered: 'ADN direct rare; lignees proches documentees par biomolecules',
    parentage: 'Souvent place pres de l origine des Neandertaliens',
    diet: 'Omnivore avec chasse importante dans plusieurs contextes',
    fire: 'Probable dans certains sites du Pleistocene moyen',
    burials: 'Non etablies; accumulations fossiles debattues'
  },
  'homo-rhodesiensis': {
    height: 'Environ 1,65 a 1,80 m estime',
    weight: 'Environ 60 a 85 kg estime',
    cranialCapacity: 'Environ 1 200 a 1 300 cm3',
    dnaRecovered: 'Non, aucun ADN ancien direct',
    parentage: 'Forme africaine du Pleistocene moyen liee aux origines de Sapiens selon certains modeles',
    diet: 'Omnivore; chasse et collecte probables',
    fire: 'Possible dans les contextes africains du Pleistocene moyen',
    burials: 'Non documentees'
  },
  'homo-naledi': {
    height: 'Environ 1,40 a 1,50 m',
    weight: 'Environ 40 a 55 kg',
    cranialCapacity: 'Environ 465 a 610 cm3',
    dnaRecovered: 'Non, aucun ADN ancien publie',
    parentage: 'Lignee mosaique tardive; relations exactes incertaines',
    diet: 'Omnivore probable; regime precis mal connu',
    fire: 'Hypotheses debattues, non etablies comme consensus',
    burials: 'Depots en grotte debattus; sepultures intentionnelles non consensuelles'
  },
  'homo-neanderthalensis': {
    height: 'Environ 1,55 a 1,70 m',
    weight: 'Environ 60 a 85 kg, corps robuste',
    cranialCapacity: 'Environ 1 200 a 1 750 cm3',
    dnaRecovered: 'Oui, nombreux genomes mitochondriaux et nucleaires',
    parentage: 'Groupe frere des Denisoviens; cousin proche de H. sapiens',
    diet: 'Omnivore avec forte part carnivore selon regions, plantes aussi documentees',
    fire: 'Oui, usage recurrent documente',
    burials: 'Sepultures possibles ou probables selon sites, interpretation discutee'
  },
  denisovans: {
    height: 'Inconnue; morphologie corporelle mal documentee',
    weight: 'Inconnu',
    cranialCapacity: 'Inconnue',
    dnaRecovered: 'Oui, ADN mitochondrial et nucleaire recupere',
    parentage: 'Groupe frere des Neandertaliens',
    diet: 'Inconnue directement; omnivorie probable par analogie contextuelle',
    fire: 'Non attribue directement avec certitude',
    burials: 'Non documentees'
  },
  'homo-floresiensis': {
    height: 'Environ 1,05 a 1,10 m',
    weight: 'Environ 25 a 35 kg',
    cranialCapacity: 'Environ 425 cm3',
    dnaRecovered: 'Non, aucun ADN ancien recupere',
    parentage: 'Origine debattue: forme insulaire issue de H. erectus ou lignee plus ancienne',
    diet: 'Omnivore insulaire; petits animaux, ressources vegetales, Stegodon nain possible',
    fire: 'Indices de feu dans la region, attribution directe prudente',
    burials: 'Non documentees'
  },
  'homo-luzonensis': {
    height: 'Inconnue; petite taille possible mais non mesuree solidement',
    weight: 'Inconnu',
    cranialCapacity: 'Inconnue',
    dnaRecovered: 'Non, aucun ADN ancien recupere',
    parentage: 'Lignee insulaire asiatique; parentage exact incertain',
    diet: 'Inconnue; omnivorie probable dans un contexte insulaire',
    fire: 'Non documente directement',
    burials: 'Non documentees'
  },
  'homo-sapiens': {
    height: 'Tres variable; moyenne recente environ 1,50 a 1,85 m selon populations et sexe',
    weight: 'Tres variable; environ 45 a 90 kg et plus selon contextes',
    cranialCapacity: 'Environ 1 200 a 1 600 cm3',
    dnaRecovered: 'Oui, nombreux genomes anciens et modernes',
    parentage: 'Origine africaine; hybridations connues avec Neandertaliens et Denisoviens',
    diet: 'Omnivore tres flexible: chasse, collecte, peche, agriculture plus tardive',
    fire: 'Oui, usage systematique',
    burials: 'Oui, sepultures documentees dans de nombreux contextes'
  },
  'homo-longi': {
    height: 'Inconnue',
    weight: 'Inconnu',
    cranialCapacity: 'Environ 1 420 cm3 pour le crane de Harbin',
    dnaRecovered: 'Non, aucun ADN publie pour le crane de Harbin',
    parentage: 'Position debattue; rapprochements proposes avec Denisoviens ou autres Homo asiatiques',
    diet: 'Inconnue; omnivorie probable',
    fire: 'Non documente directement',
    burials: 'Non documentees'
  }
};

function buildSpecies(seed: SpeciesSeed): Species {
  return {
    id: seed.id,
    name: seed.name,
    period: seed.period,
    image: seed.image ?? '/images/species/homo-lineage.svg',
    rangeStartKya: seed.rangeStartKya,
    rangeEndKya: seed.rangeEndKya,
    region: seed.region,
    summary: seed.summary,
    genetics: seed.genetics,
    culture: seed.culture,
    tools: seed.tools,
    hybridations: seed.hybridations,
    traits: traitsById[seed.id],
    detailedSections: makeDetailedSections(seed),
    coordinates: seed.coordinates,
    bibliography: seed.bibliography
  };
}

function consensusValue(status: string): number {
  if (status.includes('conteste') || status.includes('debattu')) return 48;
  if (status.includes('propose')) return 42;
  if (status.includes('majeur') || status.includes('reconnue')) return 82;
  return 64;
}

function dnaValue(dna: string): number {
  if (dna.includes('central') || dna.includes('genomes')) return 92;
  if (dna.includes('proteines')) return 58;
  if (dna.includes('Aucun')) return 18;
  return 45;
}

function fossilValue(sites: string): number {
  if (sites.includes('nombreux') || sites.includes('Plusieurs')) return 80;
  if (sites.includes('Dmanissi') || sites.includes('Atapuerca') || sites.includes('Denisova')) return 72;
  return 58;
}

function cultureValue(count: number): number {
  return Math.min(95, 40 + count * 14);
}

function cautionValue(caution: string): number {
  return caution.includes('prud') || caution.includes('hypoth') ? 72 : 45;
}

function ageValue(startKya: number): number {
  return Math.min(96, Math.max(20, Math.round((startKya / 2400) * 100)));
}

function durationValue(startKya: number, endKya: number): number {
  return Math.min(95, Math.max(12, Math.round(((startKya - endKya) / 1900) * 100)));
}

function extensionValue(region: string): number {
  if (region.includes('mondiale') || region.includes('Afrique puis')) return 95;
  if (region.includes('Asie') || region.includes('Europe et')) return 78;
  if (region.includes('Ile') || region.includes('Luzon') || region.includes('Flores')) return 42;
  return 62;
}

function toolValue(tools: string[]): number {
  const text = tools.join(' ');
  if (text.includes('Bifaces') || text.includes('Lames') || text.includes('Levallois')) return 82;
  if (text.includes('Aucun') || text.includes('prudentes')) return 32;
  return 58;
}

export const speciesCatalog = seeds.map(buildSpecies);
