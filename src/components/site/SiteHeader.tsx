import { Link } from "@tanstack/react-router";
import { Heart, Languages, Leaf, LogIn, LogOut, Menu, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useT } from "@/lib/i18n";

export const navItems = [
  { to: "/", hi: "मुख्य पृष्ठ", en: "Home" },
  { to: "/mausam", hi: "मौसम व सलाह", en: "Weather" },
  { to: "/buniyaadi", hi: "बुनियादी खेती", en: "Basics" },
  { to: "/anaaj", hi: "अनाज व दलहन", en: "Grains" },
  { to: "/sabzi", hi: "सब्ज़ियाँ", en: "Vegetables" },
  { to: "/phool", hi: "फूल", en: "Flowers" },
  { to: "/ped", hi: "पेड़ व बाग़", en: "Trees" },
  { to: "/machine", hi: "मशीनें", en: "Machines" },
  { to: "/yojana", hi: "योजनाएँ", en: "Schemes" },
  { to: "/pasandida", hi: "पसंदीदा", en: "Favourites" },
  { to: "/srot", hi: "स्रोत", en: "Sources" },
  { to: "/sampark", hi: "संपर्क", en: "Contact" },
] as const;

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const { lang, setLang, t } = useT();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast.success(t("आप लॉग आउट हो गए हैं।", "You have been logged out."));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="gradient-field flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-bold text-foreground">SAKH</span>
            <span className="block text-[11px] text-muted-foreground">
              {t("किसान ज्ञान मंच", "Farmer Knowledge Platform")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-lg px-2.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
            >
              {lang === "hi" ? item.hi : item.en}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLang(lang === "hi" ? "en" : "hi")}
            aria-label={t("भाषा बदलें", "Change language")}
          >
            <Languages className="mr-1 h-4 w-4" />
            {lang === "hi" ? "English" : "हिंदी"}
          </Button>

          {user ? (
            <>
              <Button asChild variant="ghost" size="icon" aria-label={t("पसंदीदा", "Favourites")}>
                <Link to="/pasandida">
                  <Heart className="h-4 w-4" />
                </Link>
              </Button>
              <span className="hidden max-w-[150px] truncate text-sm text-muted-foreground md:inline">
                <User className="mr-1 inline h-4 w-4" />
                {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="mr-1 h-4 w-4" /> {t("लॉग आउट", "Log out")}
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link to="/auth">
                <LogIn className="mr-1 h-4 w-4" /> {t("लॉगिन", "Log in")}
              </Link>
            </Button>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="xl:hidden">
              <Button variant="outline" size="icon" aria-label={t("मेन्यू खोलें", "Open menu")}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 overflow-y-auto">
              <nav className="mt-8 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                    activeProps={{ className: "bg-secondary" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {lang === "hi" ? item.hi : item.en}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
