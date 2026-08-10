import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categoryRoute } from "@/lib/cropAdvisor";
import { useFavorites } from "@/hooks/useFavorites";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/pasandida")({
  head: () => ({
    meta: [
      { title: "मेरे पसंदीदा — My Saved Crops & Machines | SAKH" },
      {
        name: "description",
        content:
          "अपनी पसंदीदा फसलें, सब्ज़ियाँ, फूल, पेड़ और कृषि मशीनें एक जगह सहेजें और कभी भी दोबारा पढ़ें।",
      },
      { property: "og:title", content: "मेरे पसंदीदा | SAKH Favourites" },
      {
        property: "og:description",
        content: "Save crops, trees, flowers and machines to your own list on SAKH.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/sakh-og.jpg" },
      { name: "twitter:image", content: "/sakh-og.jpg" },
    ],
  }),
  component: FavoritesPage,
});

const typeRoute: Record<string, string> = {
  ...categoryRoute,
  machine: "/machine",
};

function FavoritesPage() {
  const { t, lang } = useT();
  const { favorites, loading, toggle, user } = useFavorites();

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold md:text-4xl">
        {t("मेरे पसंदीदा", "My Favourites")}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {t(
          "किसी भी फसल, पेड़, फूल या मशीन के कार्ड पर ❤️ दबाकर उसे यहाँ सहेजें।",
          "Tap the ❤️ on any crop, tree, flower or machine card to save it here.",
        )}
      </p>

      {!user ? (
        <Card className="mt-8 border-border/70">
          <CardContent className="flex flex-col items-start gap-4 p-6">
            <p>
              {t(
                "पसंदीदा सहेजने के लिए कृपया लॉगिन करें — आपकी सूची आपके खाते में सुरक्षित रहती है।",
                "Please log in to save favourites — your list stays safe in your account.",
              )}
            </p>
            <Button asChild>
              <Link to="/auth">{t("लॉगिन करें", "Log in")}</Link>
            </Button>
          </CardContent>
        </Card>
      ) : loading ? (
        <p className="mt-8 text-muted-foreground">{t("लोड हो रहा है…", "Loading…")}</p>
      ) : favorites.length === 0 ? (
        <p className="mt-8 text-muted-foreground">
          {t("अभी कोई पसंदीदा नहीं है।", "You have no favourites yet.")}
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {favorites.map((f) => (
            <Card key={f.id} className="lift-hover border-border/70">
              <CardContent className="flex items-center justify-between gap-3 p-5">
                <div>
                  <p className="font-display text-lg font-semibold">
                    <Heart className="mr-1.5 inline h-4 w-4 fill-destructive text-destructive" />
                    {lang === "hi" ? f.item_name_hi : f.item_name_en}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {lang === "hi" ? f.item_name_en : f.item_name_hi}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button asChild variant="secondary" size="sm">
                    <Link to={typeRoute[f.item_type] ?? "/"}>{t("खोलें", "Open")}</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t("हटाएँ", "Remove")}
                    onClick={() =>
                      void toggle({
                        itemId: f.item_id,
                        itemType: f.item_type,
                        nameHi: f.item_name_hi,
                        nameEn: f.item_name_en,
                      })
                    }
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
