const API_URL = (import.meta.env["VITE_API_URL"] || "http://localhost:8080/api").replace(/\/$/, "");

function notifyAuthChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("sakh-auth-changed"));
  }
}

export type ApiUser = {
  id: number;
  email: string;
};

export type FavoriteRow = {
  id: number;
  item_id: string;
  item_type: string;
  item_name_hi: string;
  item_name_en: string;
  created_at: string;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof body === "object" && body && "message" in body
        ? String(body.message)
        : typeof body === "string" && body
          ? body
          : "Server request failed";
    throw new Error(message);
  }

  return body as T;
}

export const api = {
  auth: {
    me: () => request<ApiUser>("/auth/me"),
    login: async (email: string, password: string) => {
      const user = await request<ApiUser>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      notifyAuthChanged();
      return user;
    },
    signup: async (email: string, password: string) => {
      const user = await request<ApiUser>("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      notifyAuthChanged();
      return user;
    },
    logout: async () => {
      const result = await request<void>("/auth/logout", { method: "POST" });
      notifyAuthChanged();
      return result;
    },
  },
  favorites: {
    list: () => request<FavoriteRow[]>("/favorites"),
    add: (input: {
      itemId: string;
      itemType: string;
      nameHi: string;
      nameEn: string;
    }) =>
      request<FavoriteRow>("/favorites", {
        method: "POST",
        body: JSON.stringify({
          itemId: input.itemId,
          itemType: input.itemType,
          itemNameHi: input.nameHi,
          itemNameEn: input.nameEn,
        }),
      }),
    remove: (id: number) =>
      request<void>(`/favorites/${id}`, {
        method: "DELETE",
      }),
  },
};
