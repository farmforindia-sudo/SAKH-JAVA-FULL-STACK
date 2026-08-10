import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Leaf } from "lucide-react";

import { navItems } from "./SiteHeader";
import { useT } from "@/lib/i18n";

export function SiteFooter() {
  const { lang, t } = useT();
  return (
    <footer className="mt-20 border-t border-border/70 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="gradient-field flex h-9 w-9 items-center justify-center rounded-lg text-primary-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="font-display text-xl font-bold">SAKH</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t(
              "SAKH — भारतीय किसानों के लिए हिंदी और अंग्रेज़ी में सम्पूर्ण खेती ज्ञान। अनाज, सब्ज़ी, फूल, पेड़, मशीन, मौसम सलाह और सरकारी योजनाओं की सही जानकारी, एक ही जगह।",
              "SAKH — complete farming knowledge for Indian farmers in Hindi and English: grains, vegetables, flowers, trees, machinery, weather advice and government schemes in one place.",
            )}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            {t("जानकारी के स्रोत: ", "Information sources: ")}
            <Link to="/srot" className="text-primary hover:underline">
              ICAR · KVK · farmer.gov.in
            </Link>
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold">{t("पृष्ठ", "Pages")}</h3>
          <ul className="mt-3 grid grid-cols-2 gap-1.5 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-primary">
                  {lang === "hi" ? item.hi : item.en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold">{t("संपर्क करें", "Contact us")}</h3>
          <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
            <li className="font-semibold text-foreground">FARMER ENTERPRISES</li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {t("हाजीपुर, बिहार 844101", "Hajipur, Bihar 844101, India")}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <a href="tel:9625436081" className="hover:text-primary">
                9625436081
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <a href="mailto:farmforindia@gmail.com" className="hover:text-primary">
                farmforindia@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SAKH · FARMER ENTERPRISES ·{" "}
        {t("सभी अधिकार सुरक्षित", "All rights reserved")}
      </div>
    </footer>
  );
}
