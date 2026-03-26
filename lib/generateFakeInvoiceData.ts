import { fakerEN_US as fakerEn } from "@faker-js/faker";
import { fakerFR as fakerFr } from "@faker-js/faker";
import type { Locale } from "@/lib/i18n/types";
import type { InvoiceData, InvoiceLine } from "./invoiceTypes";

const TVA_FR = [0.2, 0.1, 0.055, 0.021] as const;
const TAX_US = [0.06, 0.07, 0.08, 0.045, 0] as const;

function randomDigits(faker: typeof fakerFr, n: number): string {
  return faker.string.numeric({ length: n, allowLeadingZeros: true });
}

function fakeSiren(faker: typeof fakerFr): string {
  return randomDigits(faker, 9);
}

function fakeSiret(faker: typeof fakerFr): string {
  return randomDigits(faker, 14);
}

function fakeTvaFr(faker: typeof fakerFr, siren: string): string {
  const key = randomDigits(faker, 2);
  return `FR${key}${siren}`;
}

function fakeTvaIntraEu(
  faker: typeof fakerFr | typeof fakerEn,
): string {
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

function fakeIbanFr(faker: typeof fakerFr): string {
  return `FR${randomDigits(faker, 23)}`;
}

function fakeEin(faker: typeof fakerEn): string {
  return `${faker.number.int({ min: 10, max: 99 })}-${faker.number.int({ min: 1000000, max: 9999999 })}`;
}

function fakeUsBankLine(faker: typeof fakerEn): string {
  return `ACH · Routing ${faker.string.numeric(9)} · Account ${faker.string.numeric(10)}`;
}

function formatDate(d: Date, locale: Locale): string {
  return d.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
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

export function generateFakeInvoiceData(
  lineCount: number,
  locale: Locale,
): InvoiceData {
  const n = Math.min(15, Math.max(1, Math.floor(lineCount)));

  if (locale === "fr") {
    const sellerSiren = fakeSiren(fakerFr);
    const lines: InvoiceLine[] = Array.from({ length: n }, () => ({
      description: fakerFr.commerce.productName(),
      quantity: fakerFr.number.int({ min: 1, max: 12 }),
      unitPriceHt: fakerFr.number.float({
        min: 5,
        max: 800,
        fractionDigits: 2,
      }),
      tvaRate: fakerFr.helpers.arrayElement([...TVA_FR]),
    }));

    const issue = fakerFr.date.recent({ days: 60 });
    const due = new Date(issue);
    due.setDate(due.getDate() + fakerFr.number.int({ min: 15, max: 45 }));

    const seller = {
      name: fakerFr.company.name(),
      addressLine1: fakerFr.location.streetAddress(),
      zip: fakerFr.location.zipCode(),
      city: fakerFr.location.city(),
      country: "France",
      phone: fakerFr.phone.number(),
      email: fakerFr.internet.email(),
      siret: fakeSiret(fakerFr),
      tvaFr: fakeTvaFr(fakerFr, sellerSiren),
    };

    const buyer = {
      name: fakerFr.company.name(),
      addressLine1: fakerFr.location.streetAddress(),
      zip: fakerFr.location.zipCode(),
      city: fakerFr.location.city(),
      country: fakerFr.location.country(),
      phone: fakerFr.phone.number(),
      email: fakerFr.internet.email(),
      siret: fakeSiret(fakerFr),
      tvaIntra: fakeTvaIntraEu(fakerFr),
    };

    const totals = computeTotals(lines);

    return {
      invoiceNumber: `FAC-${fakerFr.string.alphanumeric({ length: 8, casing: "upper" })}`,
      issueDate: formatDate(issue, locale),
      dueDate: formatDate(due, locale),
      seller,
      buyer,
      lines,
      totals,
      paymentTerms: fakerFr.helpers.arrayElement([
        "Virement bancaire à réception de facture.",
        "Paiement à 30 jours fin de mois.",
        "Paiement comptant.",
        "Prélèvement à échéance.",
      ]),
      iban: fakeIbanFr(fakerFr),
      paymentDelayDays: fakerFr.number.int({ min: 15, max: 60 }),
      legalFooter: [
        `Capital social : ${fakerFr.number.int({ min: 10, max: 500 })} 000 €`,
        `RCS ${fakerFr.location.city()} ${fakeSiren(fakerFr)}`,
        "TVA acquise sur les débits.",
      ].join(" — "),
    };
  }

  const lines: InvoiceLine[] = Array.from({ length: n }, () => ({
    description: fakerEn.commerce.productName(),
    quantity: fakerEn.number.int({ min: 1, max: 12 }),
    unitPriceHt: fakerEn.number.float({
      min: 5,
      max: 800,
      fractionDigits: 2,
    }),
    tvaRate: fakerEn.helpers.arrayElement([...TAX_US]),
  }));

  const issue = fakerEn.date.recent({ days: 60 });
  const due = new Date(issue);
  due.setDate(due.getDate() + fakerEn.number.int({ min: 15, max: 45 }));

  const state = fakerEn.location.state({ abbreviated: true });
  const cityName = fakerEn.location.city();
  const zip = fakerEn.location.zipCode();

  const seller = {
    name: fakerEn.company.name(),
    addressLine1: fakerEn.location.streetAddress(),
    zip,
    city: `${cityName}, ${state}`,
    country: "United States",
    phone: fakerEn.phone.number(),
    email: fakerEn.internet.email(),
    siret: fakeEin(fakerEn),
    tvaFr: `EIN ${fakeEin(fakerEn)}`,
  };

  const buyer = {
    name: fakerEn.company.name(),
    addressLine1: fakerEn.location.streetAddress(),
    zip: fakerEn.location.zipCode(),
    city: `${fakerEn.location.city()}, ${fakerEn.location.state({ abbreviated: true })}`,
    country: fakerEn.location.country(),
    phone: fakerEn.phone.number(),
    email: fakerEn.internet.email(),
    siret: fakeEin(fakerEn),
    tvaIntra: fakeTvaIntraEu(fakerEn),
  };

  const totals = computeTotals(lines);

  return {
    invoiceNumber: `INV-${fakerEn.string.alphanumeric({ length: 8, casing: "upper" })}`,
    issueDate: formatDate(issue, locale),
    dueDate: formatDate(due, locale),
    seller,
    buyer,
    lines,
    totals,
    paymentTerms: fakerEn.helpers.arrayElement([
      "Net 30 from invoice date.",
      "Due on receipt.",
      "ACH / wire transfer within 15 days.",
      "Credit card on file.",
    ]),
    iban: fakeUsBankLine(fakerEn),
    paymentDelayDays: fakerEn.number.int({ min: 15, max: 45 }),
    legalFooter: [
      `Delaware corporation · EIN ${fakeEin(fakerEn)}`,
      `${fakerEn.location.city()}, ${fakerEn.location.state({ abbreviated: true })}`,
      "Fictitious entity for testing only.",
    ].join(" — "),
  };
}
