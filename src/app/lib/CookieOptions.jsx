"use client";
import Script from "next/script";
// import CookieOptions from "react-cookie-consent";
import "../../../public/silktide-consent-manager.css";

export default function CookieOptions() {
  return (
    <>
        <Script src="/silktide-consent-manager.js" strategy="afterInteractive" />
 <Script id="silktide-config" strategy="afterInteractive">
        {`
          if (typeof silktideCookieBannerManager !== "undefined") {
            silktideCookieBannerManager.updateCookieBannerConfig({
              background: {
                showBackground: true
              },
              cookieIcon: {
                position: "bottomLeft"
              },
              cookieTypes: [
                {
                  id: "necessary",
                  name: "Necessary",
                  description: "<p><span style='color: rgb(33, 33, 33); font-family: Sora, sans-serif; font-size: 14px; letter-spacing: normal;'>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies.</span></p>",
                  required: false,
                  onAccept: function() {
                    if (typeof gtag !== "undefined") {
                      gtag('consent', 'update', {
                        ad_storage: 'granted',
                        ad_user_data: 'granted',
                        ad_personalization: 'granted',
                      });
                    }
                    if (typeof dataLayer !== "undefined") {
                      dataLayer.push({ event: 'consent_accepted_necessary' });
                    }
                  },
                  onReject: function() {
                    if (typeof gtag !== "undefined") {
                      gtag('consent', 'update', {
                        ad_storage: 'denied',
                        ad_user_data: 'denied',
                        ad_personalization: 'denied',
                      });
                    }
                  }
                }
              ],
              text: {
                banner: {
                  description: "<p><span style='color: rgb(33, 33, 33); font-family: Sora, sans-serif; font-size: 14px;'>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies.</span><a href='https://callenttech.com/privacy-policy/' target='_blank'>Privacy Policy.</a></p>",
                  acceptAllButtonText: "Accept all",
                  acceptAllButtonAccessibleLabel: "Accept all cookies",
                  rejectNonEssentialButtonText: "Reject non-essential",
                  rejectNonEssentialButtonAccessibleLabel: "Reject non-essential",
                  preferencesButtonText: "Preferences",
                  preferencesButtonAccessibleLabel: "Toggle preferences"
                },
                preferences: {
                  title: "Customize your cookie preferences",
                  description: "<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>",
                  creditLinkText: "Get this banner for free",
                  creditLinkAccessibleLabel: "Get this banner for free"
                }
              },
              position: {
                banner: "bottomLeft"
              }
            });
          }
        `}
      </Script>


    </>
  );
}
