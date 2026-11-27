import '../style.css';
import { getKitsunes } from '../services/kitsuneStore.js';

// Afficher la liste des Kitsune dans la page
const liste = document.querySelector('#kitsune-list');
const template = document.querySelector('#kitsune-card-template');

// Récupère la liste des Kitsune et crée une carte pour chacun d'eux
getKitsunes().forEach((kitsune) => {
  liste.appendChild(creerCarte(kitsune));
});

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

  statut.textContent = kitsune.enRepos ? 'En repos' : 'Disponible';
  statut.classList.add(kitsune.enRepos ? 'is-resting' : 'is-available');

  // Style spécial pour les Kitsune boostés
  if (kitsune.boost) {
    item.classList.add('is-boosted');
    badge.hidden = false;
  }

  return carte;
}
