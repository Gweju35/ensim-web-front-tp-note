# ensim-web-front-tp-note

Projet de TP noté — Développement Web Front (ENSIM).

Stack : HTML, JavaScript, [Tailwind CSS v4](https://tailwindcss.com/), servi avec [Vite](https://vite.dev/).

## Choix techniques

- **Vanilla (HTML / CSS / JS) plutôt qu'Angular** : le sujet reste petit, pas besoin d'un framework complet.
- **Vite** : serveur de dev avec rechargement automatique, et gestion des modules ES (`import` / `export`) pour découper le code en fichiers.
- **Tailwind CSS v4** : thème repris de mon portfolio (couleurs `pf-*`, polices Open Sans / Poppins / Bungee). En v4, la configuration se fait directement dans le CSS (`@theme` dans `src/style.css`), il n'y a donc pas de `tailwind.config.js`.
- **Pas de classes Tailwind dans le HTML** : comme demandé, le HTML n'utilise que des classes CSS « classiques » (`.page-title`, `.kitsune-card`…). Les utilitaires Tailwind sont appliqués dans les fichiers `.css` via `@apply`, pour que la partie CSS reste lisible et évaluable.
- **Conventions du cours** : HTML sémantique (`header`, `nav`, `main`, `section`, `article`…), script chargé en fin de `<body>`, `const`/`let` (jamais `var`), `===`, `querySelector` et `addEventListener` (pas de `onclick` dans le HTML).

## Difficultés rencontrées / questions

_(à compléter au fil du TP)_

## Installation

```bash
npm install
```

## Commandes

| Commande          | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Lance le serveur de développement (rechargement auto) |
| `npm run build`   | Génère la version de production dans `dist/`     |
| `npm run preview` | Prévisualise le build de production              |

## Structure

```
.
├── index.html       # Page principale
├── src/
│   ├── main.js      # Point d'entrée JavaScript
│   └── style.css    # Import de Tailwind + styles perso
└── vite.config.js   # Configuration Vite + plugin Tailwind
```
