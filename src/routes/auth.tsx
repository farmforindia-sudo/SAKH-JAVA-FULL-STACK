import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useT } from "@/lib/i18n";

import farmBg from "@/assets/farm-bg.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "लॉगिन व नया खाता — SAKH किसान मंच" },
      {
        name: "description",
        content: "SAKH में लॉगिन करें या नया खाता बनाएँ और खेती की पूरी हिंदी जानकारी पाएँ।",
      },
      { property: "og:title", content: "लॉगिन | SAKH" },
      { property: "og:description", content: "ईमेल और पासवर्ड से SAKH में प्रवेश करें।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/sakh-og.jpg" },
      { name: "twitter:image", content: "/sakh-og.jpg" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useT();

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.auth.login(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error instanceof Error ? error.message : "लॉगिन नहीं हो सका।");
      return;
    }
    toast.success(t("स्वागत है! आप लॉगिन हो गए।", "Welcome! You are logged in."));
    navigate({ to: "/" });
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.auth.signup(email, password);
      setLoading(false);
      toast.success(t("खाता बन गया और आप लॉगिन हो गए।", "Account created and you are logged in."));
      navigate({ to: "/" });
    } catch (error) {
      setLoading(false);
      toast.error(error instanceof Error ? error.message : "खाता नहीं बनाया जा सका।");
    }
  };


  return (
    <div
      className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-cover bg-center px-4 py-12"
      style={{ backgroundImage: `linear-gradient(oklch(0.24 0.035 145 / 0.55), oklch(0.24 0.035 145 / 0.65)), url(${farmBg})` }}
    >
      <Card className="w-full max-w-md surface-card">
        <CardHeader>
          <CardTitle className="font-display text-2xl">SAKH में आपका स्वागत है</CardTitle>
          <p className="text-sm text-muted-foreground">
            लॉगिन कर अपनी खेती की जानकारी सुरक्षित रखें।
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">लॉगिन</TabsTrigger>
              <TabsTrigger value="signup">नया खाता</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={signIn} className="space-y-4 pt-4">
                <Field id="e1" label="ईमेल" type="email" value={email} onChange={setEmail} />
                <Field
                  id="p1"
                  label="पासवर्ड"
                  type="password"
                  value={password}
                  onChange={setPassword}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  लॉगिन करें
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={signUp} className="space-y-4 pt-4">
                <Field id="e2" label="ईमेल" type="email" value={email} onChange={setEmail} />
                <Field
                  id="p2"
                  label="पासवर्ड (कम से कम 6 अक्षर)"
                  type="password"
                  value={password}
                  onChange={setPassword}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  खाता बनाएँ
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            आपका खाता SAKH के Java Spring Boot सर्वर और MySQL डेटाबेस में सुरक्षित रूप से प्रबंधित होता है।
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
