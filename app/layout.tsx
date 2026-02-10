import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Header from "./components/header";
import { ThemeProvider } from "next-themes";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishit Bafna | Portfolio",
  description: "Rishit Bafna - software engineer focused on reliable systems and polished web products.",
  openGraph: {
    title: "Rishit Bafna | Portfolio",
    description: "Software engineer focused on reliable systems and polished web products.",
    url: "https://rishitbafna.vercel.app/", // Replace with your actual URL
    siteName: "Rishit Bafna Portfolio",
    images: [
      {
        url: "/og-image.png", // Fallback until you have a real screenshot
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishit Bafna | Portfolio",
    description: "Software engineer focused on reliable systems and polished web products.",
    images: ["/og-image.png"], // Fallback
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bebasNeue.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
