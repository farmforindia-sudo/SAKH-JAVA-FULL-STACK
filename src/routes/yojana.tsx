import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { schemes } from "@/data/basics";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/yojana")({
  head: () => ({
    meta: [
      { title: "सरकारी योजनाएँ — Government Schemes for Farmers | SAKH" },
      {
        name: "description",
        content:
          "पीएम किसान, फसल बीमा, KCC, मृदा स्वास्थ्य कार्ड, यंत्र अनुदान, सिंचाई व e-NAM सहित 12+ योजनाओं का लाभ, पात्रता व आवेदन प्रक्रिया हिंदी व अंग्रेज़ी में।",
      },
      { property: "og:title", content: "किसानों के लिए सरकारी योजनाएँ | SAKH" },
      {
        property: "og:description",
        content: "Benefits, eligibility and how to apply for 12+ Indian government farm schemes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/sakh-og.jpg" },
      { name: "twitter:image", content: "/sakh-og.jpg" },
    ],
  }),
  component: SchemesPage,
});

function SchemesPage() {
  const { t, b } = useT();
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold md:text-4xl">
        {t("सरकारी योजनाएँ", "Government Schemes")}
      </h1>
      <p className="mt-2 max-w-3xl text-muted-foreground">
        {t(
          "सरकार की मदद का पूरा लाभ लें — कौन-सी योजना, कितना लाभ, कौन पात्र है और आवेदन कहाँ करें।",
          "Use every benefit available — what the scheme gives, who is eligible and where to apply.",
        )}
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {schemes.map((s) => (
          <Card key={s.id} className="lift-hover border-border/70">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-xl">{b(s.name)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>{t("लाभ", "Benefit")}: </strong>
                <span className="text-muted-foreground">{b(s.benefit)}</span>
              </p>
              <p>
                <strong>{t("पात्रता", "Eligibility")}: </strong>
                <span className="text-muted-foreground">{b(s.eligibility)}</span>
              </p>
              <p>
                <strong>{t("आवेदन कैसे करें", "How to apply")}: </strong>
                <span className="text-muted-foreground">{b(s.how)}</span>
              </p>
              {s.link && (
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline"
                >
                  {t("आधिकारिक पोर्टल", "Official portal")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
