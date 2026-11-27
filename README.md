# ensim-web-front-tp-note

Projet de TP noté — Développement Web Front (ENSIM).

Stack : HTML, JavaScript, [Tailwind CSS v4](https://tailwindcss.com/), servi avec [Vite](https://vite.dev/).

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
