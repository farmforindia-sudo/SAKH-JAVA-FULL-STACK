import { useCallback, useEffect, useState } from "react";
import { api, type ApiUser } from "@/lib/api";

export function useAuth() {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const currentUser = await api.auth.me();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const handler = () => void refresh();
    window.addEventListener("sakh-auth-changed", handler);
    return () => window.removeEventListener("sakh-auth-changed", handler);
  }, [refresh]);

  const signOut = async () => {
    await api.auth.logout();
    setUser(null);
  };

  return { user, loading, signOut, refresh };
}
