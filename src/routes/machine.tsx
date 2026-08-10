import { createFileRoute } from "@tanstack/react-router";
import { Heart, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { machines } from "@/data/machines";
import { useFavorites } from "@/hooks/useFavorites";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/machine")({
  head: () => ({
    meta: [
      { title: "कृषि मशीनें व यंत्र — Farm Machinery Guide | SAKH" },
      {
        name: "description",
        content:
          "ट्रैक्टर, रोटावेटर, सीड ड्रिल, थ्रेशर, ड्रोन स्प्रेयर, सोलर पम्प सहित 18+ कृषि यंत्रों का उपयोग, कीमत, रख-रखाव और सुरक्षा — हिंदी व अंग्रेज़ी में।",
      },
      { property: "og:title", content: "कृषि मशीनें व यंत्र | SAKH" },
      {
        property: "og:description",
        content: "Uses, price range, maintenance and safety for 18+ farm machines in Hindi and English.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/sakh-og.jpg" },
      { name: "twitter:image", content: "/sakh-og.jpg" },
    ],
  }),
  component: MachinesPage,
});

function MachinesPage() {
  const { t, b, lang } = useT();
  const [query, setQuery] = useState("");
  const { isFavorite, toggle } = useFavorites();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return machines;
    return machines.filter((m) =>
      [m.name, m.english, m.use.hi, m.use.en, ...(m.keywords ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [query]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            {t("कृषि मशीनें व यंत्र", "Farm Machinery & Tools")}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {t(
              "कौन-सी मशीन किस काम के लिए, कितनी कीमत, कितनी शक्ति चाहिए, रख-रखाव कैसे करें और सुरक्षा के नियम क्या हैं।",
              "Which machine for which job, price range, power needed, maintenance and safety rules.",
            )}
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            placeholder={t("खोजें… जैसे थ्रेशर, tractor", "Search… e.g. tractor, थ्रेशर")}
            aria-label={t("खोजें", "Search")}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          {t("कोई मशीन नहीं मिली।", "No machine found.")}
        </p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => {
            const fav = isFavorite(m.id, "machine");
            return (
              <Card key={m.id} className="lift-hover border-border/70">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-display text-xl">
                      <span className="mr-2">{m.emoji}</span>
                      {lang === "hi" ? m.name : m.english}
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        {lang === "hi" ? m.english : m.name}
                      </span>
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={t("पसंदीदा में सहेजें", "Save to favourites")}
                      onClick={() =>
                        void toggle({
                          itemId: m.id,
                          itemType: "machine",
                          nameHi: m.name,
                          nameEn: m.english,
                        })
                      }
                    >
                      <Heart
                        className={cn(
                          "h-5 w-5",
                          fav ? "fill-destructive text-destructive" : "text-muted-foreground",
                        )}
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <strong>{t("उपयोग", "Use")}: </strong>
                    <span className="text-muted-foreground">{b(m.use)}</span>
                  </p>
                  <p>
                    <strong>{t("कीमत", "Price")}: </strong>
                    <span className="text-muted-foreground">{b(m.cost)}</span>
                  </p>
                  <p>
                    <strong>{t("शक्ति / क्षमता", "Power / capacity")}: </strong>
                    <span className="text-muted-foreground">{b(m.power)}</span>
                  </p>
                  <p>
                    <strong>{t("रख-रखाव", "Maintenance")}: </strong>
                    <span className="text-muted-foreground">{b(m.care)}</span>
                  </p>
                  <p className="rounded-lg bg-destructive/10 p-2.5">
                    <strong>{t("सुरक्षा", "Safety")}: </strong>
                    {b(m.safety)}
                  </p>
                  {m.source && (
                    <p className="text-xs text-muted-foreground">
                      {t("स्रोत: ", "Source: ")}
                      {m.source}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
