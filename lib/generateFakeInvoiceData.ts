import { fakerFR as faker } from "@faker-js/faker";
import type { InvoiceData, InvoiceLine } from "./invoiceTypes";

const TVA_RATES = [0.2, 0.1, 0.055, 0.021] as const;

function randomDigits(n: number): string {
  return faker.string.numeric({ length: n, allowLeadingZeros: true });
}

/** Identifiants uniquement pour des tests — ne sont pas validés (Luhn, etc.). */
function fakeSiren(): string {
  return randomDigits(9);
}

function fakeSiret(): string {
  return randomDigits(14);
}

function fakeTvaFr(siren: string): string {
  const key = randomDigits(2);
  return `FR${key}${siren}`;
}

function fakeTvaIntraEu(): string {
  const country = faker.helpers.arrayElement([
    "DE",
    "BE",
    "ES",
    "IT",
    "NL",
    "PT",
  ]);
  const body = faker.string.alphanumeric({ length: 10, casing: "upper" });
  return `${country}${body}`;
}

function fakeIbanFr(): string {
  const bban = randomDigits(23);
  return `FR${bban}`;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function computeTotals(lines: InvoiceLine[]) {
  let ht = 0;
  const tvaByRate: Record<string, number> = {};

  for (const line of lines) {
    const lineHt = line.quantity * line.unitPriceHt;
    ht += lineHt;
    const rateKey = String(line.tvaRate);
    const tvaAmount = lineHt * line.tvaRate;
    tvaByRate[rateKey] = (tvaByRate[rateKey] ?? 0) + tvaAmount;
  }

  const totalTva = Object.values(tvaByRate).reduce((a, b) => a + b, 0);
  return {
    ht,
    tvaByRate,
    ttc: ht + totalTva,
  };
}

/** Génère un jeu de données entièrement fictif. Les champs affichés sur le PDF sont filtrés par `InvoiceTemplate` selon la sélection. */
export function generateFakeInvoiceData(lineCount: number): InvoiceData {
  const n = Math.min(15, Math.max(1, Math.floor(lineCount)));
  const sellerSiren = fakeSiren();

  const lines: InvoiceLine[] = Array.from({ length: n }, () => {
    const tvaRate = faker.helpers.arrayElement([...TVA_RATES]);
    return {
      description: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 12 }),
      unitPriceHt: faker.number.float({ min: 5, max: 800, fractionDigits: 2 }),
      tvaRate,
    };
  });

  const issue = faker.date.recent({ days: 60 });
  const due = new Date(issue);
  due.setDate(due.getDate() + faker.number.int({ min: 15, max: 45 }));

  const seller = {
    name: faker.company.name(),
    addressLine1: faker.location.streetAddress(),
    zip: faker.location.zipCode(),
    city: faker.location.city(),
    country: "France",
    phone: faker.phone.number(),
    email: faker.internet.email(),
    siret: fakeSiret(),
    tvaFr: fakeTvaFr(sellerSiren),
  };

  const buyer = {
    name: faker.company.name(),
    addressLine1: faker.location.streetAddress(),
    zip: faker.location.zipCode(),
    city: faker.location.city(),
    country: faker.location.country(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    siret: fakeSiret(),
    tvaIntra: fakeTvaIntraEu(),
  };

  const totals = computeTotals(lines);

  return {
    invoiceNumber: `FAC-${faker.string.alphanumeric({ length: 8, casing: "upper" })}`,
    issueDate: formatDate(issue),
    dueDate: formatDate(due),
    seller,
    buyer,
    lines,
    totals,
    paymentTerms: faker.helpers.arrayElement([
      "Virement bancaire à réception de facture.",
      "Paiement à 30 jours fin de mois.",
      "Paiement comptant.",
      "Prélèvement à échéance.",
    ]),
    iban: fakeIbanFr(),
    paymentDelayDays: faker.number.int({ min: 15, max: 60 }),
    legalFooter: [
      `Capital social : ${faker.number.int({ min: 10, max: 500 })} 000 €`,
      `RCS ${faker.location.city()} ${fakeSiren()}`,
      "TVA acquise sur les débits.",
    ].join(" — "),
  };
}

