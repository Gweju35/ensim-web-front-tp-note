# ensim-web-front-tp-note

Projet de TP noté - Développement Web Front (ENSIM).

Stack : HTML, JavaScript, [Tailwind CSS v4](https://tailwindcss.com/), servi avec [Vite](https://vite.dev/).

## Choix techniques

- **Vanilla (HTML / CSS / JS) plutôt qu'Angular** : c'est avant tout une préférence personnelle. Je trouve Angular sur-architecturé : chaque composant génère à lui seul 4 fichiers (`.ts`, `.html`, `.css`, `.spec.ts`), ce qui multiplie les fichiers sans apporter grand-chose sur une application de 5 pages.
- **Vite** : serveur de dev avec rechargement automatique, et gestion des modules ES (`import` / `export`) pour découper le code en fichiers.
- **Tailwind CSS v4** : polices reprises de mon portfolio (Open Sans / Poppins / Bungee) et une palette de couleurs « Kitsune de nuit », définie une seule fois en variables de thème.

### Données

- La liste initiale est dans `src/data/kitsunes.js` (6 Kitsune).
- Le **`nom` sert d'identifiant unique** : le sujet interdit deux Kitsune avec le même nom, donc pas besoin d'un champ `id` en plus.
- Les jeux de données couvrent les cas à tester : un Kitsune déjà `boost`, et deux Kitsune de même `vitesse` (égalité tirée au sort en bataille).

### Plusieurs pages + `localStorage`

- Une page HTML par écran : navigation par simples liens `<a>`, sans routeur.
- Les Kitsune doivent rester modifiés d'une page à l'autre (ajout, boost, repos, victoires) : ils sont stockés dans le `localStorage`, avec `JSON.stringify` / `JSON.parse`.
- Tout l'accès aux données passe par `src/services/kitsuneStore.js` : les pages ne manipulent jamais le `localStorage` directement.
- Au premier lancement, la liste initiale de `src/data/kitsunes.js` est copiée dans le stockage. Pour revenir aux données de départ : supprimer la clé `kitsunes` dans l'onglet *Application > Local Storage* de la console développeur (F12).

### Organisation des fichiers

- Les pages HTML sont à la racine du projet.
- Les scripts propres à chaque écran sont dans `src/scripts/` (un fichier par page), séparés des données (`src/data/`), de l'accès aux données (`src/services/`) et des styles (`src/styles/`).

## Difficultés rencontrées / questions

- **Flash de page non stylée en développement** : le CSS était importé depuis le JS. En mode `npm run dev`, Vite l'injecte alors via JavaScript, après l'affichage du HTML → la page apparaissait une fraction de seconde sans style. Solution : charger la feuille de style dans le `<head>`.

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
├── index.html              # Écran 'Liste Kitsune'
├── details.html            # Écran 'Détails Kitsune' (?nom=...)
├── ajout.html              # Écran 'Ajout d'un Kitsune'
├── introuvable.html        # Écran 'Kitsune introuvable'
├── bataille.html           # Écran 'Bataille'
├── src/
│   ├── data/
│   │   └── kitsunes.js     # Liste initiale des Kitsune
│   ├── services/
│   │   └── kitsuneStore.js # Lecture / écriture des Kitsune (localStorage)
│   ├── scripts/
│   │   ├── liste.js        # Script de l'écran Liste
│   │   ├── details.js      # Script de l'écran Détails
│   │   ├── ajout.js        # Script de l'écran Ajout
│   │   └── bataille.js     # Script de l'écran Bataille
│   ├── utils/
│   │   └── duree.js        # Formatage du temps restant (chrono de repos)
│   ├── styles/
│   │   ├── common.css      # Boutons, liens, titres partagés
│   │   ├── navbar.css      # Barre de navigation
│   │   ├── liste.css       # Styles de l'écran Liste
│   │   ├── details.css     # Styles de l'écran Détails
│   │   ├── ajout.css       # Styles du formulaire d'ajout
│   │   ├── introuvable.css # Styles de l'écran Kitsune introuvable
│   │   └── bataille.css    # Styles de l'écran Bataille
│   └── style.css           # Tailwind + thème + imports des styles
└── vite.config.js          # Vite + Tailwind + déclaration des pages
```
