import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CloudRain, Droplets, MapPin, Search, Thermometer, Wind } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categoryLabel, recommendCrops, seasonLabel, weatherAdvisories } from "@/lib/cropAdvisor";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/mausam")({
  head: () => ({
    meta: [
      { title: "मौसम व फसल सलाह — Weather & Crop Advisor | SAKH" },
      {
        name: "description",
        content:
          "किसी भी गाँव, शहर या ज़िले का 7 दिन का मौसम देखें और उस मौसम के लिए उपयुक्त फसलों की पूरी सलाह पाएँ — हिंदी और अंग्रेज़ी में।",
      },
      { property: "og:title", content: "मौसम व फसल सलाह | SAKH Weather Advisor" },
      {
        property: "og:description",
        content: "7-day weather for any Indian location plus crop recommendations for that weather.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/sakh-og.jpg" },
      { name: "twitter:image", content: "/sakh-og.jpg" },
    ],
  }),
  component: WeatherPage,
});

type Place = {
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  country?: string;
};

type Forecast = {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
  };
};

async function geocode(q: string): Promise<Place[]> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=en&format=json`,
  );
  if (!res.ok) throw new Error("geocode failed");
  const json = (await res.json()) as { results?: Place[] };
  return json.results ?? [];
}

async function getForecast(p: Place): Promise<Forecast> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}` +
      `&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max` +
      `&forecast_days=7&timezone=auto`,
  );
  if (!res.ok) throw new Error("forecast failed");
  return (await res.json()) as Forecast;
}

function WeatherPage() {
  const { t, b, lang } = useT();
  const [input, setInput] = useState("Hajipur");
  const [term, setTerm] = useState("Hajipur");
  const [place, setPlace] = useState<Place | null>(null);

  const places = useQuery({
    queryKey: ["geocode", term],
    queryFn: () => geocode(term),
    enabled: term.trim().length > 1,
  });

  const chosen = place ?? places.data?.[0] ?? null;

  const forecast = useQuery({
    queryKey: ["forecast", chosen?.latitude, chosen?.longitude],
    queryFn: () => getForecast(chosen!),
    enabled: !!chosen,
  });

  const f = forecast.data;
  const tempMax = f ? Math.max(...f.daily.temperature_2m_max) : 0;
  const tempMin = f ? Math.min(...f.daily.temperature_2m_min) : 0;
  const rainNext7 = f ? f.daily.precipitation_sum.reduce((a, c) => a + (c ?? 0), 0) : 0;
  const month = new Date().getMonth() + 1;

  const advisories = f
    ? weatherAdvisories({
        tempMax,
        tempMin,
        rainNext7,
        humidity: f.current.relative_humidity_2m,
        wind: f.current.wind_speed_10m,
      })
    : [];

  const crops = f ? recommendCrops({ tempMax, tempMin, rainNext7, month }) : [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold md:text-4xl">
        {t("मौसम व फसल सलाह", "Weather & Crop Advisor")}
      </h1>
      <p className="mt-2 max-w-3xl text-muted-foreground">
        {t(
          "अपने गाँव, शहर या ज़िले का नाम लिखें — 7 दिन का मौसम, चेतावनी और उस मौसम में लगाई जा सकने वाली फसलों की सूची तुरंत मिलेगी।",
          "Type your village, town or district — get a 7-day forecast, advisories and the crops best suited to that weather right now.",
        )}
      </p>

      <form
        className="mt-6 flex max-w-xl gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setPlace(null);
          setTerm(input);
        }}
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pl-9"
            placeholder={t("जगह का नाम — जैसे हाजीपुर, Patna", "Place name — e.g. Hajipur, Patna")}
            aria-label={t("जगह खोजें", "Search a place")}
          />
        </div>
        <Button type="submit">{t("मौसम देखें", "Get weather")}</Button>
      </form>

      {places.isLoading && (
        <p className="mt-6 text-muted-foreground">{t("जगह खोजी जा रही है…", "Searching place…")}</p>
      )}
      {places.data && places.data.length === 0 && (
        <p className="mt-6 text-muted-foreground">
          {t("यह जगह नहीं मिली, दूसरा नाम या ज़िला लिखें।", "Place not found — try another spelling or the district name.")}
        </p>
      )}

      {places.data && places.data.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {places.data.map((p) => (
            <button
              key={`${p.latitude},${p.longitude}`}
              type="button"
              onClick={() => setPlace(p)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                chosen?.latitude === p.latitude
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              <MapPin className="mr-1 inline h-3.5 w-3.5" />
              {p.name}
              {p.admin1 ? `, ${p.admin1}` : ""}
            </button>
          ))}
        </div>
      )}

      {forecast.isError && (
        <p className="mt-6 text-destructive">
          {t("मौसम जानकारी नहीं मिल सकी, दोबारा कोशिश करें।", "Could not load weather — please try again.")}
        </p>
      )}

      {f && chosen && (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Thermometer,
                label: t("अभी तापमान", "Temperature now"),
                value: `${Math.round(f.current.temperature_2m)}°C`,
              },
              {
                icon: Droplets,
                label: t("आर्द्रता (नमी)", "Humidity"),
                value: `${f.current.relative_humidity_2m}%`,
              },
              {
                icon: CloudRain,
                label: t("7 दिन की कुल वर्षा", "Rain next 7 days"),
                value: `${rainNext7.toFixed(1)} mm`,
              },
              {
                icon: Wind,
                label: t("हवा की गति", "Wind speed"),
                value: `${Math.round(f.current.wind_speed_10m)} km/h`,
              },
            ].map((s) => (
              <Card key={s.label} className="surface-card border-border/70">
                <CardContent className="flex items-center gap-3 p-5">
                  <span className="gradient-field flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="font-display text-xl font-bold">{s.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="mt-10 font-display text-2xl font-bold">
            {t(`${chosen.name} का 7 दिन का मौसम`, `7-day forecast for ${chosen.name}`)}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {f.daily.time.map((d, i) => (
              <Card key={d} className="border-border/70">
                <CardContent className="p-4 text-center">
                  <p className="text-xs font-medium text-muted-foreground">
                    {new Date(d).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold">
                    {Math.round(f.daily.temperature_2m_max[i]!)}°
                    <span className="text-sm font-normal text-muted-foreground">
                      /{Math.round(f.daily.temperature_2m_min[i]!)}°
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <CloudRain className="mr-1 inline h-3 w-3" />
                    {f.daily.precipitation_sum[i]?.toFixed(1) ?? 0} mm ·{" "}
                    {f.daily.precipitation_probability_max[i] ?? 0}%
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="mt-10 font-display text-2xl font-bold">
            {t("इस मौसम की चेतावनी व सलाह", "Advisories for this weather")}
          </h2>
          <ul className="mt-4 space-y-2">
            {advisories.map((a, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{b(a)}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl font-bold">
            {t("इस मौसम के लिए उपयुक्त फसलें", "Crops suited to this weather")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(
              "नीचे हर फसल के साथ यह भी लिखा है कि वह इस मौसम में क्यों उपयुक्त है। पूरी विधि उसके पृष्ठ पर पढ़ें।",
              "Each crop below explains why it fits this weather. Read the full method on its page.",
            )}
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {crops.map(({ item, reasons }) => (
              <Card key={`${item.category}-${item.id}`} className="lift-hover border-border/70">
                <CardHeader className="pb-2">
                  <CardTitle className="font-display text-xl">
                    <span className="mr-2">{item.emoji}</span>
                    {lang === "hi" ? item.name : item.english}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      {lang === "hi" ? item.english : item.name}
                    </span>
                  </CardTitle>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Badge variant="secondary">{b(categoryLabel[item.category])}</Badge>
                    {item.seasons.map((s) => (
                      <Badge key={s} variant="outline" className="text-[11px]">
                        {b(seasonLabel[s])}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <ul className="space-y-1">
                    {reasons.slice(0, 3).map((r, i) => (
                      <li key={i}>• {b(r)}</li>
                    ))}
                  </ul>
                  <p>
                    <strong className="text-foreground">{t("सिंचाई", "Irrigation")}:</strong>{" "}
                    {b(item.water)}
                  </p>
                  <p>
                    <strong className="text-foreground">{t("उपज", "Yield")}:</strong>{" "}
                    {b(item.yieldInfo)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            {t(
              "मौसम आँकड़े: Open-Meteo (IMD/ECMWF मॉडल) · फसल सिफ़ारिश: ICAR व राज्य कृषि विश्वविद्यालयों की पैकेज ऑफ प्रैक्टिसेज़ पर आधारित।",
              "Weather data: Open-Meteo (IMD/ECMWF models) · Crop recommendations based on ICAR and State Agricultural University packages of practices.",
            )}
          </p>
        </>
      )}
    </section>
  );
}
