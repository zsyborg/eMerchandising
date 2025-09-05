"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function CookieConsent() {
  useEffect(() => {
    if (typeof cookieconsent !== "undefined") {
      cookieconsent.run({
        notice_banner_type: "headline",
        consent_type: "express",
        palette: "light",
        language: "en",
        page_load_consent_levels: ["strictly-necessary"],
        notice_banner_reject_button_hide: false,
        preferences_center_close_button_hide: false,
        page_refresh_confirmation_buttons: false,
        website_privacy_policy_url: "https://myweb.com",
      });
    }
  }, []);

  return (
    <>
      <Script
        src="https://www.termsfeed.com/public/cookie-consent/4.2.0/cookie-consent.js"
        strategy="afterInteractive"
      />
    </>
  );
}
