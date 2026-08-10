import { flowers } from "@/data/flowers";
import { grains } from "@/data/knowledge";
import { trees } from "@/data/trees";
import { vegetables } from "@/data/vegetables";
import type { Bilingual, CropSeason, KnowledgeItem } from "@/data/types";

export type Category = "grain" | "vegetable" | "flower" | "tree";

export type CatalogItem = KnowledgeItem & { category: Category };

export const categoryLabel: Record<Category, Bilingual> = {
  grain: { hi: "अनाज व दलहन", en: "Grains & Pulses" },
  vegetable: { hi: "सब्ज़ी", en: "Vegetable" },
  flower: { hi: "फूल", en: "Flower" },
  tree: { hi: "पेड़ व बाग़", en: "Tree & Orchard" },
};

export const categoryRoute: Record<Category, string> = {
  grain: "/anaaj",
  vegetable: "/sabzi",
  flower: "/phool",
  tree: "/ped",
};

export const catalog: CatalogItem[] = [
  ...grains.map((i) => ({ ...i, category: "grain" as const })),
  ...vegetables.map((i) => ({ ...i, category: "vegetable" as const })),
  ...flowers.map((i) => ({ ...i, category: "flower" as const })),
  ...trees.map((i) => ({ ...i, category: "tree" as const })),
];

export const seasonLabel: Record<CropSeason, Bilingual> = {
  kharif: { hi: "खरीफ (जून–अक्टूबर)", en: "Kharif (Jun–Oct)" },
  rabi: { hi: "रबी (अक्टूबर–अप्रैल)", en: "Rabi (Oct–Apr)" },
  zaid: { hi: "जायद / गरमा (मार्च–जून)", en: "Zaid / summer (Mar–Jun)" },
  perennial: { hi: "बहुवर्षीय", en: "Perennial" },
};

/** month: 1–12 */
export function currentSeasons(month: number): CropSeason[] {
  if (month >= 6 && month <= 9) return ["kharif"];
  if (month === 10 || month === 11 || month === 12 || month <= 2) return ["rabi"];
  if (month === 3 || month === 4) return ["rabi", "zaid"];
  return ["zaid"]; // May
}

export type Advice = {
  item: CatalogItem;
  score: number;
  reasons: Bilingual[];
};

export function recommendCrops(opts: {
  tempMax: number;
  tempMin: number;
  rainNext7: number;
  month: number;
  limit?: number;
}): Advice[] {
  const { tempMax, tempMin, rainNext7, month, limit = 12 } = opts;
  const seasons = currentSeasons(month);
  const avg = (tempMax + tempMin) / 2;

  const scored = catalog.map((item) => {
    const reasons: Bilingual[] = [];
    let score = 0;

    const seasonMatch = item.seasons.some((s) => seasons.includes(s));
    if (seasonMatch) {
      score += 4;
      reasons.push({
        hi: "इस समय का उपयुक्त मौसम",
        en: "Right sowing season right now",
      });
    }
    if (item.seasons.includes("perennial")) {
      score += 2;
      reasons.push({ hi: "बहुवर्षीय — कभी भी रोपाई संभव", en: "Perennial — can be planted in a suitable window" });
    }

    const [lo, hi] = item.tempRange;
    if (avg >= lo && avg <= hi) {
      score += 4;
      reasons.push({
        hi: `तापमान ${Math.round(avg)}°C इसकी आदर्श सीमा (${lo}–${hi}°C) में है`,
        en: `Temperature ${Math.round(avg)}°C is inside its ideal range (${lo}–${hi}°C)`,
      });
    } else if (avg >= lo - 5 && avg <= hi + 5) {
      score += 1.5;
      reasons.push({
        hi: `तापमान लगभग ठीक है (आदर्श ${lo}–${hi}°C)`,
        en: `Temperature is workable (ideal ${lo}–${hi}°C)`,
      });
    } else {
      score -= 3;
    }

    if (item.waterNeed === "high") {
      if (rainNext7 >= 25) {
        score += 2;
        reasons.push({ hi: "अच्छी वर्षा — अधिक पानी वाली फसल के लिए लाभदायक", en: "Good rainfall ahead — suits this water-loving crop" });
      } else {
        reasons.push({ hi: "सिंचाई की व्यवस्था रखें, वर्षा कम है", en: "Arrange irrigation — little rain expected" });
      }
    }
    if (item.waterNeed === "low" && rainNext7 > 60) {
      score -= 1.5;
      reasons.push({ hi: "अधिक वर्षा से जल-जमाव का ख़तरा — मेड़ पर बोएँ", en: "Heavy rain may waterlog it — sow on ridges" });
    }

    return { item, score, reasons };
  });

  return scored
    .filter((s) => s.score > 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function weatherAdvisories(opts: {
  tempMax: number;
  tempMin: number;
  rainNext7: number;
  humidity: number;
  wind: number;
}): Bilingual[] {
  const out: Bilingual[] = [];
  const { tempMax, tempMin, rainNext7, humidity, wind } = opts;

  if (tempMax >= 38)
    out.push({
      hi: "लू का ख़तरा: हल्की व बार-बार सिंचाई करें, दोपहर में छिड़काव न करें, मल्चिंग करें।",
      en: "Heat-wave risk: irrigate lightly and more often, avoid midday spraying, use mulch.",
    });
  if (tempMin <= 4)
    out.push({
      hi: "पाला (शीतलहर) की संभावना: शाम को हल्की सिंचाई करें, नर्सरी को पॉलीथीन/पुआल से ढकें।",
      en: "Frost risk: irrigate in the evening and cover nurseries with polythene or straw.",
    });
  if (rainNext7 >= 50)
    out.push({
      hi: "अच्छी वर्षा संभावित: खेत की नालियाँ साफ़ रखें, यूरिया व छिड़काव वर्षा से पहले न करें।",
      en: "Heavy rain likely: clear field drains; do not apply urea or sprays just before rain.",
    });
  if (rainNext7 < 5)
    out.push({
      hi: "सूखा जैसा सप्ताह: टपक/स्प्रिंकलर से पानी बचाएँ, खरपतवार हटाएँ जिससे नमी बची रहे।",
      en: "Dry week ahead: save water with drip/sprinkler and weed to conserve soil moisture.",
    });
  if (humidity >= 80)
    out.push({
      hi: "नमी अधिक: फफूँद रोग (झुलसा, ब्लास्ट) का ख़तरा — रोग-निरोधक छिड़काव की तैयारी रखें।",
      en: "High humidity: fungal disease risk (blight/blast) — keep a preventive spray ready.",
    });
  if (wind >= 25)
    out.push({
      hi: "तेज़ हवा: छिड़काव टालें, केला/अरहर जैसी लम्बी फसलों को सहारा दें।",
      en: "Strong winds: postpone spraying and stake tall crops such as banana or pigeon pea.",
    });
  if (out.length === 0)
    out.push({
      hi: "मौसम खेती के अनुकूल है — बुवाई, निराई और खाद देने का अच्छा समय।",
      en: "Weather is favourable — a good window for sowing, weeding and fertiliser application.",
    });
  return out;
}
