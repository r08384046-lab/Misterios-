export type Continent =
  | 'América del Norte'
  | 'América del Sur'
  | 'Europa'
  | 'África'
  | 'Asia'
  | 'Oceanía';

export type RigorClassification =
  | 'Mito tradicional'
  | 'Leyenda popular'
  | 'Creencia religiosa'
  | 'Relato histórico'
  | 'Interpretación moderna'
  | 'Ficción';

export type PlaceClassification =
  | 'Lugar histórico real'
  | 'Lugar legendario'
  | 'Ubicación mítica o simbólica'
  | 'Interpretación moderna';

export interface CountryEntry {
  id: string;
  name: string;
  isoCode: string;
  flag: string;
  continent: Continent;
  culturalSummary: string;
  mythologies: string[];
  legends: string[];
  creatures: string[];
  deitiesAndFigures: string[];
  sacredPlaces: string[];
  rigor: RigorClassification;
  source: string;
}

export interface MythologyTradition {
  id: string;
  name: string;
  continent: 'Europa' | 'Asia' | 'África' | 'América' | 'Oceanía';
  region: string;
  era: string;
  summary: string;
  cosmogony: string;
  keyFigures: string[];
  keyTextsOrOralSources: string[];
  classification: RigorClassification;
  culturalNote?: string;
}

export interface CreatureEntry {
  id: string;
  name: string;
  origin: string;
  continent: Continent;
  tradition: string;
  category: 'Dragones' | 'Criaturas' | 'Monstruos';
  description: string;
  abilities: string[];
  originStory: string;
  relatedLegends: string[];
  classification: RigorClassification;
  sources: string[];
  imageKey: ImageAssetKey;
}

export interface DeityEntry {
  id: string;
  name: string;
  pantheon: string;
  culture: string;
  continent: Continent;
  domain: string;
  origin: string;
  attributes: string[];
  symbols: string[];
  myths: string;
  culturalRelevance: string;
  classification: RigorClassification;
  respectNote?: string;
  sources: string[];
  imageKey: ImageAssetKey;
}

export interface LegendEntry {
  id: string;
  title: string;
  origin: string;
  continent: Continent;
  era: string;
  classification: RigorClassification;
  summary: string;
  narrative: string[];
  historicalContext: string;
  sources: string[];
  imageKey: ImageAssetKey;
}

export interface MysteriousPlaceEntry {
  id: string;
  name: string;
  location: string;
  continent: Continent;
  placeType: PlaceClassification;
  description: string;
  associatedMyths: string;
  archaeologicalOrHistoricalStatus: string;
  sources: string[];
  imageKey: ImageAssetKey;
}

export interface ParaguayFolkloreEntry {
  id: string;
  name: string;
  guaraniTerm?: string;
  guaraniMeaning?: string;
  category: 'Mitos Guaraníes' | 'Folclore Popular' | 'Lugares y Leyendas';
  origin: string;
  characteristics: string;
  traditionalNarrative: string;
  culturalMeaning: string;
  classification: RigorClassification;
  sources: string[];
}

export interface ComparableEntity {
  id: string;
  name: string;
  culture: string;
  nature: string;
  attributes: string[];
  symbols: string[];
  keyNarrative: string;
  culturalDistinctions: string;
  classification: RigorClassification;
}

export interface StoryEntry {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tradition: string;
  readingTimeMinutes: number;
  classification: RigorClassification;
  imageKey: ImageAssetKey;
  chapters: {
    id: string;
    heading: string;
    paragraphs: string[];
  }[];
  epilogueNote: string;
  sources: string[];
}

export interface QuizQuestion {
  id: number;
  difficulty: 'Básico' | 'Intermedio' | 'Erudito';
  category: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category:
    | 'Dioses'
    | 'Dragones'
    | 'Criaturas'
    | 'Héroes'
    | 'Monstruos'
    | 'Civilizaciones antiguas'
    | 'Lugares legendarios';
  culture: string;
  classification: RigorClassification;
  caption: string;
  source: string;
  imageKey: ImageAssetKey;
}

export type ImageAssetKey =
  | 'hero'
  | 'dragon'
  | 'paraguay'
  | 'deity'
  | 'sanctuary'
  | 'kraken';
