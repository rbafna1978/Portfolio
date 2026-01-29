import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Tabs from "@/components/Tabs";
import Footer from "@/components/Footer";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Rishit Yogesh Bafna · Portfolio",
  description: "Product-minded engineer focused on clean UI and reliable systems.",
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const themeScript = `
    (function () {
      try {
        var stored = localStorage.getItem("theme");
        var theme = stored || "system";
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var resolved = theme === "system" ? (prefersDark ? "dark" : "light") : theme;
        document.documentElement.dataset.theme = resolved;
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-bg font-sans text-ink">
        <div className="min-h-screen">
          <div className="flex min-h-[calc(100vh-56px)] flex-col md:flex-row">
            <Sidebar />
            <div className="flex min-h-full flex-1 flex-col">
              <Tabs />
              <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
                <div className="mx-auto w-full max-w-2xl md:max-w-none">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
