import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { PrivacyPolicy, Terms, TrustCenter } from "./legal";

const path = window.location.pathname.replace(/\/+$/, "");
const page =
  path === "/trust" ? (
    <TrustCenter />
  ) : path === "/privacy" ? (
    <PrivacyPolicy />
  ) : path === "/terms" ? (
    <Terms />
  ) : (
    <App />
  );

createRoot(document.getElementById("root")!).render(
  <StrictMode>{page}</StrictMode>
);
