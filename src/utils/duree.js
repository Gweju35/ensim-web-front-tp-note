// Fonction qui retourne le temps restant avant une date (en ms), au format "m:ss" (ex : 0:42)
export function tempsRestant(dateFin) {
  const secondes = Math.max(0, Math.ceil((dateFin - Date.now()) / 1000));
  const minutes = Math.floor(secondes / 60);
  return `${minutes}:${String(secondes % 60).padStart(2, '0')}`;
}
