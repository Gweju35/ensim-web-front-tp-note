/* Bonus : podium des 3 meilleurs Kitsune, selon critère (victoires, pv, force, vitesse) */

// Texte affiché sous le nom de chaque Kitsune, selon le critère
const VALEUR_AFFICHEE = {
  victoires: (kitsune) => `${kitsune.victoires} victoire${kitsune.victoires > 1 ? 's' : ''}`,
  pv: (kitsune) => `${kitsune.pv} PV`,
  force: (kitsune) => `${kitsune.force} de force`,
  vitesse: (kitsune) => `${kitsune.vitesse} de vitesse`,
};

// Emoji des médailles pour le podium
const MEDAILLES = ['🥇', '🥈', '🥉'];

// Fonction qui affiche le podium et le met à jour à chaque changement de critère
export function initialiserPodium(kitsunes) {
  const select = document.querySelector('#podium-critere');
  const liste = document.querySelector('#podium-list');
  const template = document.querySelector('#podium-place-template');

  const afficherPodium = () => {
    const critere = select.value;

    // Tri décroissant sur le critère, puis par ordre alphabétique si égalité
    const top3 = kitsunes.toSorted((a, b) => b[critere] - a[critere] || a.nom.localeCompare(b.nom)).slice(0, 3);
    liste.replaceChildren(...top3.map((kitsune, index) => creerPlace(template, kitsune, index, critere)));
  };

  select.addEventListener('change', afficherPodium);
  afficherPodium();
}

// Fonction qui crée une marche du podium à partir du template
function creerPlace(template, kitsune, index, critere) {
  const place = template.content.cloneNode(true);
  const lien = place.querySelector('.podium-name');

  lien.href = `details.html?nom=${encodeURIComponent(kitsune.nom)}`;
  lien.textContent = kitsune.nom;
  place.querySelector('.podium-value').textContent = VALEUR_AFFICHEE[critere](kitsune);
  place.querySelector('.podium-medal').textContent = MEDAILLES[index];

  return place;
}
