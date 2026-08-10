import type { Bilingual } from "./types";

export type SourceItem = {
  id: string;
  name: Bilingual;
  what: Bilingual;
  url: string;
};

export const sources: SourceItem[] = [
  {
    id: "icar",
    name: { hi: "भारतीय कृषि अनुसंधान परिषद (ICAR)", en: "Indian Council of Agricultural Research (ICAR)" },
    what: {
      hi: "फसलों की उन्नत किस्में, बीज दर, खाद व कीट प्रबंधन की सिफ़ारिशें — इस वेबसाइट की खेती विधियों का मुख्य आधार।",
      en: "Improved varieties, seed rates, nutrient and pest management recommendations — the main basis of the practices on this site.",
    },
    url: "https://icar.org.in",
  },
  {
    id: "iiwbr",
    name: { hi: "ICAR–भारतीय गेहूँ व जौ अनुसंधान संस्थान (IIWBR), करनाल", en: "ICAR–Indian Institute of Wheat & Barley Research, Karnal" },
    what: { hi: "गेहूँ व जौ की किस्में, बुवाई समय और रोग प्रबंधन।", en: "Wheat and barley varieties, sowing windows and disease management." },
    url: "https://iiwbr.icar.gov.in",
  },
  {
    id: "irri-nrri",
    name: { hi: "ICAR–राष्ट्रीय चावल अनुसंधान संस्थान (NRRI), कटक", en: "ICAR–National Rice Research Institute, Cuttack" },
    what: { hi: "धान की किस्में, श्री विधि (SRI) और जल प्रबंधन।", en: "Rice varieties, SRI method and water management." },
    url: "https://icar-nrri.in",
  },
  {
    id: "iivr",
    name: { hi: "ICAR–भारतीय सब्ज़ी अनुसंधान संस्थान (IIVR), वाराणसी", en: "ICAR–Indian Institute of Vegetable Research, Varanasi" },
    what: { hi: "सब्ज़ियों की नर्सरी, किस्में और कीट-रोग नियंत्रण।", en: "Vegetable nursery practice, varieties and pest–disease control." },
    url: "https://iivr.icar.gov.in",
  },
  {
    id: "bau",
    name: { hi: "बिहार कृषि विश्वविद्यालय, सबौर (BAU)", en: "Bihar Agricultural University, Sabour" },
    what: { hi: "बिहार के लिए फसल पंचांग व स्थानीय सिफ़ारिशें।", en: "Bihar-specific crop calendars and local recommendations." },
    url: "https://www.bausabour.ac.in",
  },
  {
    id: "kvk",
    name: { hi: "कृषि विज्ञान केंद्र (KVK) नेटवर्क", en: "Krishi Vigyan Kendra (KVK) network" },
    what: { hi: "ज़िला स्तर पर मिट्टी जाँच, प्रशिक्षण और प्रदर्शन।", en: "District-level soil testing, training and demonstrations." },
    url: "https://kvk.icar.gov.in",
  },
  {
    id: "farmer-portal",
    name: { hi: "किसान पोर्टल, कृषि एवं किसान कल्याण मंत्रालय", en: "Farmers' Portal, Ministry of Agriculture & Farmers Welfare" },
    what: { hi: "योजनाएँ, सलाह और राज्यवार जानकारी।", en: "Schemes, advisories and state-wise information." },
    url: "https://farmer.gov.in",
  },
  {
    id: "pmkisan",
    name: { hi: "पीएम-किसान", en: "PM-KISAN" },
    what: { hi: "₹6,000 वार्षिक सम्मान निधि की पात्रता व आवेदन।", en: "Eligibility and application for the ₹6,000/year income support." },
    url: "https://pmkisan.gov.in",
  },
  {
    id: "pmfby",
    name: { hi: "प्रधानमंत्री फसल बीमा योजना", en: "Pradhan Mantri Fasal Bima Yojana" },
    what: { hi: "फसल बीमा प्रीमियम, दावा व अंतिम तिथियाँ।", en: "Crop insurance premium, claims and cut-off dates." },
    url: "https://pmfby.gov.in",
  },
  {
    id: "soilhealth",
    name: { hi: "मृदा स्वास्थ्य कार्ड योजना", en: "Soil Health Card Scheme" },
    what: { hi: "मुफ़्त मिट्टी जाँच व खाद सिफ़ारिश।", en: "Free soil testing and fertiliser recommendation." },
    url: "https://soilhealth.dac.gov.in",
  },
  {
    id: "enam",
    name: { hi: "e-NAM राष्ट्रीय कृषि बाज़ार", en: "e-NAM National Agriculture Market" },
    what: { hi: "मंडी भाव व ऑनलाइन बिक्री।", en: "Mandi prices and online selling." },
    url: "https://enam.gov.in",
  },
  {
    id: "imd",
    name: { hi: "भारत मौसम विज्ञान विभाग (IMD) / Meteo-France Open-Meteo", en: "India Meteorological Department (IMD) / Open-Meteo" },
    what: {
      hi: "इस वेबसाइट का मौसम टूल Open-Meteo के मुफ़्त मौसम मॉडल (IMD व ECMWF आँकड़ों पर आधारित) से जानकारी लेता है।",
      en: "The weather tool on this site uses the free Open-Meteo forecast API (built on IMD/ECMWF model data).",
    },
    url: "https://open-meteo.com",
  },
  {
    id: "agmarknet",
    name: { hi: "AGMARKNET", en: "AGMARKNET" },
    what: { hi: "देशभर की मंडियों के दैनिक भाव।", en: "Daily mandi prices across India." },
    url: "https://agmarknet.gov.in",
  },
  {
    id: "smam",
    name: { hi: "कृषि यंत्रीकरण उप-मिशन (SMAM)", en: "Sub-Mission on Agricultural Mechanization" },
    what: { hi: "मशीनों की कीमत श्रेणी व अनुदान की जानकारी।", en: "Machinery price bands and subsidy information." },
    url: "https://agrimachinery.nic.in",
  },
];
