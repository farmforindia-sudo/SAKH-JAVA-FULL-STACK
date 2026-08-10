import { useMemo, useState } from "react";
import { Heart, Search } from "lucide-react";

import type { KnowledgeItem } from "@/data/types";
import { seasonLabel } from "@/lib/cropAdvisor";
import { useFavorites } from "@/hooks/useFavorites";
import { useT } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  items: KnowledgeItem[];
  itemType: string;
};

const facts: { key: keyof KnowledgeItem; hi: string; en: string }[] = [
  { key: "season", hi: "मौसम व समय", en: "Season & timing" },
  { key: "soil", hi: "मिट्टी", en: "Soil" },
  { key: "seed", hi: "बीज दर व दूरी", en: "Seed rate & spacing" },
  { key: "water", hi: "सिंचाई", en: "Irrigation" },
  { key: "fertilizer", hi: "खाद व उर्वरक", en: "Manure & fertiliser" },
  { key: "pests", hi: "प्रमुख कीट व रोग", en: "Major pests & diseases" },
  { key: "duration", hi: "अवधि", en: "Duration" },
  { key: "yieldInfo", hi: "अनुमानित उपज", en: "Expected yield" },
];

export function KnowledgeSection({
  title,
  titleEn,
  subtitle,
  subtitleEn,
  items,
  itemType,
}: Props) {
  const { lang, t, b } = useT();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<KnowledgeItem | null>(null);
  const { isFavorite, toggle } = useFavorites();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      [
        i.name,
        i.english,
        i.season.hi,
        i.season.en,
        ...(i.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [items, query]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            {t(title, titleEn)}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{t(subtitle, subtitleEn)}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(`${items.length} विषय · हिंदी व अंग्रेज़ी दोनों में`, `${items.length} entries · in Hindi and English`)}
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("खोजें… जैसे गेहूँ, आलू, wheat", "Search… e.g. wheat, potato, गेहूँ")}
            className="pl-9"
            aria-label={t("खोजें", "Search")}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          {t("कोई परिणाम नहीं मिला।", "No results found.")}
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const fav = isFavorite(item.id, itemType);
            return (
              <Card key={item.id} className="lift-hover flex flex-col border-border/70">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="font-display text-2xl">
                        <span className="mr-2">{item.emoji}</span>
                        {lang === "hi" ? item.name : item.english}
                      </CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {lang === "hi" ? item.english : item.name}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary">{b(item.duration).split("(")[0]}</Badge>
                      <button
                        type="button"
                        aria-label={t("पसंदीदा में सहेजें", "Save to favourites")}
                        onClick={() =>
                          void toggle({
                            itemId: item.id,
                            itemType,
                            nameHi: item.name,
                            nameEn: item.english,
                          })
                        }
                        className="rounded-full p-1.5 transition-colors hover:bg-secondary"
                      >
                        <Heart
                          className={cn(
                            "h-5 w-5 transition-colors",
                            fav ? "fill-destructive text-destructive" : "text-muted-foreground",
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-4">
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>
                      <strong className="text-foreground">{t("मौसम", "Season")}:</strong>{" "}
                      {b(item.season)}
                    </li>
                    <li>
                      <strong className="text-foreground">{t("उपज", "Yield")}:</strong>{" "}
                      {b(item.yieldInfo)}
                    </li>
                    <li className="flex flex-wrap gap-1 pt-1">
                      {item.seasons.map((s) => (
                        <Badge key={s} variant="outline" className="text-[11px]">
                          {b(seasonLabel[s])}
                        </Badge>
                      ))}
                    </li>
                  </ul>
                  <Button variant="secondary" onClick={() => setActive(item)}>
                    {t("पूरी जानकारी पढ़ें", "Read full guide")}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  {active.emoji} {active.name} · {active.english}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[65vh] pr-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  {facts.map((f) => (
                    <div key={f.key} className="rounded-lg bg-secondary/50 p-3">
                      <p className="text-xs font-semibold uppercase text-muted-foreground">
                        {t(f.hi, f.en)}
                      </p>
                      <p className="mt-1 text-sm">{b(active[f.key] as { hi: string; en: string })}</p>
                    </div>
                  ))}
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  {t("खेती की विधि — कदम दर कदम", "How to grow it — step by step")}
                </h3>
                <ol className="mt-2 space-y-2">
                  {active.steps.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="gradient-field flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <span>{b(s)}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 rounded-xl border border-accent/40 bg-accent/15 p-4">
                  <p className="text-sm">
                    <strong>{t("विशेषज्ञ सलाह: ", "Expert tip: ")}</strong>
                    {b(active.tip)}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  {active.source && (
                    <p className="text-xs text-muted-foreground">
                      {t("स्रोत: ", "Source: ")}
                      {active.source}
                    </p>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      void toggle({
                        itemId: active.id,
                        itemType,
                        nameHi: active.name,
                        nameEn: active.english,
                      })
                    }
                  >
                    <Heart
                      className={cn(
                        "mr-1.5 h-4 w-4",
                        isFavorite(active.id, itemType) && "fill-destructive text-destructive",
                      )}
                    />
                    {isFavorite(active.id, itemType)
                      ? t("पसंदीदा से हटाएँ", "Remove from favourites")
                      : t("पसंदीदा में सहेजें", "Save to favourites")}
                  </Button>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
