import { createFileRoute } from "@tanstack/react-router";

import { KnowledgeSection } from "@/components/site/KnowledgeSection";
import { flowers } from "@/data/flowers";

export const Route = createFileRoute("/phool")({
  head: () => ({
    meta: [
      { title: "फूलों की खेती — Commercial Floriculture | SAKH" },
      {
        name: "description",
        content:
          "गेंदा, गुलाब, गुलदाउदी, रजनीगंधा, ग्लेडियोलस, जरबेरा सहित फूलों की व्यावसायिक खेती की पूरी विधि हिंदी व अंग्रेज़ी में।",
      },
      { property: "og:title", content: "फूलों की खेती | SAKH" },
      {
        property: "og:description",
        content: "Commercial flower farming guides in Hindi and English — marigold, rose, tuberose and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/sakh-og.jpg" },
      { name: "twitter:image", content: "/sakh-og.jpg" },
    ],
  }),
  component: () => (
    <KnowledgeSection
      itemType="flower"
      title="फूलों की खेती"
      titleEn="Flower Farming"
      subtitle="कम ज़मीन में ऊँची आमदनी — रोपाई, कटाई और बाज़ार तक की पूरी जानकारी।"
      subtitleEn="High income from small plots — planting, harvesting and marketing explained."
      items={flowers}
    />
  ),
});
