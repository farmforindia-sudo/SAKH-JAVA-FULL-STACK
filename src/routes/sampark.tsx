import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/sampark")({
  head: () => ({
    meta: [
      { title: "संपर्क करें — FARMER ENTERPRISES, हाजीपुर | SAKH" },
      {
        name: "description",
        content:
          "SAKH से संपर्क करें — FARMER ENTERPRISES, हाजीपुर बिहार 844101, फ़ोन 9625436081, ईमेल farmforindia@gmail.com।",
      },
      { property: "og:title", content: "संपर्क करें | SAKH" },
      { property: "og:description", content: "खेती से जुड़े सवाल पूछें, हम मदद करेंगे।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/sakh-og.jpg" },
      { name: "twitter:image", content: "/sakh-og.jpg" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `नाम: ${name}%0Aफ़ोन: ${phone}%0A%0A${message}`;
    window.location.href = `mailto:farmforindia@gmail.com?subject=SAKH से सवाल&body=${body}`;
    toast.success("धन्यवाद! आपका संदेश ईमेल ऐप में खुल गया है।");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold md:text-4xl">संपर्क करें</h1>
      <p className="mt-2 text-muted-foreground">
        खेती से जुड़ा कोई भी सवाल हो — हमें फ़ोन करें, ईमेल भेजें या नीचे का फ़ॉर्म भरें।
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="font-display text-2xl">FARMER ENTERPRISES</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              हाजीपुर, बिहार 844101<br />
              HAJIPUR, BIHAR 844101, INDIA
            </p>
            <a href="tel:9625436081" className="flex items-center gap-3 hover:text-primary">
              <Phone className="h-5 w-5 shrink-0 text-primary" /> 9625436081
            </a>
            <a
              href="mailto:farmforindia@gmail.com"
              className="flex items-center gap-3 hover:text-primary"
            >
              <Mail className="h-5 w-5 shrink-0 text-primary" /> farmforindia@gmail.com
            </a>
            <p className="rounded-lg bg-secondary/60 p-3">
              किसान कॉल सेंटर (मुफ़्त सरकारी सलाह): <strong>1800-180-1551</strong>
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="font-display text-2xl">अपना सवाल भेजें</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">आपका नाम</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">मोबाइल नंबर</Label>
                <Input
                  id="phone"
                  required
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msg">आपका सवाल</Label>
                <Textarea
                  id="msg"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                संदेश भेजें
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
