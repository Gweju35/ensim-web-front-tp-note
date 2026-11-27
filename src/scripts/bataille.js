import { getKitsunes, findKitsune, updateKitsune, mettreAuRepos } from '../services/kitsuneStore.js';

const DELAI_RESULTAT = 3000; // le résultat s'affiche 3 secondes après le lancement
const DUREE_REPOS = 60 * 1000; // le perdant se repose 1 minute

// Récupération des éléments du DOM
const formulaire = document.querySelector('#battle-form');
const selects = [document.querySelector('#combattant-1'), document.querySelector('#combattant-2')];
const boutonCombat = document.querySelector('#combat-button');
const message = document.querySelector('#battle-message');
const resultat = document.querySelector('#battle-result');

let combatEnCours = false;

remplirSelects();
selects.forEach((select) => select.addEventListener('change', mettreAJourSelection));
formulaire.addEventListener('submit', lancerCombat);


// ===== Sélection des combattants =====

// Fonction qui remplit les 2 listes déroulantes avec les Kitsune disponibles
function remplirSelects() {
  const disponibles = getKitsunes().filter((kitsune) => !kitsune.enRepos);

  // On n'efface pas le message "combat en cours" si un combat se déroule
  if (!combatEnCours) {
    message.textContent = '';
  }

  selects.forEach((select) => {
    const valeurPrecedente = select.value;

    const optionVide = creerOption('', '— Choisir un Kitsune —');
    const options = disponibles.map((kitsune) => creerOption(kitsune.nom, decrireKitsune(kitsune)));
    select.replaceChildren(optionVide, ...options);

    // On garde la sélection en cours si le Kitsune est toujours dispo
    if (disponibles.some((kitsune) => kitsune.nom === valeurPrecedente)) {
      select.value = valeurPrecedente;
    }
  });

  if (disponibles.length < 2) {
    message.textContent = 'Il faut au moins 2 Kitsune disponibles pour lancer un combat.';
  }

  mettreAJourSelection();
}

// Fonction qui crée une <option> de liste déroulante
function creerOption(valeur, texte) {
  const option = document.createElement('option');
  option.value = valeur;
  option.textContent = texte;
  return option;
}

// Fonction qui retourne le texte affiché pour un Kitsune dans la liste déroulante
function decrireKitsune(kitsune) {
  const boost = kitsune.boost ? ' · ⚡ boosté' : '';
  return `${kitsune.nom} — PV ${kitsune.pv} · Force ${kitsune.force} · Vitesse ${kitsune.vitesse}${boost}`;
}

// Fonction qui empêche de choisir 2 fois le même Kitsune
// et active le bouton "Combat !" que si 2 Kitsune différents sont sélectionnés
function mettreAJourSelection() {
  const [select1, select2] = selects;

  select1.querySelectorAll('option').forEach((option) => {
    option.disabled = option.value !== '' && option.value === select2.value;
  });
  select2.querySelectorAll('option').forEach((option) => {
    option.disabled = option.value !== '' && option.value === select1.value;
  });

  const deuxCombattants = select1.value !== '' && select2.value !== '' && select1.value !== select2.value;
  boutonCombat.disabled = combatEnCours || !deuxCombattants;
}


// ===== Combat =====

// Fonction appelée au clic sur "Combat !"
function lancerCombat(event) {
  event.preventDefault();
  if (combatEnCours) {
    return;
  }

  // Relecture depuis le stockage pour récupérer les PV et boosts éventuels modifiés par un combat précédent
  const kitsune1 = findKitsune(selects[0].value);
  const kitsune2 = findKitsune(selects[1].value);

  if (!kitsune1 || !kitsune2 || kitsune1.enRepos || kitsune2.enRepos) {
    remplirSelects();
    message.textContent = 'Un des Kitsune n\'est plus disponible, choisis-en un autre.';
    return;
  }

  // Pendant le combat : bouton et listes désactivés, ancien résultat masqué
  combatEnCours = true;
  boutonCombat.disabled = true;
  selects.forEach((select) => (select.disabled = true));
  resultat.hidden = true;
  message.textContent = `⚔️ Combat en cours entre ${kitsune1.nom} et ${kitsune2.nom}…`;

  const combat = simulerCombat(kitsune1, kitsune2);
  setTimeout(() => terminerCombat(combat), DELAI_RESULTAT);
}

/*
 * Fonction qui déroule le combat et retourne le gagnant, le perdant et le détail des attaques.
 * Les PV sont copiés dans des variables locales : les PV enregistrés ne sont jamais modifiés,
 * ils sont donc automatiquement remis à leur valeur initiale à la fin du combat.
 */
function simulerCombat(kitsune1, kitsune2) {
  const deroule = [];

  // Un Kitsune boosté a ses PV doublés
  const combattants = [kitsune1, kitsune2].map((kitsune) => {
    const pv = kitsune.boost ? kitsune.pv * 2 : kitsune.pv;
    if (kitsune.boost) {
      deroule.push(`⚡ ${kitsune.nom} est boosté : ses PV passent de ${kitsune.pv} à ${pv}.`);
    }
    return { kitsune, pv };
  });

  // Le plus rapide attaque en premier (tirage au sort en cas d'égalité)
  let [attaquant, defenseur] = combattants;
  if (defenseur.kitsune.vitesse > attaquant.kitsune.vitesse) {
    [attaquant, defenseur] = [defenseur, attaquant];
  } else if (defenseur.kitsune.vitesse === attaquant.kitsune.vitesse) {
    if (Math.random() < 0.5) {
      [attaquant, defenseur] = [defenseur, attaquant];
    }
    deroule.push(`Égalité de vitesse : le tirage au sort désigne ${attaquant.kitsune.nom}.`);
  }
  deroule.push(`${attaquant.kitsune.nom} attaque en premier.`);

  // À tour de rôle, l'attaquant retire sa force aux PV du défenseur, jusqu'à ce que l'un tombe à 0
  while (defenseur.pv > 0) {
    defenseur.pv = Math.max(0, defenseur.pv - attaquant.kitsune.force);
    deroule.push(
      `${attaquant.kitsune.nom} attaque ${defenseur.kitsune.nom} : −${attaquant.kitsune.force} PV (il lui reste ${defenseur.pv} PV).`
    );

    if (defenseur.pv > 0) {
      [attaquant, defenseur] = [defenseur, attaquant];
    }
  }

  // Le dernier à avoir attaqué est le gagnant
  return { gagnant: attaquant.kitsune, perdant: defenseur.kitsune, deroule };
}

// Fonction appelée 3 secondes après le lancement : enregistre et affiche le résultat
function terminerCombat({ gagnant, perdant, deroule }) {
  const etaitBooste = gagnant.boost || perdant.boost;

  // Gagnant : +1 victoire, boost consommé
  gagnant.victoires += 1;
  gagnant.boost = false;
  updateKitsune(gagnant);

  // Perdant : boost consommé, au repos pendant 1 minute
  perdant.boost = false;
  mettreAuRepos(perdant, DUREE_REPOS);

  afficherResultat(gagnant, perdant, deroule, etaitBooste);

  // Fin du combat : on désélectionne les 2 participants et on réactive le formulaire
  combatEnCours = false;
  selects.forEach((select) => {
    select.disabled = false;
    select.value = '';
  });
  remplirSelects();

  // Le perdant redevient sélectionnable à la fin de son repos (si page toujours ouverte)
  setTimeout(remplirSelects, DUREE_REPOS);
}

// Fonction qui affiche le résultat du combat et son déroulé
function afficherResultat(gagnant, perdant, deroule, etaitBooste) {
  document.querySelector('#battle-result-title').textContent = `🏆 ${gagnant.nom} remporte le combat !`;

  const boost = etaitBooste ? ' Les boosts utilisés ont été consommés.' : '';
  document.querySelector('#battle-result-summary').textContent =
    `${gagnant.nom} compte maintenant ${gagnant.victoires} victoire(s). ${perdant.nom} part se reposer pendant 1 minute.${boost}`;

  const journal = document.querySelector('#battle-log-list');
  journal.replaceChildren(
    ...deroule.map((ligne) => {
      const item = document.createElement('li');
      item.textContent = ligne;
      return item;
    })
  );

  resultat.hidden = false;
}
