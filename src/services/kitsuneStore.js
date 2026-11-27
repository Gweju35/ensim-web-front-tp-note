import { KITSUNES } from '../data/kitsunes.js';

/**
 * Accès aux Kitsune, partagés entre toutes les pages via le localStorage.
 * Au premier lancement (rien en stockage), la liste initiale de data/kitsunes.js est enregistrée.
 */

// Clé pour stocker la liste des Kitsune dans le localStorage
const STORAGE_KEY = 'kitsunes';


// Fonction qui enregistre une valeur dans le localStorage, sous forme de chaîne JSON
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Fonction qui lit une valeur depuis le localStorage, en la convertissant depuis JSON
function get(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error('Données du localStorage invalides :', error.message); // En cas d'erreur, on retourne null pour que la fonction getKitsunes() réinitialise la liste.
    return null;
  }
}

// Fonction qui retourne la liste des Kitsune
export function getKitsunes() {
  const kitsunes = get(STORAGE_KEY);
  if (!Array.isArray(kitsunes)) {
    save(STORAGE_KEY, KITSUNES);
    return get(STORAGE_KEY);
  }
  return kitsunes;
}

// Fonction qui retourne le Kitsune portant ce nom, ou undefined s'il n'existe pas
export function findKitsune(nom) {
  return getKitsunes().find((kitsune) => kitsune.nom === nom);
}

// Fonction qui indique si un Kitsune porte déjà ce nom
// (sans tenir compte des majuscules ni des espaces autour)
export function nomExiste(nom) {
  const nomNormalise = nom.trim().toLowerCase();
  return getKitsunes().some((kitsune) => kitsune.nom.toLowerCase() === nomNormalise);
}

// Fonction qui ajoute un nouveau Kitsune à la liste.
export function addKitsune(kitsune) {
  save(STORAGE_KEY, [...getKitsunes(), kitsune]);
}

// Fonction qui remplace un Kitsune existant (retrouvé par son nom) par sa version modifiée.
export function updateKitsune(kitsuneModifie) {
  const kitsunes = getKitsunes().map((kitsune) =>
    kitsune.nom === kitsuneModifie.nom ? kitsuneModifie : kitsune
  );
  save(STORAGE_KEY, kitsunes);
}
