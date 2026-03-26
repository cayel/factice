import type { Locale } from "./types";
import type { InvoicePdfLabels } from "./invoicePdfLabels";

export type Messages = {
  pdf: InvoicePdfLabels;
  headerTagline: string;
  headerDescription: string;
  guide: string;
  docType: string;
  disposition: string;
  fieldsTitle: string;
  lineCountLabel: string;
  btnRandom: string;
  btnPdf: string;
  btnPdfLoading: string;
  previewLoading: string;
  layoutFacturetteHint: string;
  documentModes: Record<"facture" | "facturette", { label: string; description: string }>;
  layouts: Array<{ id: string; label: string; description: string }>;
  welcome: {
    badge: string;
    title: string;
    intro: string;
    sectionPurpose: string;
    purposeItems: string[];
    sectionHow: string;
    howItems: string[];
    important: string;
    checkbox: string;
    closeBackdropAria: string;
    close: string;
    start: string;
  };
  /** Préfixe fichier PDF téléchargé (sans extension). */
  pdfFilenameFacture: string;
  pdfFilenameFacturette: string;
  /** Libellés courts pour le sélecteur de langue (en-tête). */
  langFr: string;
  langEn: string;
  langSwitcherAria: string;
  groups: {
    seller: string;
    buyer: string;
    payment: string;
    other: string;
  };
  fields: {
    sellerLogo: string;
    sellerPhone: string;
    sellerEmail: string;
    sellerSiret: string;
    sellerTvaFr: string;
    buyerPhone: string;
    buyerEmail: string;
    buyerSiret: string;
    buyerTvaIntra: string;
    paymentTerms: string;
    iban: string;
    paymentDelayDays: string;
    legalFooter: string;
    bonPourAccord: string;
  };
};

const frPdf: InvoicePdfLabels = {
  fictifBanner:
    "Document fictif — test uniquement — ne pas utiliser à des fins réelles",
  seller: "Vendeur",
  buyer: "Client",
  invoiceTitle: "FACTURE",
  invoiceNumberPrefix: "N°",
  issueDate: "Date d’émission :",
  dueDate: "Date d’échéance :",
  paymentWithinDays: "Paiement sous {days} jours",
  sellerCompanyId: "SIRET",
  taxId: "TVA",
  phonePrefix: "Tél.",
  buyerCompanyId: "SIRET",
  buyerTaxIntra: "TVA intracom.",
  tableDescription: "Désignation",
  tableQty: "Qté",
  tableUnitPrice: "PU HT",
  tableTax: "TVA",
  tableLineTotal: "Total HT",
  totalExclTax: "Total HT",
  taxLinePrefix: "TVA",
  totalInclTax: "Total TTC",
  paymentTermsLabel: "Conditions :",
  bankLabel: "IBAN :",
  bonPourAccord: "Bon pour accord",
  signatureHint: "Date, cachet et signature",
  bandeauKicker: "Facturation",
  bandeauIssuePrefix: "Émission :",
  bandeauDuePrefix: "Échéance :",
  bandeauDelayLine: "Délai : {days} jours",
  sellerTitleEmitter: "Émetteur",
  buyerTitleAddressed: "Adressé à",
  buyerTitleBilled: "Client facturé",
  facturetteKicker: "Facturette (document simplifié)",
  facturetteTitle: "FACTURETTE",
  facturetteTableTotal: "TTC",
  facturetteSubtotal: "Total HT",
  facturettePayDue: "À payer TTC",
  facturetteColumnLabel: "Libellé",
  facturetteDueReminder:
    "Paiement sous {days} jours — échéance {due}",
};

const enPdf: InvoicePdfLabels = {
  fictifBanner:
    "Fictitious document — testing only — not for real-world use",
  seller: "Seller",
  buyer: "Bill to",
  invoiceTitle: "INVOICE",
  invoiceNumberPrefix: "No.",
  issueDate: "Issue date:",
  dueDate: "Due date:",
  paymentWithinDays: "Payment due within {days} days",
  sellerCompanyId: "EIN / ID",
  taxId: "Tax ID",
  phonePrefix: "Tel.",
  buyerCompanyId: "Company ID",
  buyerTaxIntra: "VAT ID (intl.)",
  tableDescription: "Description",
  tableQty: "Qty",
  tableUnitPrice: "Unit (excl. tax)",
  tableTax: "Tax",
  tableLineTotal: "Line total",
  totalExclTax: "Subtotal (excl. tax)",
  taxLinePrefix: "Tax",
  totalInclTax: "Total due (incl. tax)",
  paymentTermsLabel: "Terms:",
  bankLabel: "Bank / wire:",
  bonPourAccord: "Approved as shown",
  signatureHint: "Date, stamp & signature",
  bandeauKicker: "Billing",
  bandeauIssuePrefix: "Issued:",
  bandeauDuePrefix: "Due:",
  bandeauDelayLine: "Net {days} days",
  sellerTitleEmitter: "From",
  buyerTitleAddressed: "Bill to",
  buyerTitleBilled: "Bill to",
  facturetteKicker: "Simplified invoice (test)",
  facturetteTitle: "SIMPLIFIED INVOICE",
  facturetteTableTotal: "Incl. tax",
  facturetteSubtotal: "Subtotal (excl. tax)",
  facturettePayDue: "Amount due",
  facturetteColumnLabel: "Item",
  facturetteDueReminder: "Due within {days} days — due date {due}",
};

export const messages: Record<Locale, Messages> = {
  fr: {
    pdf: frPdf,
    headerTagline: "Factures fictives pour tests de facturation",
    headerDescription:
      "Données aléatoires, champs modulables, export PDF pour valider votre flux comptable.",
    guide: "Guide",
    docType: "Type de document",
    disposition: "Disposition",
    fieldsTitle: "Champs sur la facture",
    lineCountLabel: "Nombre de lignes de produits",
    btnRandom: "Nouvelles données aléatoires",
    btnPdf: "Télécharger le PDF",
    btnPdfLoading: "Génération…",
    previewLoading: "Préparation de l’aperçu…",
    layoutFacturetteHint:
      "La facturette utilise une disposition fixe (ticket condensé). Repassez en « Facture » pour choisir un autre modèle.",
    documentModes: {
      facture: {
        label: "Facture",
        description:
          "Mise en page classique ou selon la disposition choisie (A4 type facture complète).",
      },
      facturette: {
        label: "Facturette",
        description:
          "Document simplifié, format ticket condensé (souvent moins de mentions), pour tester les flux facturette.",
      },
    },
    layouts: [
      {
        id: "classic",
        label: "Classique",
        description:
          "Vendeur à gauche, titre FACTURE à droite, puis client.",
      },
      {
        id: "bandeau",
        label: "Bandeau",
        description:
          "En-tête coloré pleine largeur, vendeur et client côte à côte.",
      },
      {
        id: "deuxColonnes",
        label: "Deux colonnes",
        description:
          "Émetteur / métadonnées facture en haut, client encadré au centre.",
      },
    ],
    welcome: {
      badge: "Bienvenue",
      title: "Factice",
      intro:
        "Générez des factures entièrement fictives en PDF (aspect scan) pour tester vos outils sans données réelles.",
      sectionPurpose: "À quoi ça sert ?",
      purposeItems: [
        "Valider un logiciel de comptabilité ou de facturation.",
        "Tester des imports, OCR ou workflows (ex. facturation électronique).",
        "Former des utilisateurs sur des exemples sans risque.",
      ],
      sectionHow: "Comment ça marche ?",
      howItems: [
        "Choisissez le type de document (facture ou facturette) et la disposition.",
        "Cochez les champs à afficher (SIRET, IBAN, etc.).",
        "Les données sont aléatoires — vous pouvez en générer de nouvelles à tout moment.",
        "Téléchargez un PDF qui imite une page scannée (image, légers défauts).",
      ],
      important:
        "Important : tout est fictif et réservé aux tests — ne pas utiliser comme document réel ou légal.",
      checkbox:
        "Ne plus afficher cet écran au démarrage (vous pourrez le rouvrir via Guide dans l’en-tête).",
      closeBackdropAria: "Fermer le guide",
      close: "Fermer",
      start: "Commencer",
    },
    pdfFilenameFacture: "facture-fictive",
    pdfFilenameFacturette: "facturette-fictive",
    langFr: "FR",
    langEn: "EN",
    langSwitcherAria: "Langue de l’interface",
    groups: {
      seller: "Vendeur",
      buyer: "Client",
      payment: "Paiement & conditions",
      other: "Autres",
    },
    fields: {
      sellerLogo: "Bloc logo (placeholder)",
      sellerPhone: "Téléphone",
      sellerEmail: "E-mail",
      sellerSiret: "SIRET",
      sellerTvaFr: "N° TVA intracommunautaire (FR)",
      buyerPhone: "Téléphone",
      buyerEmail: "E-mail",
      buyerSiret: "SIRET",
      buyerTvaIntra: "N° TVA intracommunautaire (UE)",
      paymentTerms: "Conditions de paiement (texte)",
      iban: "IBAN",
      paymentDelayDays: "Délai de paiement (jours)",
      legalFooter: "Mentions légales (pied de page)",
      bonPourAccord: "Ligne « Bon pour accord »",
    },
  },
  en: {
    pdf: enPdf,
    headerTagline: "Fictitious invoices for billing software tests",
    headerDescription:
      "Random data, configurable fields, scan-style PDF export to validate your accounting flows.",
    guide: "Guide",
    docType: "Document type",
    disposition: "Layout",
    fieldsTitle: "Fields on the invoice",
    lineCountLabel: "Number of line items",
    btnRandom: "New random data",
    btnPdf: "Download PDF",
    btnPdfLoading: "Generating…",
    previewLoading: "Preparing preview…",
    layoutFacturetteHint:
      "Simplified invoice uses a fixed ticket layout. Switch to “Invoice” to pick another template.",
    documentModes: {
      facture: {
        label: "Invoice",
        description:
          "Classic layout or your chosen template (full A4 invoice).",
      },
      facturette: {
        label: "Simplified",
        description:
          "Compact ticket-style document with fewer fields — useful for simplified-invoice flows.",
      },
    },
    layouts: [
      {
        id: "classic",
        label: "Classic",
        description: "Seller left, INVOICE title right, then customer.",
      },
      {
        id: "bandeau",
        label: "Banner",
        description: "Full-width colored header; seller and buyer side by side.",
      },
      {
        id: "deuxColonnes",
        label: "Two columns",
        description: "Issuer / invoice meta on top, customer in a framed block.",
      },
    ],
    welcome: {
      badge: "Welcome",
      title: "Factice",
      intro:
        "Create fully fictitious invoices as scan-style PDFs to test your tools without real data.",
      sectionPurpose: "What is it for?",
      purposeItems: [
        "Validate accounting or invoicing software.",
        "Test imports, OCR, or workflows (e.g. e-invoicing).",
        "Train users on risk-free examples.",
      ],
      sectionHow: "How does it work?",
      howItems: [
        "Pick document type (invoice or simplified) and layout.",
        "Select which fields to show (IDs, bank details, etc.).",
        "Data is random — regenerate anytime.",
        "Download a PDF that mimics a scanned page (image, light artefacts).",
      ],
      important:
        "Important: everything is fictitious and for testing only — not for real or legal use.",
      checkbox:
        "Don’t show this screen on startup again (reopen anytime via Guide in the header).",
      closeBackdropAria: "Close guide",
      close: "Close",
      start: "Get started",
    },
    pdfFilenameFacture: "fictitious-invoice",
    pdfFilenameFacturette: "fictitious-simplified-invoice",
    langFr: "FR",
    langEn: "EN",
    langSwitcherAria: "Interface language",
    groups: {
      seller: "Seller",
      buyer: "Customer",
      payment: "Payment & terms",
      other: "Other",
    },
    fields: {
      sellerLogo: "Logo block (placeholder)",
      sellerPhone: "Phone",
      sellerEmail: "Email",
      sellerSiret: "EIN / company ID",
      sellerTvaFr: "Federal tax ID",
      buyerPhone: "Phone",
      buyerEmail: "Email",
      buyerSiret: "Company ID",
      buyerTvaIntra: "VAT ID (international)",
      paymentTerms: "Payment terms (text)",
      iban: "Bank / wire (routing & account)",
      paymentDelayDays: "Payment term (days)",
      legalFooter: "Legal footer",
      bonPourAccord: "“Approved as shown” line",
    },
  },
};

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
