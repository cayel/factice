# Factice – Notes techniques

Ce document complète le `README.md` en décrivant le **fonctionnement interne** de l’application, en particulier la **génération des données fictives** et le **calcul des montants**.

---

## 1. Architecture applicative (vue d’ensemble)

- **Framework** : Next.js (App Router), React, TypeScript, Tailwind CSS v4.
- **Entrée principale** : `app/page.tsx`
  - Gère l’état global de la page (mode document, disposition, régime TVA, nombre de lignes, sélection de champs).
  - Génère les données via `generateFakeInvoiceData` puis délègue le rendu à `InvoiceTemplate`.
- **Rendu facture** : `components/InvoiceTemplate.tsx`
  - Choisit un layout : `LayoutClassic`, `LayoutBandeau`, `LayoutDeuxColonnes`, `LayoutFacturette`.
  - Chaque layout utilise des morceaux réutilisables de `components/invoice/parts.tsx` (bloc vendeur, bloc client, tableau de lignes, totaux…).
- **Génération PDF** : `lib/scanPipeline.ts`
  - Capture le DOM de la facture (`html2canvas`), applique des effets visuels (niveau de gris, bruit, légère rotation) et assemble le tout dans un PDF avec `pdf-lib`.
- **Internationalisation** :
  - `lib/i18n/messages.ts` : textes d’interface (FR/EN) et labels du sélecteur.
  - `lib/i18n/invoicePdfLabels.ts` : libellés utilisés dans le rendu de la facture (titre, colonnes, mentions…).
  - `lib/i18n/context.tsx` : choix de la langue, stockée dans `localStorage`.

---

## 2. Modèle de données facture

Type principal : `lib/invoiceTypes.ts`.

- **Lignes de facture** (`InvoiceLine`) :
  - `description: string`
  - `quantity: number`
  - `unitPriceHt: number` – prix unitaire HT.
  - `tvaRate: number` – taux de TVA en décimal (ex. `0.2` pour 20 %).
- **En-tête / parties** (`InvoiceData`) :
  - `seller` (vendeur) : nom, adresse, `siret?`, `tvaFr?` (numéro TVA vendeur).
  - `buyer` (client) : nom, adresse, `siret?`, `tvaIntra?` (TVA intracom acheteur).
- **Totaux** (`InvoiceData["totals"]`) :
  - `ht: number` – total hors taxe.
  - `tvaByRate: Record<string, number>` – montant de TVA par taux (clé = taux en string).
  - `ttc: number` – total TTC (`ht + somme des TVA`).

L’affichage des champs est contrôlé par `InvoiceFieldSelection` (un `Record<InvoiceFieldKey, boolean>`), construit et manipulé via `lib/invoiceFieldConfig.ts` + `FieldSelector`.

---

## 3. Génération des données fictives

La génération est centralisée dans `lib/generateFakeInvoiceData.ts`, fonction :

```ts
export function generateFakeInvoiceData(
  lineCount: number,
  locale: Locale,
  vatRegime: VatRegimeId,
): InvoiceData
```

- `lineCount` : nombre de lignes demandé par l’utilisateur (1 à 15).
- `locale` : `"fr"` ou `"en"` (influe sur la devise, les formats de date et la source Faker).
- `vatRegime` : régime TVA sélectionné dans l’UI (`lib/vatRegimes.ts`).

### 3.1. Régimes TVA supportés

Définis dans `lib/vatRegimes.ts` :

- `france_tva` : facture **avec TVA** (comportement “historique”).
- `cee_intra_no_vat` : facture **intracommunautaire sans TVA** (TVA non mentionnée sur la facture, mais avec IDs intracom).
- `etranger_no_vat` : facture **étranger hors France et hors CEE, sans TVA**.

Le composant `app/page.tsx` expose ce choix via un `<select>` :

- Label : `messages.vatTitle`.
- Options : `messages.vatModes[vatRegime].label` + description sous le select.

### 3.2. Logique de génération selon le régime

### 3.2.1. Génération des noms, sociétés et adresses

La majorité des champs “identité” (dénomination, adresse, coordonnées) provient de **Faker** :

- **Dénomination de société** (`seller.name`, `buyer.name`)
  - Locale FR : `fakerFr.company.name()`
  - Locale EN : `fakerEn.company.name()`
- **Adresse** (`addressLine1`, `zip`, `city`, `country`)
  - `addressLine1` : `faker*.location.streetAddress()`
  - `zip` : `faker*.location.zipCode()`
  - `city` :
    - FR : `fakerFr.location.city()`
    - EN : la “ville” est parfois enrichie d’un état abrégé pour mimer des formats anglo-saxons (ex. `${city}, ${state}`).
  - `country` :
    - Vendeur : fixé à `"France"` dans les régimes FR/CEE/étranger (pour simuler un émetteur FR).
    - Acheteur :
      - `france_tva` : `faker*.location.country()` (pays aléatoire)
      - `cee_intra_no_vat` : pays UE choisi dans une liste restreinte (DE/BE/ES/IT/NL/PT) + nom du pays (FR/EN)
      - `etranger_no_vat` : pays non UE choisi dans une liste restreinte (ex. Suisse, Royaume-Uni…)
- **Coordonnées**
  - Téléphone : `faker*.phone.number()`
  - Email : `faker*.internet.email()`

À noter :

- Les champs sont conçus pour être **plausibles visuellement** (tests d’import/OCR/UI), pas pour refléter une base d’adresses réellement existante.
- Les adresses (rue/CP/ville) sont générées indépendamment ; il n’y a pas de contrainte forte de cohérence géographique entre `zip` et `city` au-delà du réalisme de Faker.

#### a) Cas `france_tva` (FR locale)

- **Lignes** :
  - `quantity` : aléatoire (1–12).
  - `unitPriceHt` : aléatoire (5–800 €, 2 décimales).
  - `tvaRate` : choisi dans `TVA_FR = [0.2, 0.1, 0.055, 0.021]`.
- **Vendeur** :
  - `country: "France"`.
  - `siret` : 14 chiffres aléatoires.
  - `tvaFr` : calculé à partir d’un SIREN + clé (`FR` + 2 chiffres + SIREN).
- **Acheteur** :
  - Pays aléatoire via Faker.
  - `siret` + `tvaIntra` de type intracom (code pays UE + chaîne alphanumérique).

#### b) Cas `france_tva` (EN locale)

- Simule une facture “US” :
  - `TAX_US = [0.06, 0.07, 0.08, 0.045, 0]` (certains scénarios à 0 pour varier).
  - `seller.tvaFr` contient un `EIN` simplifié.
  - `buyer.tvaIntra` : forme “VAT ID international” pour rester générique.

#### c) Cas sans TVA (`cee_intra_no_vat`, `etranger_no_vat`)

Objectif : toutes les lignes sont **HT = TTC** (taux 0), sans ligne de TVA dans le récapitulatif, mais avec des mentions adaptées.

- **Lignes** :
  - Même schéma pour `quantity` et `unitPriceHt` que précédemment.
  - `tvaRate` **forcé à `0`** pour toutes les lignes.
- **Totaux** :
  - Voir §4 ci‑dessous : `computeTotals` ignore les lignes à `tvaRate = 0`, donc :
    - `tvaByRate` est vide.
    - `ttc === ht`.

**Différences FR / EN et CEE / Étranger :**

- FR + `cee_intra_no_vat` :
  - Vendeur en France, avec `tvaFr` intracom.
  - Acheteur dans un pays UE (liste restreinte DE/BE/ES/IT/NL/PT), avec `tvaIntra` simulé.
  - `legalFooter` inclut une mention “TVA non applicable sur la facture (opération intracom).”
- FR + `etranger_no_vat` :
  - Vendeur en France.
  - Acheteur dans un pays non UE (liste : États‑Unis, Suisse, Royaume‑Uni, Canada, Norvège), **sans** `tvaIntra`.
  - `legalFooter` : “TVA non applicable sur la facture (opération hors champ).”
- EN + `cee_intra_no_vat` :
  - Vendeur “France” textuellement (mais avec format US pour le reste), `tvaFr` type `EIN`.
  - Acheteur dans un pays UE (mêmes codes, noms en anglais), avec `tvaIntra`.
  - Mentions en anglais : “No VAT shown on the invoice (intracom transaction).”
- EN + `etranger_no_vat` :
  - Acheteur dans un pays non UE (liste équivalente en anglais), sans `tvaIntra`.
  - Mentions en anglais : “No VAT shown on the invoice (out of VAT scope).”

---

## 4. Calcul des montants (HT / TVA / TTC)

Logique centralisée dans `computeTotals(lines: InvoiceLine[])` (`lib/generateFakeInvoiceData.ts`) :

1. Initialisation
   - `ht = 0`
   - `tvaByRate: Record<string, number> = {}`
2. Pour chaque ligne :
   - `lineHt = quantity * unitPriceHt`
   - `ht += lineHt`
   - **Si** `tvaRate > 0` :
     - `tvaAmount = lineHt * tvaRate`
     - `tvaByRate[String(tvaRate)] += tvaAmount`
   - **Si** `tvaRate === 0` : la ligne n’alimente pas `tvaByRate`.
3. `totalTva = somme(tvaByRate[rate])`
4. `ttc = ht + totalTva`

Conséquences :

- En mode **avec TVA** (`france_tva`) : `tvaByRate` contient une entrée par taux distinct présent dans les lignes (ex. `{"0.2": montant, "0.1": montant}`).
- En mode **sans TVA** (`cee_intra_no_vat` / `etranger_no_vat`) :
  - `tvaByRate` est vide.
  - `ttc === ht`.

---

## 5. Rendu des tableaux et totaux

### 5.1. Tableau des lignes

Composant : `LinesTable` dans `components/invoice/parts.tsx`.

- Affiche pour chaque ligne :
  - Désignation, quantité, prix unitaire HT, taux de TVA (formaté), total de ligne HT.
- Détail important pour les régimes sans TVA :
  - Si `line.tvaRate > 0` → `formatPercent(line.tvaRate)` (ex. `20 %`).
  - Sinon → `—` (pour éviter d’afficher `0 %` qui pourrait prêter à confusion).

### 5.2. Boîte des totaux

Composant : `TotalsBox` dans `components/invoice/parts.tsx`.

- Ligne “Total HT” : `formatMoney(data.totals.ht)`.
- Boucle sur `Object.entries(data.totals.tvaByRate)` :
  - Une ligne par taux de TVA, type : `TVA 20 % : 123,45 €`.
  - En mode sans TVA, le tableau est vide → aucune ligne TVA n’est affichée.
- Ligne finale “Total TTC” : `formatMoney(data.totals.ttc)` :
  - En mode sans TVA, **TTC = HT**, ce qui est cohérent avec le choix d’un taux `0`.

---

## 6. Régime TVA et interface utilisateur

Le fichier `lib/i18n/messages.ts` définit, pour chaque langue, les libellés du sélecteur de régime TVA (`vatTitle` + `vatModes`).

Dans `app/page.tsx` :

- État local :

```ts
const [vatRegime, setVatRegime] = useState<VatRegimeId>("france_tva");
```

- Le `<select>` construit ses options à partir de `VAT_REGIMES` (ordre déclaratif) et `messages.vatModes[id].label`.
- Une description courte propre à chaque régime est affichée sous le select pour contextualiser le choix.

Le régime choisi est ensuite passé à `generateFakeInvoiceData`, qui adapte :

- Le pays et les IDs fiscaux vendeur / acheteur.
- Les taux `tvaRate` des lignes.
- Les mentions `legalFooter`.

---

## 7. Points d’attention / limites volontaires

- Les numéros (SIRET, TVA, EIN, IBAN, etc.) sont **entièrement fictifs** et ne respectent pas forcément toutes les règles de contrôle métier ; le but est de **ressembler** à des données réelles, pas d’être valides juridiquement.
- Les règles de TVA sont volontairement **simplifiées** :
  - Une seule configuration “France TVA”, une seule configuration “CEE intracom sans TVA”, une seule configuration “Étranger sans TVA”.
  - Il ne s’agit pas d’un moteur de calcul de TVA exhaustif, mais d’un générateur de cas de test réalistes.
- Les valeurs monétaires ne prennent pas en compte l’arrondi “par ligne” vs “par taux” de manière stricte ; l’objectif est visuel et fonctionnel pour les outils de test (import, OCR, etc.), pas comptable.

---

## 8. Idées d’évolutions techniques

- Ajouter un champ explicite `vatRegime` dans `InvoiceData` pour que les composants de rendu puissent adapter certains libellés (par exemple renommer “Total TTC” → “Total” en mode sans TVA).
- Introduire un petit “engine” de règles TVA (FR / CEE / hors CEE) pour générer plus de cas de test variés (ex. opérations exonérées, autoliquidation, etc.), toujours fictifs.
- Couvrir `computeTotals` et la logique des régimes TVA avec des tests unitaires (vérifier que `tvaByRate` et `ttc` sont cohérents dans les différents scénarios).
