import { createFileRoute } from "@tanstack/react-router";

import { KnowledgeSection } from "@/components/site/KnowledgeSection";
import { vegetables } from "@/data/vegetables";

export const Route = createFileRoute("/sabzi")({
  head: () => ({
    meta: [
      { title: "सब्ज़ियों की खेती — Vegetable Farming Guides | SAKH" },
      {
        name: "description",
        content:
          "आलू, टमाटर, प्याज, भिंडी, बैंगन, गोभी, मिर्च सहित 20+ सब्ज़ियों की नर्सरी, रोपाई, खाद व कीट नियंत्रण की पूरी जानकारी हिंदी व अंग्रेज़ी में।",
      },
      { property: "og:title", content: "सब्ज़ियों की खेती | SAKH" },
      {
        property: "og:description",
        content: "Hindi + English guides for potato, tomato, onion, okra, brinjal, chilli and many more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/sakh-og.jpg" },
      { name: "twitter:image", content: "/sakh-og.jpg" },
    ],
  }),
  component: () => (
    <KnowledgeSection
      itemType="vegetable"
      title="सब्ज़ियों की खेती"
      titleEn="Vegetable Farming"
      subtitle="नर्सरी से मंडी तक — हर सब्ज़ी की किस्में, दूरी, खाद और रोग-कीट प्रबंधन।"
      subtitleEn="From nursery to mandi — varieties, spacing, nutrition and pest control for every vegetable."
      items={vegetables}
    />
  ),
});
