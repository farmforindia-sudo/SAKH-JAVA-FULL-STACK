import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CloudSun, Heart, Landmark, Sprout, Tractor } from "lucide-react";

import farmHero from "@/assets/farm-hero.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { catalog } from "@/lib/cropAdvisor";
import { basics, schemes } from "@/data/basics";
import { machines } from "@/data/machines";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAKH — किसान ज्ञान मंच" },
      {
        name: "description",
        content:
          "SAKH पर अनाज, सब्ज़ी, फूल, पेड़, कृषि मशीनें, मौसम आधारित फसल सलाह और सरकारी योजनाओं की पूरी जानकारी — हिंदी और English दोनों में, ICAR स्रोतों पर आधारित।",
      },
      { property: "og:title", content: "SAKH — Complete Farming Knowledge in Hindi & English" },
      {
        property: "og:description",
        content: "Weather-based crop advice, 45+ crop guides, machinery and schemes for Indian farmers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/sakh-og.jpg" },
      { name: "twitter:image", content: "/sakh-og.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useT();

  const cards = [
    { to: "/mausam", icon: CloudSun, hi: "मौसम व फसल सलाह", en: "Weather & Crop Advisor", hiText: "किसी भी जगह का 7 दिन का मौसम और उसके अनुसार उपयुक्त फसलें।", enText: "7-day weather for any place plus crops suited to it." },
    { to: "/buniyaadi", icon: BookOpen, hi: "बुनियादी खेती", en: "Farming Basics", hiText: "मिट्टी, बीज, खाद, सिंचाई, जैविक खेती और कीट प्रबंधन।", enText: "Soil, seed, nutrition, irrigation, organic farming, pest control." },
    { to: "/anaaj", icon: Sprout, hi: "अनाज व दलहन", en: "Grains & Pulses", hiText: "गेहूँ, धान, मक्का, चना, मसूर, सरसों की पूरी विधि।", enText: "Wheat, paddy, maize, gram, lentil, mustard and more." },
    { to: "/sabzi", icon: Sprout, hi: "सब्ज़ियाँ व फूल", en: "Vegetables & Flowers", hiText: "आलू, टमाटर, भिंडी से गेंदा और गुलाब तक।", enText: "Potato and tomato to marigold and rose." },
    { to: "/machine", icon: Tractor, hi: "कृषि मशीनें", en: "Farm Machinery", hiText: "ट्रैक्टर से ड्रोन स्प्रेयर तक — कीमत, उपयोग व सुरक्षा।", enText: "Tractor to drone sprayer — price, use and safety." },
    { to: "/yojana", icon: Landmark, hi: "सरकारी योजनाएँ", en: "Government Schemes", hiText: "पीएम किसान, फसल बीमा, KCC व यंत्र अनुदान।", enText: "PM-KISAN, crop insurance, KCC and machinery subsidy." },
    { to: "/pasandida", icon: Heart, hi: "मेरे पसंदीदा", en: "My Favourites", hiText: "अपनी फसलें व मशीनें सहेजें और कभी भी पढ़ें।", enText: "Save your crops and machines and read them anytime." },
  ] as const;

  const stats = [
    { value: `${catalog.length}+`, hi: "फसल गाइड", en: "crop guides" },
    { value: `${machines.length}+`, hi: "कृषि मशीनें", en: "farm machines" },
    { value: `${basics.length}+`, hi: "बुनियादी विषय", en: "basics topics" },
    { value: `${schemes.length}+`, hi: "सरकारी योजनाएँ", en: "govt. schemes" },
  ];

  return (
    <>
      <section
        className="relative flex min-h-[72vh] items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${farmHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t("हिंदी + English · ICAR आधारित जानकारी", "Hindi + English · based on ICAR guidance")}
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
            {t("खेती की पूरी जानकारी, आपकी भाषा में", "Complete farming knowledge, in your language")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t(
              "बुवाई से बाज़ार तक — फसल, सब्ज़ी, फूल, पेड़, मशीन, मौसम सलाह और सरकारी योजनाएँ, सब एक ही जगह और दोनों भाषाओं में।",
              "From sowing to market — crops, vegetables, flowers, trees, machinery, weather advice and schemes, all in one place and in both languages.",
            )}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/mausam">{t("मौसम व फसल सलाह देखें", "Open weather advisor")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/buniyaadi">{t("खेती सीखना शुरू करें", "Start learning farming")}</Link>
            </Button>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.en} className="surface-card rounded-xl p-4">
                <p className="font-display text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground">{t(s.hi, s.en)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-display text-3xl font-bold">
          {t("क्या-क्या सीख सकते हैं", "What you can learn here")}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.to} to={c.to}>
              <Card className="lift-hover h-full border-border/70">
                <CardContent className="p-6">
                  <span className="gradient-field flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{t(c.hi, c.en)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(c.hiText, c.enText)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          {t("सारी जानकारी के स्रोत देखें → ", "See all our information sources → ")}
          <Link to="/srot" className="text-primary hover:underline">
            {t("स्रोत पृष्ठ", "Sources page")}
          </Link>
        </p>
      </section>
    </>
  );
}
