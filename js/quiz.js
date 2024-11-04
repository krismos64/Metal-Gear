let score = 0;
let questionsAnswered = 0;
const totalQuestions = 10;

function checkAnswer(button, correctAnswer) {
  const questionContainer = button.parentNode;

  // Empêche de répondre plusieurs fois à la même question
  if (questionContainer.classList.contains("answered")) {
    return;
  }
  questionContainer.classList.add("answered");
  questionsAnswered++;

  const answer = button.innerText;
  if (answer === correctAnswer) {
    score++; // Ajoute au score seulement si la réponse est correcte
    button.classList.add("correct"); // Marque la bonne réponse en vert
  } else {
    button.classList.add("incorrect"); // Marque la réponse incorrecte en rouge

    // Affiche la bonne réponse en vert
    const buttons = questionContainer.querySelectorAll("button");
    buttons.forEach((btn) => {
      if (btn.innerText === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  // Désactive tous les boutons de la question après réponse
  const buttons = questionContainer.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));

  // Affiche le score automatiquement après avoir répondu aux 10 questions
  if (questionsAnswered === totalQuestions) {
    showScore();
  }
}

function showScore() {
  document.getElementById("score").innerText = `${score} / ${totalQuestions}`;
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("score-container").style.display = "block";

  const messageContainer = document.getElementById("message");
  if (score === totalQuestions) {
    messageContainer.innerText =
      "Parfait ! Vous êtes un véritable expert de Metal Gear !";
  } else if (score >= totalQuestions * 0.7) {
    messageContainer.innerText =
      "Très bien ! Vous maîtrisez bien l'univers de Metal Gear.";
  } else if (score >= totalQuestions * 0.4) {
    messageContainer.innerText =
      "Pas mal ! Vous avez de bonnes connaissances, mais vous pouvez encore progresser.";
  } else {
    messageContainer.innerText =
      "C'est un début ! Rejouez pour en apprendre davantage sur Metal Gear.";
  }
}
