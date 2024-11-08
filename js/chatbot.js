document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.querySelector(".codec-chat-container");
  const backgroundAudio = document.getElementById("background-audio");
  const messageSound = document.getElementById("message-sound");
  const userInput = document.getElementById("user-input");
  const sendButton = document.querySelector("button[onclick='sendMessage()']");

  // Fonction pour envoyer un message avec effet sonore
  async function sendMessage() {
    const message = userInput.value;
    if (message.trim() !== "") {
      appendMessage("Vous", message);
      userInput.value = ""; // Effacer le champ de saisie
      playMessageSound(); // Jouer le son de l'envoi

      // Appeler la fonction Netlify pour obtenir la réponse de GPT-4
      try {
        const snakeResponse = await getSnakeResponse(message);
        appendMessage("Snake", snakeResponse); // Affiche la réponse de Snake
      } catch (error) {
        console.error("Erreur lors de l'appel à la fonction Netlify:", error);
        appendMessage(
          "Snake",
          "Hmm... impossible de me connecter à la base. Essaie encore plus tard."
        );
      }
    }
  }

  // Envoi avec la touche "Entrée"
  userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  // Envoi avec le bouton "Envoyer"
  sendButton.addEventListener("click", sendMessage);

  // Fonction pour appeler la fonction Netlify et obtenir la réponse
  async function getSnakeResponse(userMessage) {
    const response = await fetch("/.netlify/functions/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error("Erreur de la fonction Netlify");
    }

    const data = await response.json();
    return data.reply;
  }

  // Fonction pour afficher le message dans la fenêtre de chat
  function appendMessage(sender, message) {
    const chatWindow = document.getElementById("chat-window");
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Faire défiler vers le bas automatiquement
  }

  // Fonction pour jouer le son d'envoi de message
  function playMessageSound() {
    messageSound.muted = false;
    messageSound.play().catch((err) => {
      console.error(`Erreur lors de la lecture du son d'envoi: ${err.message}`);
    });
  }

  // Activer la musique de fond
  function enableBackgroundMusic() {
    backgroundAudio.muted = false;
    backgroundAudio.play().catch((err) => {
      console.error(
        `Erreur lors de la lecture de la musique de fond: ${err.message}`
      );
    });
  }

  // Écoute d’un clic pour activer le son
  document.body.addEventListener("click", enableBackgroundMusic, {
    once: true,
  });
});
