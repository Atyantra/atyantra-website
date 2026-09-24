import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ContactPage from "./components/ContactPage";
import { PrivacyPolicy, Terms, TrustCenter } from "./legal";

const path = window.location.pathname.replace(/\/+$/, "");
const page =
  path === "/trust" ? (
    <TrustCenter />
  ) : path === "/privacy" ? (
    <PrivacyPolicy />
  ) : path === "/terms" ? (
    <Terms />
  ) : path === "/contact/sales" ? (
    <ContactPage
      label="Contact"
      title="Talk to sales."
      intro="Tell us about your network and what you want to achieve. Our team will get back to you."
      to="sales@atyantra.io"
      subject="Sales inquiry"
    />
  ) : path === "/contact/security" ? (
    <ContactPage
      label="Contact"
      title="Security reporting."
      intro="Report a vulnerability or ask a security question. Include enough detail to reproduce any issue."
      to="ciso@atyantra.io"
      subject="Security report"
    />
  ) : (
    <App />
  );

createRoot(document.getElementById("root")!).render(
  <StrictMode>{page}</StrictMode>
);
