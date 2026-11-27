/**
 * Liste initiale des Kitsune.
 *
 * Chaque Kitsune possède les attributs suivants :
 * - nom         : string  (identifiant unique)
 * - description : string
 * - pv          : number  (points de vie)
 * - force       : number  (dégâts infligés à chaque attaque)
 * - vitesse     : number  (le plus rapide attaque en premier)
 * - enRepos     : boolean (true = ne peut pas combattre)
 * - victoires   : number
 * - boost       : boolean (true = pv doublés au prochain combat)
 */
export const KITSUNES = [
  {
    nom: 'Akari',
    description: 'Renarde à une queue, gardienne des lanternes du sanctuaire. Rapide mais encore fragile.',
    pv: 80,
    force: 12,
    vitesse: 90,
    enRepos: false,
    victoires: 0,
    boost: false,
  },
  {
    nom: 'Kuzunoha',
    description: 'Kitsune blanche à trois queues, réputée pour sa sagesse et sa patience au combat.',
    pv: 120,
    force: 15,
    vitesse: 55,
    enRepos: false,
    victoires: 4,
    boost: true,
  },
  {
    nom: 'Tamamo',
    description: 'Neuf queues dorées et un tempérament de feu. La plus redoutée de la forêt.',
    pv: 150,
    force: 22,
    vitesse: 40,
    enRepos: false,
    victoires: 9,
    boost: false,
  },
  {
    nom: 'Yoru',
    description: 'Renard des ombres qui ne sort qu\'à la nuit tombée. Frappe vite et fort.',
    pv: 95,
    force: 18,
    vitesse: 75,
    enRepos: false,
    victoires: 2,
    boost: false,
  },
  {
    nom: 'Inari',
    description: 'Messagère des rizières, robuste et endurante, elle épuise ses adversaires.',
    pv: 140,
    force: 10,
    vitesse: 30,
    enRepos: false,
    victoires: 1,
    boost: false,
  },
  {
    nom: 'Hoshi',
    description: 'Jeune kitsune céleste aux queues étoilées, imprévisible et pleine d\'énergie.',
    pv: 90,
    force: 16,
    vitesse: 75,
    enRepos: false,
    victoires: 0,
    boost: false,
  },
];
