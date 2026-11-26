import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-signature",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Prashant Gupta | Software Developer & Builder",
  description:
    "I'm Prashant Gupta, a software developer building full-stack applications, backend systems, and practical AI-powered experiences. Explore my projects, experience, and work.",

  openGraph: {
    title: "Prashant Gupta | Software Developer & Builder",
    description:
      "Software, systems, and ideas brought to life. Explore projects, engineering experience, and things I've built.",
    url: "https://prashg0.vercel.app",
    siteName: "Prashant Gupta",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prashant Gupta - Software Developer Portfolio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Prashant Gupta | Software Developer & Builder",
    description:
      "Building full-stack products, backend systems, and practical AI experiences. Explore my work and projects.",
    images: ["/opengraph-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      id="top"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(
                function(){
                  try{
                    var saved=localStorage.getItem('theme');
                    var theme=saved==='dark'||saved==='light'?saved:'light';
                    document.documentElement.dataset.theme=theme;
                  }
                  catch(e){
                    document.documentElement.dataset.theme='light';
                  }
                }
              )();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
