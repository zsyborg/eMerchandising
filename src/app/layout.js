import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "./lib/CookieConsent";
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "eMerchandising Agency",
  description: " | Convert Your Website into revenue",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId="G-RY8PEVKH8E" />
        
        {children}

        <CookieConsent />
      </body>
    </html>
  );
}
