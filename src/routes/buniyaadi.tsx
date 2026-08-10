import { createFileRoute } from "@tanstack/react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { basics } from "@/data/basics";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/buniyaadi")({
  head: () => ({
    meta: [
      { title: "बुनियादी खेती — Farming Basics Step by Step | SAKH" },
      {
        name: "description",
        content:
          "मिट्टी जाँच, बीज उपचार, खाद प्रबंधन, सिंचाई, जैविक खेती, फसल चक्र, मल्चिंग, भंडारण और मंडी बिक्री — नए किसान के लिए पूरी बुनियादी गाइड हिंदी व अंग्रेज़ी में।",
      },
      { property: "og:title", content: "बुनियादी खेती गाइड | SAKH Farming Basics" },
      {
        property: "og:description",
        content: "Soil, seed, nutrition, irrigation, organic farming and marketing basics in Hindi and English.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/sakh-og.jpg" },
      { name: "twitter:image", content: "/sakh-og.jpg" },
    ],
  }),
  component: BasicsPage,
});

function BasicsPage() {
  const { t, b } = useT();
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold md:text-4xl">
        {t("बुनियादी खेती — शुरुआत से", "Farming Basics — from scratch")}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {t(
          `ये ${basics.length} आधार हर फसल में काम आते हैं। नीचे किसी भी विषय पर टैप करके पूरी जानकारी पढ़ें।`,
          `These ${basics.length} fundamentals apply to every crop. Tap any topic below to read the full guide.`,
        )}
      </p>

      <Accordion type="single" collapsible className="mt-8">
        {basics.map((guide) => (
          <AccordionItem key={guide.id} value={guide.id}>
            <AccordionTrigger className="text-left text-lg">{b(guide.title)}</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {guide.body.map((p, i) => (
                  <li key={i} className="flex gap-2.5 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{b(p)}</span>
                  </li>
                ))}
              </ul>
              {guide.source && (
                <p className="mt-3 text-xs text-muted-foreground">
                  {t("स्रोत: ", "Source: ")}
                  {guide.source}
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
