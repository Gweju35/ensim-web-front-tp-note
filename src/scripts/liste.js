import { getKitsunes } from '../services/kitsuneStore.js';
import { tempsRestant } from '../utils/duree.js';

// Afficher la liste des Kitsune dans la page
const liste = document.querySelector('#kitsune-list');
const template = document.querySelector('#kitsune-card-template');

// Récupère la liste des Kitsune et crée une carte pour chacun d'eux
getKitsunes().forEach((kitsune) => {
  liste.appendChild(creerCarte(kitsune));
});

// Chrono des Kitsune en repos, mis à jour chaque seconde
mettreAJourChronos();
setInterval(mettreAJourChronos, 1000);

// Fonction qui crée la carte d'un Kitsune à partir du template
function creerCarte(kitsune) {
  const carte = template.content.cloneNode(true);
  const item = carte.querySelector('.kitsune-card');
  const lien = carte.querySelector('.kitsune-card-link');
  const statut = carte.querySelector('.kitsune-card-status');
  const badge = carte.querySelector('.kitsune-card-badge');

  // encodeURIComponent : un nom avec espaces ou accents reste valide dans l'URL
  lien.href = `details.html?nom=${encodeURIComponent(kitsune.nom)}`;
  carte.querySelector('.kitsune-card-name').textContent = kitsune.nom;

  afficherStatut(statut, kitsune.enRepos);

  // Repos temporaire (après une défaite) : on mémorise l'heure de fin pour le chrono
  if (kitsune.enRepos && kitsune.finRepos) {
    statut.dataset.finRepos = kitsune.finRepos;
  }

  // Style spécial pour les Kitsune boostés
  if (kitsune.boost) {
    item.classList.add('is-boosted');
    badge.hidden = false;
  }

  return carte;
}

// Fonction qui affiche le statut "Disponible" / "En repos" d'une carte
function afficherStatut(statut, enRepos) {
  statut.textContent = enRepos ? 'En repos' : 'Disponible';
  statut.classList.toggle('is-resting', enRepos);
  statut.classList.toggle('is-available', !enRepos);
}

// Fonction qui met à jour le temps restant de chaque Kitsune en repos
function mettreAJourChronos() {
  document.querySelectorAll('.kitsune-card-status[data-fin-repos]').forEach((statut) => {
    const finRepos = Number(statut.dataset.finRepos);

    if (finRepos <= Date.now()) {
      // Repos terminé : getKitsunes() enregistre le retour à "disponible", puis on met la carte à jour
      getKitsunes();
      delete statut.dataset.finRepos;
      afficherStatut(statut, false);
    } else {
      statut.textContent = `En repos · retour dans ${tempsRestant(finRepos)}`;
    }
  });
}
