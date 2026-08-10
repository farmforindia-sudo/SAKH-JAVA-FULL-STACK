// Shared bilingual data model for all SAKH knowledge content.

export type Bilingual = { hi: string; en: string };

export type CropSeason = "kharif" | "rabi" | "zaid" | "perennial";

export type KnowledgeItem = {
  id: string;
  /** Hindi name */
  name: string;
  /** English name */
  english: string;
  emoji: string;
  season: Bilingual;
  soil: Bilingual;
  seed: Bilingual;
  water: Bilingual;
  fertilizer: Bilingual;
  pests: Bilingual;
  duration: Bilingual;
  yieldInfo: Bilingual;
  steps: Bilingual[];
  tip: Bilingual;
  /** English + Hindi search keywords */
  keywords?: string[];
  /** Growing seasons, used by the weather advisor */
  seasons: CropSeason[];
  /** Ideal air temperature range in °C, used by the weather advisor */
  tempRange: [number, number];
  /** Water need level, used by the weather advisor */
  waterNeed: "low" | "medium" | "high";
  /** Source citation label, e.g. "ICAR / KVK Package of Practices" */
  source?: string;
};

export type MachineItem = {
  id: string;
  name: string;
  english: string;
  emoji: string;
  use: Bilingual;
  cost: Bilingual;
  power: Bilingual;
  care: Bilingual;
  safety: Bilingual;
  keywords?: string[];
  source?: string;
};

export type GuideItem = {
  id: string;
  title: Bilingual;
  body: Bilingual[];
  keywords?: string[];
  source?: string;
};

export type SchemeItem = {
  id: string;
  name: Bilingual;
  benefit: Bilingual;
  eligibility: Bilingual;
  how: Bilingual;
  link?: string;
};
