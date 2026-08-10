import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sources } from "@/data/sources";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/srot")({
  head: () => ({
    meta: [
      { title: "जानकारी के स्रोत — Data Sources & References | SAKH" },
      {
        name: "description",
        content:
          "SAKH की सारी खेती जानकारी ICAR, कृषि विश्वविद्यालय, KVK और सरकारी पोर्टलों पर आधारित है — पूरी स्रोत सूची व लिंक यहाँ देखें।",
      },
      { property: "og:title", content: "जानकारी के स्रोत | SAKH Sources" },
      {
        property: "og:description",
        content: "Every practice on SAKH is referenced to ICAR, agricultural universities and government portals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/sakh-og.jpg" },
      { name: "twitter:image", content: "/sakh-og.jpg" },
    ],
  }),
  component: SourcesPage,
});

function SourcesPage() {
  const { t, b } = useT();
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold md:text-4xl">
        {t("जानकारी के स्रोत", "Where our information comes from")}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {t(
          "SAKH पर दी गई हर सलाह भारत सरकार के कृषि संस्थानों और विश्वविद्यालयों की सिफ़ारिशों पर आधारित है। नीचे दिए लिंक से आप मूल जानकारी स्वयं जाँच सकते हैं। स्थानीय परिस्थिति के लिए अपने नज़दीकी KVK से भी पुष्टि करें।",
          "Every recommendation on SAKH is based on Indian government agricultural institutes and universities. Use the links below to verify the original guidance, and confirm with your nearest KVK for local conditions.",
        )}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sources.map((s) => (
          <Card key={s.id} className="lift-hover border-border/70">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{b(s.name)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>{b(s.what)}</p>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                {s.url.replace("https://", "")}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-8 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">
        {t(
          "सूचना: कीमतें, अनुदान दरें और योजना नियम समय-समय पर बदलते हैं। किसी भी निवेश से पहले आधिकारिक पोर्टल या कृषि कार्यालय से पुष्टि अवश्य करें।",
          "Note: prices, subsidy rates and scheme rules change over time. Always confirm with the official portal or your agriculture office before investing.",
        )}
      </p>
    </section>
  );
}
