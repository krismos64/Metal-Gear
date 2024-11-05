// Chargement des sons
const hoverSound = new Audio("audio/hover-sound.mp3");
const clickSound = new Audio("audio/click-sound.mp3");

// Sélection de tous les éléments interactifs (cards, character-cards, buttons du quiz)
const interactiveElements = document.querySelectorAll(
  ".card, .character-card, .metal-gear-button, .quiz-button, .story-card"
);

// Ajout des événements pour chaque élément interactif
interactiveElements.forEach((element) => {
  // Son au survol
  element.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0; // Redémarre le son à chaque survol
    hoverSound.play();
  });

  // Son au clic
  element.addEventListener("click", () => {
    clickSound.currentTime = 0; // Redémarre le son à chaque clic
    clickSound.play();
  });
});
