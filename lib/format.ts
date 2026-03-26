export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatPercent(rate: number): string {
  return `${(rate * 100).toLocaleString("fr-FR", {
    maximumFractionDigits: 2,
  })} %`;
}
