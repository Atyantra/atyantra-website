import LegalPage from "./components/LegalPage";

const UPDATED = "September 20, 2026";

export function TrustCenter() {
  return (
    <LegalPage
      label="Trust Center"
      title="Security you can review, controls you define."
      updated={UPDATED}
      intro="TruVigil operates inside your network operations, so trust is a product requirement. This page describes how Atyantra approaches security, governance and data handling. For security questionnaires, architecture reviews or compliance documentation, contact our security team."
      sections={[
        {
          h: "Governed automation",
          p: [
            "AI can reason about your network, but infrastructure changes stay governed. Every recommendation is validated against real network state and requires explicit approval before execution.",
          ],
          ul: [
            "Guardrails are defined by your team and enforced on every autonomous action.",
            "Approved changes run through deterministic execution, never free-form generation.",
            "Each change is verified after execution, and results are recorded.",
          ],
        },
        {
          h: "Access control",
          ul: [
            "Least-privilege access for both people and automated agents.",
            "Role-based permissions scoped to the environments and devices you choose.",
            "Credentials and secrets are stored encrypted and are never exposed to AI models in plain text.",
          ],
        },
        {
          h: "Data protection",
          ul: [
            "Encryption in transit using TLS.",
            "Encryption at rest for customer data and stored credentials.",
            "Customer network data is used to deliver the service to that customer. It is not sold, and it is not used to train models for other customers.",
          ],
        },
        {
          h: "Auditability",
          p: [
            "Every observation, recommendation, approval and action is logged so your team can review what happened, when, and who approved it.",
          ],
        },
        {
          h: "Infrastructure and vendors",
          p: [
            "Atyantra runs on major U.S.-based cloud infrastructure providers. Third-party vendors that process customer data are reviewed and bound by contractual confidentiality and security obligations. A current subprocessor list is available on request.",
          ],
        },
        {
          h: "Incident response",
          p: [
            "We maintain an incident response process covering detection, containment, investigation and customer notification. Where a security incident affects customer data, we notify affected customers without undue delay and in line with applicable U.S. federal and state breach-notification laws and our contractual commitments.",
          ],
        },
        {
          h: "Compliance",
          p: [
            "Enterprise customers commonly ask about SOC 2, NIST and related frameworks. Our current compliance posture, and any available reports or attestations, are shared under NDA during evaluation. Contact us for the latest status.",
          ],
        },
        {
          h: "Responsible disclosure",
          p: [
            "If you believe you have found a security vulnerability in our website or service, please report it to ciso@atyantra.tech with enough detail to reproduce it. Please give us reasonable time to investigate before any public disclosure, and do not access or modify data that is not yours. We will acknowledge good-faith reports and will not pursue legal action against researchers who follow these guidelines.",
          ],
        },
        {
          h: "Contact",
          p: [
            "Security team: ciso@atyantra.tech. Enterprise and sales inquiries: enterprise@atyantra.tech.",
          ],
        },
      ]}
    />
  );
}

export function PrivacyPolicy() {
  return (
    <LegalPage
      label="Legal"
      title="Zero-Trust Privacy Policy"
      updated={UPDATED}
      intro="This policy explains what personal information Atyantra Technologies LLC (“Atyantra,” “we,” “us”) collects through our website and services, how we use it, and the choices available to you, including rights under U.S. state privacy laws."
      sections={[
        {
          h: "Our approach",
          p: [
            "We collect the minimum information needed, restrict access to it, and treat every request for it as untrusted until verified. We do not sell personal information, and we do not share it for cross-context behavioral advertising.",
          ],
        },
        {
          h: "Information we collect",
          ul: [
            "Information you provide: name, work email, company, role and message when you contact us or request a demo or whitepaper.",
            "Usage information: pages viewed, referring page, browser and device type, approximate location from IP address, and similar technical data collected automatically.",
            "Customer service data: network telemetry, configuration and operational data processed on behalf of customers to deliver TruVigil. This is handled under our customer agreements, and the customer controls it.",
          ],
        },
        {
          h: "How we use information",
          ul: [
            "To respond to inquiries and provide demos, documents and support.",
            "To operate, secure and improve our website and services.",
            "To detect and prevent fraud, abuse and security incidents.",
            "To comply with legal obligations and enforce our terms.",
            "To send business communications. You can opt out of marketing emails at any time.",
          ],
        },
        {
          h: "How we share information",
          p: [
            "We share information only with service providers that help us run our business (such as hosting, analytics and email providers) under contracts that limit their use of it, with professional advisers, in connection with a merger or sale of the business, or when required by law. We do not sell personal information.",
          ],
        },
        {
          h: "Cookies and analytics",
          p: [
            "We may use cookies and similar technologies to keep the site working and to understand how it is used. You can control cookies through your browser settings. We honor the Global Privacy Control (GPC) signal as a request to opt out of sale or sharing where required by law.",
          ],
        },
        {
          h: "Retention and security",
          p: [
            "We keep personal information only as long as needed for the purposes above or as required by law, then delete or de-identify it. We use administrative, technical and physical safeguards, including encryption and access controls, but no system is perfectly secure.",
          ],
        },
        {
          h: "Your U.S. privacy rights",
          p: [
            "Depending on your state (including California, Colorado, Connecticut, Virginia, Texas, Utah and others), you may have the right to:",
          ],
          ul: [
            "Know what personal information we collect, use and disclose, and request a copy.",
            "Correct inaccurate personal information.",
            "Delete personal information we hold about you.",
            "Opt out of the sale or sharing of personal information and of targeted advertising. We do not do either.",
            "Not be discriminated against for exercising these rights.",
          ],
        },
        {
          h: "How to exercise your rights",
          p: [
            "Email enterprise@atyantra.tech with your request. We may need to verify your identity before acting on it. You may use an authorized agent, and we will respond within the time required by applicable law (generally 45 days). If we deny a request, you may appeal by replying to our response, and you may contact your state attorney general.",
          ],
        },
        {
          h: "Children",
          p: [
            "Our website and services are for businesses and are not directed to children under 13. We do not knowingly collect personal information from children. If you believe we have, contact us and we will delete it.",
          ],
        },
        {
          h: "Changes to this policy",
          p: [
            "We may update this policy from time to time. The “Last updated” date above shows the latest revision. Material changes will be posted on this page.",
          ],
        },
        {
          h: "Contact",
          p: [
            "Atyantra Technologies LLC. Privacy questions and requests: enterprise@atyantra.tech. Security matters: ciso@atyantra.tech.",
          ],
        },
      ]}
    />
  );
}

export function Terms() {
  return (
    <LegalPage
      label="Legal"
      title="Terms of Service"
      updated={UPDATED}
      intro="These Terms govern your use of the Atyantra website and any related materials. Use of TruVigil by a customer is governed by the written agreement between that customer and Atyantra Technologies LLC (“Atyantra”), which controls if it conflicts with these Terms."
      sections={[
        {
          h: "Acceptance",
          p: [
            "By accessing or using our website, you agree to these Terms. If you do not agree, do not use the site. If you use it on behalf of a company, you confirm you have authority to bind that company.",
          ],
        },
        {
          h: "Use of the site",
          p: ["You agree not to:"],
          ul: [
            "Violate any law or third-party right.",
            "Probe, scan or test the vulnerability of the site, or breach its security, except as permitted by our responsible disclosure guidelines in the Trust Center.",
            "Interfere with or disrupt the site, or use automated means to scrape it in a way that burdens it.",
            "Misrepresent your identity or affiliation.",
          ],
        },
        {
          h: "Intellectual property",
          p: [
            "The site, TruVigil, and all related content, software, names and logos are owned by Atyantra or its licensors and protected by U.S. and international intellectual property laws. “TruVigil” is a trademark of Atyantra Technologies. No license is granted except the limited right to view the site for your internal business evaluation.",
          ],
        },
        {
          h: "Demos, evaluations and documents",
          p: [
            "Demos, pilots and whitepapers are provided for evaluation only, and their content is confidential unless we publish it. Any pilot or paid use is subject to a separate written agreement.",
          ],
        },
        {
          h: "Feedback",
          p: [
            "If you send us suggestions or feedback, we may use them without restriction or obligation to you.",
          ],
        },
        {
          h: "Third-party links",
          p: [
            "The site may link to third-party sites we do not control. We are not responsible for their content or practices.",
          ],
        },
        {
          h: "Disclaimer of warranties",
          p: [
            "THE SITE AND ITS CONTENT ARE PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT, TO THE FULLEST EXTENT PERMITTED BY LAW.",
          ],
        },
        {
          h: "Limitation of liability",
          p: [
            "TO THE FULLEST EXTENT PERMITTED BY LAW, ATYANTRA WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA OR GOODWILL, ARISING FROM YOUR USE OF THE SITE. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SITE WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS ($100). Some states do not allow certain limitations, so parts of this section may not apply to you.",
          ],
        },
        {
          h: "Indemnification",
          p: [
            "You agree to indemnify Atyantra against claims and expenses, including reasonable attorneys’ fees, arising from your misuse of the site or violation of these Terms.",
          ],
        },
        {
          h: "Governing law and disputes",
          p: [
            "These Terms are governed by the laws of the State of West Virginia and applicable U.S. federal law, without regard to conflict-of-laws rules. You and Atyantra agree to the exclusive jurisdiction of the state and federal courts located in West Virginia for any dispute, and waive any objection to that venue.",
          ],
        },
        {
          h: "Changes and termination",
          p: [
            "We may modify these Terms or the site at any time. The “Last updated” date shows the latest version, and continued use means you accept the changes. We may suspend or end your access at any time for any reason.",
          ],
        },
        {
          h: "General",
          p: [
            "If any provision is found unenforceable, the rest remain in effect. These Terms are the entire agreement between you and Atyantra regarding the site. You may not assign them without our consent.",
          ],
        },
        {
          h: "Contact",
          p: ["Questions about these Terms: enterprise@atyantra.tech."],
        },
      ]}
    />
  );
}
