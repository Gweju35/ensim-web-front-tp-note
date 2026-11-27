import { addKitsune, nomExiste } from '../services/kitsuneStore.js';

// Récupération des éléments du DOM
const formulaire = document.querySelector('#kitsune-form');
const champNom = document.querySelector('#nom');
const erreurNom = document.querySelector('#nom-erreur');

// Vérification du nom à chaque frappe
// setCustomValidity rend le champ invalide aux yeux du navigateur :
// tant qu'il y a un message, le formulaire ne peut pas être soumis.
champNom.addEventListener('input', verifierNom);

// Fonction de vérification du nom
function verifierNom() {
  const nom = champNom.value.trim();
  let message = '';

  if (champNom.value !== '' && nom === '') {
    message = 'Le nom ne peut pas contenir uniquement des espaces.';
  } else if (nomExiste(nom)) {
    message = `Le nom « ${nom} » est déjà utilisé par un autre Kitsune.`;
  }

  // On affiche le message d'erreur et on rend le champ invalide si besoin
  champNom.setCustomValidity(message);
  erreurNom.textContent = message;
  champNom.setAttribute('aria-invalid', message !== '');
}


// On efface le message d'erreur
formulaire.addEventListener('reset', () => {
  champNom.setCustomValidity('');
  erreurNom.textContent = '';
  champNom.removeAttribute('aria-invalid');
});


// Le submit n'est déclenché que si tous les champs sont valides
formulaire.addEventListener('submit', (event) => {
  event.preventDefault();

  // Revérification
  verifierNom();
  if (!formulaire.checkValidity()) {
    formulaire.reportValidity();
    return;
  }

  // Récupération des données du formulaire
  const donnees = new FormData(formulaire);
  const kitsune = {
    nom: donnees.get('nom').trim(),
    description: donnees.get('description').trim(),
    pv: Number(donnees.get('pv')),
    force: Number(donnees.get('force')),
    vitesse: Number(donnees.get('vitesse')),
    enRepos: false, // valeur par défaut
    victoires: 0, // valeur par défaut
    boost: false, // valeur par défaut
  };

  addKitsune(kitsune); // ajout du nouveau Kitsune

  // Redirection vers la fiche du nouveau Kitsune pour confirmer la création
  window.location.href = `details.html?nom=${encodeURIComponent(kitsune.nom)}`;
});
