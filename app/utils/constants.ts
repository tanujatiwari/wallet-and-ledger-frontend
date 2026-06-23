export const rules = [
  "Length: Between 4 and 20 characters",
  "Characters: A-Z, 0-9, and underscores (_)",
  "No spaces or special symbols (except underscore)"
];

export const faqs = [
  {
    question: "What is a Unique Wallet Identifier?",
    answer: "Your Wallet Identifier serves as your public username (e.g. `@company_finance`) on the Ledger Pro network. It allows clients, institutions, or other nodes to quickly send or route funds to you without exposing long cryptographic public key addresses."
  },
  {
    question: "Handle formatting requirements",
    answer: rules,
  },
  {
    question: "Is this public information?",
    answer: "Yes, other users on the network can lookup this username handle in order to initiate asset transfers. No private keys, passwords, or transaction details are publicly associated with the handle itself."
  },
];

export const footerLinks = [
  {
    href: "/privacy",
    label: "Privacy Policy"
  },
  {
    href: "/terms",
    label: "Terms of Service"
  },
];

export const privacyPolicySections = [
  {
    title: "1. Information We Collect",
    bullets: [
      "We collect your unique wallet identifier and email address during wallet setup.",
      "Minimal device metadata is gathered to audit platform logging and enhance security.",
      "We do NOT collect, access, or store your private key or recovery passphrases under any circumstance."
    ]
  },
  {
    title: "2. Security & Encryption",
    bullets: [
      "All client data in transit is encrypted using secure SSL/TLS channels.",
      "Sensitive stored fields are protected using military-grade AES-256 standard encryption.",
      "Infrastructure is audited periodically to ensure adherence to SOC2 Type II guidelines."
    ]
  },
  {
    title: "3. Data Sharing Policies",
    bullets: [
      "Ledger Pro is built on zero-knowledge principles and never sells your transaction history.",
      "Transaction metadata is broadcasted solely to consensus nodes to settle asset transfers.",
      "We cooperate with official inquiries only in compliance with self-custody privacy limits."
    ]
  }
];

export const termsOfServiceSections = [
  {
    title: "1. User Accounts & Handles",
    bullets: [
      "You are required to select a handle conforming to validation rules (4-20 characters, alphanumeric and underscore).",
      "You assume sole responsibility for securing your wallet credentials and passwords.",
      "Ledger Pro has no authority to recover lost passphrases or retrieve lost self-custodial accounts."
    ]
  },
  {
    title: "2. Acceptable Platform Use",
    bullets: [
      "Users agree not to utilize the Ledger Pro interface to conduct fraudulent transfers or money laundering.",
      "We reserve the right to limit access to front-end endpoints for nodes displaying malicious activity.",
      "Exploitation of smart contracts or transaction nodes is strictly prohibited."
    ]
  },
  {
    title: "3. Self-Custody & Liability Disclaimer",
    bullets: [
      "Our platform operates as a self-custodial client-side tool to facilitate digital asset interactions.",
      "Ledger Pro does not store or process user funds and cannot reverse completed transactions.",
      "You assume full financial risk for transfers sent to incorrect destination addresses."
    ]
  }
];
