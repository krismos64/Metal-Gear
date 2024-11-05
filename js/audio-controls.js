// Récupération de l'élément audio
const audioElement = document.getElementById("background-audio");

// Initialisation du son en fonction des valeurs dans localStorage
window.addEventListener("load", () => {
  // Lecture du statut et du volume du son dans localStorage
  const isMuted = localStorage.getItem("isMuted") === "true";
  const volume = localStorage.getItem("volume") || 0.5;

  // Appliquer les valeurs à l'élément audio
  audioElement.muted = isMuted;
  audioElement.volume = volume;

  // Mise à jour du contrôle de volume
  document.getElementById("volume-control").value = volume;
});

// Fonction pour activer/désactiver le son
function toggleMute() {
  audioElement.muted = !audioElement.muted;
  localStorage.setItem("isMuted", audioElement.muted);
}

// Fonction pour régler le volume
function setVolume(value) {
  audioElement.volume = value;
  localStorage.setItem("volume", value);
}
