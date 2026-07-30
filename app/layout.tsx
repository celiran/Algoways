import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import AccessibilityMenu from "./components/AccessibilityMenu";
import CookieNotice from "./components/CookieNotice";
import "./globals.css";

const bodyFont = Heebo({
  variable: "--font-body",
  subsets: ["hebrew", "latin"],
});

const displayFont = Frank_Ruhl_Libre({
  variable: "--font-display",
  subsets: ["hebrew", "latin"],
});

export const metadata: Metadata = {
  title: "ALGOWAYS — Technology Behind Smarter Markets",
  description:
    "האתרים והשירותים של ALGOWAYS בתחומי טכנולוגיה פיננסית, מסחר, ידע ותשתיות.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
        <CookieNotice />
        <AccessibilityMenu />
      </body>
    </html>
  );
}
