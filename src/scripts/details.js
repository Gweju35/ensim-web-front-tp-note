import { findKitsune, updateKitsune } from '../services/kitsuneStore.js';
import { tempsRestant } from '../utils/duree.js';

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
  initialiserChronoRepos(kitsune);
}

// Fonction qui affiche le temps restant avant la fin du repos (mis à jour chaque seconde)
function initialiserChronoRepos(kitsune) {
  if (!kitsune.enRepos || !kitsune.finRepos) {
    return; // pas en repos, ou repos sans durée (données de départ)
  }

  const chrono = document.querySelector('#repos-chrono');
  chrono.hidden = false;

  const mettreAJour = () => {
    if (kitsune.finRepos <= Date.now()) {
      // Repos terminé : findKitsune() relit le stockage, qui remet enRepos à false
      clearInterval(intervalle);
      chrono.hidden = true;
      Object.assign(kitsune, findKitsune(kitsune.nom));
      afficherKitsune(kitsune);
    } else {
      chrono.textContent = `⏳ De retour au combat dans ${tempsRestant(kitsune.finRepos)}`;
    }
  };

  const intervalle = setInterval(mettreAJour, 1000);
  mettreAJour();
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
