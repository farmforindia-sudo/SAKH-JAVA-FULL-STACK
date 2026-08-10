import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { api, type FavoriteRow } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useT } from "@/lib/i18n";

export type { FavoriteRow };

export type FavoriteInput = {
  itemId: string;
  itemType: string;
  nameHi: string;
  nameEn: string;
};

export function useFavorites() {
  const { user, loading: authLoading } = useAuth();
  const { t } = useT();
  const [favorites, setFavorites] = useState<FavoriteRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      setFavorites(await api.favorites.list());
    } catch (error) {
      console.error(error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    void refresh();
  }, [authLoading, refresh]);

  const isFavorite = useCallback(
    (itemId: string, itemType: string) =>
      favorites.some((f) => f.item_id === itemId && f.item_type === itemType),
    [favorites],
  );

  const toggle = useCallback(
    async (input: FavoriteInput) => {
      if (!user) {
        toast.error(
          t("पसंदीदा सहेजने के लिए लॉगिन करें।", "Please log in to save favourites."),
        );
        return;
      }

      const existing = favorites.find(
        (f) => f.item_id === input.itemId && f.item_type === input.itemType,
      );

      if (existing) {
        setFavorites((prev) => prev.filter((f) => f.id !== existing.id));
        try {
          await api.favorites.remove(existing.id);
          toast.success(t("पसंदीदा से हटाया गया।", "Removed from favourites."));
        } catch (error) {
          console.error(error);
          void refresh();
          toast.error(t("हटाया नहीं जा सका।", "Could not remove."));
        }
        return;
      }

      try {
        const data = await api.favorites.add(input);
        setFavorites((prev) => [data, ...prev]);
        toast.success(t("पसंदीदा में सहेजा गया।", "Saved to favourites."));
      } catch (error) {
        console.error(error);
        toast.error(t("सहेजा नहीं जा सका।", "Could not save."));
      }
    },
    [favorites, refresh, t, user],
  );

  return { favorites, loading, isFavorite, toggle, refresh, user };
}
