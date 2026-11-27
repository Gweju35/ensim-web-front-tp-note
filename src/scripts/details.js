import { findKitsune, updateKitsune } from '../services/kitsuneStore.js';

const CHANCE_BOOST = 0.25; // 25 % de chance de réussir un boost
const TENTATIVES_MAX = 3;  // le bouton se désactive après 3 échecs d'affilée

// Récupération du Kitsune à afficher (ex: details.html?nom=Akari)
const nom = new URLSearchParams(window.location.search).get('nom');
const kitsune = findKitsune(nom);

// Si le Kitsune n'existe pas, redirection vers la page "introuvable.html"
if (!kitsune) {
  // replace() : le bouton "Précédent" ne ramène pas sur une page de détails vide
  window.location.replace('introuvable.html');
} else {
  afficherKitsune(kitsune);
  initialiserBoost(kitsune);
}

// Fonction qui met à jour l'affichage des détails d'un Kitsune
function afficherKitsune(kitsune) {
  document.title = `${kitsune.nom} | Kitsunes Battle`;
  document.querySelector('#kitsune-nom').textContent = kitsune.nom;
  document.querySelector('#kitsune-description').textContent = kitsune.description;
  document.querySelectorAll('[data-attribut]').forEach((element) => {
    const valeur = kitsune[element.dataset.attribut];
    element.textContent = typeof valeur === 'boolean' ? (valeur ? 'Oui' : 'Non') : valeur;
  });
}

// Fonction qui initialise le système de boost
function initialiserBoost(kitsune) {
  const bouton = document.querySelector('#boost-button');
  const message = document.querySelector('#boost-message');
  let tentatives = 0;

  if (kitsune.boost) {
    bouton.disabled = true;
    message.textContent = `${kitsune.nom} est déjà boosté !`;
    return;
  }

  bouton.addEventListener('click', () => {
    tentatives++;

    // Vérification de la réussite du boost
    if (Math.random() < CHANCE_BOOST) {
      kitsune.boost = true;
      updateKitsune(kitsune);
      afficherKitsune(kitsune);
      bouton.disabled = true;
      message.textContent = `Réussi ! ${kitsune.nom} est maintenant boosté.`;
    } else if (tentatives >= TENTATIVES_MAX) {
      bouton.disabled = true;
      message.textContent = `Raté… ${kitsune.nom} n'a pas pu être boosté après ${TENTATIVES_MAX} essais.`;
    } else {
      const restantes = TENTATIVES_MAX - tentatives;
      message.textContent = `Raté… encore ${restantes} essai${restantes > 1 ? 's' : ''}.`;
    }
  });
}
