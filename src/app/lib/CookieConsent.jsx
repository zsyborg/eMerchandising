"use client";

import CookieConsent from "react-cookie-consent";

export default function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      style={{
        background: "#2B373B",
        color: "white",
        fontSize: "14px",
      }}
      buttonStyle={{
        color: "#4e503b",
        fontSize: "13px",
      }}
      expires={150}
      onAccept={() => {
        console.log("Cookies accepted");
      }}
      onDecline={() => {
        console.log("Cookies declined");
      }}
    >
      We use cookies to improve your experience.{" "}
      <a href="/privacy-policy" style={{ color: "yellow", textDecoration: "underline" }}>
        Learn more
      </a>
    </CookieConsent>
  );
}
