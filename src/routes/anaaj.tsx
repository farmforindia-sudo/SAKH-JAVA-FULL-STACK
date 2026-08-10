import { createFileRoute } from "@tanstack/react-router";

import { KnowledgeSection } from "@/components/site/KnowledgeSection";
import { grains } from "@/data/knowledge";

export const Route = createFileRoute("/anaaj")({
  head: () => ({
    meta: [
      { title: "अनाज, दलहन व तिलहन की खेती — Grains & Pulses | SAKH" },
      {
        name: "description",
        content:
          "गेहूँ, धान, मक्का, चना, मसूर, सरसों, अरहर सहित 14+ फसलों की बुवाई, सिंचाई, खाद, कीट नियंत्रण और उपज की पूरी जानकारी हिंदी व अंग्रेज़ी में।",
      },
      { property: "og:title", content: "अनाज व दलहन की खेती | SAKH" },
      {
        property: "og:description",
        content: "Complete Hindi + English growing guides for wheat, paddy, maize, gram, mustard and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/sakh-og.jpg" },
      { name: "twitter:image", content: "/sakh-og.jpg" },
    ],
  }),
  component: () => (
    <KnowledgeSection
      itemType="grain"
      title="अनाज, दलहन व तिलहन"
      titleEn="Grains, Pulses & Oilseeds"
      subtitle="बुवाई से भंडारण तक — हर फसल की वैज्ञानिक विधि, ICAR सिफ़ारिशों पर आधारित।"
      subtitleEn="From sowing to storage — scientific practice for every crop, based on ICAR recommendations."
      items={grains}
    />
  ),
});
