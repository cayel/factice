# Factice

Application web pour produire des **factures entièrement fictives** au format **PDF** (rendu image type **numérisation**), utile pour tester un logiciel de comptabilité ou de facturation (y compris dans le contexte de la facturation électronique).

## Fonctionnalités

- Données **générées aléatoirement** (librairie Faker, locale FR) — aucune saisie obligatoire.
- Choix des **champs** affichés (SIRET, TVA, IBAN, mentions légales, etc.).
- **Dispositions** : classique, bandeau, deux colonnes ; mode **facturette** (ticket condensé).
- **Logo** SVG généré à la volée (initiales + palette) lorsque l’option logo est activée.
- Export **PDF** côté navigateur : capture HTML → effets « scan » (niveaux de gris, bruit, légère rotation) → une page image.
- Bandeau visible **document fictif / test uniquement**.

## Prérequis

- **Node.js** 20.9 ou supérieur (voir `engines` dans `package.json`).

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement ([http://localhost:3000](http://localhost:3000)) |
| `npm run build` | Build de production |
| `npm run start` | Lance le serveur après `build` |
| `npm run lint` | ESLint |

## Développement local

```bash
npm install
npm run dev
```

## Déploiement

- **Aucune variable d’environnement** n’est requise pour l’usage actuel (tout est exécuté côté client pour la génération PDF).
- **Vercel** (ou tout hébergeur Node compatible Next.js) : connecter le dépôt, laisser la commande de build par défaut (`npm run build`), point d’entrée `next start` ou adapter selon la plateforme.
- **Build** : `npm run build` doit passer sans erreur avant déploiement.

### Checklist avant mise en production

1. `npm run build` et `npm run lint` sans erreur.
2. Tester manuellement : génération PDF + changement de disposition / facturette / champs.
3. Vérifier que `next-env.d.ts` est bien versionné (il ne doit pas être ignoré par Git).

## Stack technique

- Next.js (App Router), React, TypeScript, Tailwind CSS v4
- `@faker-js/faker`, `html2canvas`, `pdf-lib`

## Licence

Projet privé — usage interne / tests.
