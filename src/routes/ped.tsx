import { createFileRoute } from "@tanstack/react-router";

import { KnowledgeSection } from "@/components/site/KnowledgeSection";
import { trees } from "@/data/trees";

export const Route = createFileRoute("/ped")({
  head: () => ({
    meta: [
      { title: "पेड़ व बाग़वानी — Fruit & Timber Trees | SAKH" },
      {
        name: "description",
        content:
          "आम, केला, अमरूद, लीची, पपीता, नींबू, सागवान, सहजन सहित 12+ वृक्षों की रोपाई, छँटाई व देखभाल की पूरी विधि हिंदी व अंग्रेज़ी में।",
      },
      { property: "og:title", content: "पेड़ व बाग़वानी | SAKH" },
      {
        property: "og:description",
        content: "Planting to harvest guides for mango, banana, guava, litchi, teak and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/sakh-og.jpg" },
      { name: "twitter:image", content: "/sakh-og.jpg" },
    ],
  }),
  component: () => (
    <KnowledgeSection
      itemType="tree"
      title="पेड़ व बाग़वानी"
      titleEn="Trees & Orchards"
      subtitle="एक बार लगाइए, वर्षों कमाइए — फल व इमारती वृक्षों की रोपाई, छँटाई और देखभाल।"
      subtitleEn="Plant once, earn for years — planting, pruning and care for fruit and timber trees."
      items={trees}
    />
  ),
});
