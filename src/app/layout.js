import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import CookieConsent from "./lib/CookieConsent";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const monte = Montserrat({
  variable: "--font-monteserrat-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Callent Tech",
  description: " | Convert Your Website into revenue",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
         <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
  
      </head>
      <body
        className={` ${monte.variable} antialiased`}
      >
        <GoogleAnalytics gaId="G-RY8PEVKH8E" />

        
        {children}

        {/* <CookieConsent /> */}
      </body>
    </html>
  );
}
