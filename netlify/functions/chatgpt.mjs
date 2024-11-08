import fetch from "node-fetch";

export async function handler(event, context) {
  const { message } = JSON.parse(event.body);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo", // ou "gpt-4" si c’est le bon modèle
        messages: [
          {
            role: "system",
            content: "Tu es Solid Snake, un expert de la série Metal Gear.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log(
      "Réponse complète de l'API OpenAI :",
      JSON.stringify(data, null, 2)
    );

    // Vérifier si "choices" est défini et contient au moins un élément
    if (
      !data.choices ||
      data.choices.length === 0 ||
      !data.choices[0].message
    ) {
      throw new Error(
        "La réponse de l'API OpenAI ne contient pas de choix valides : " +
          JSON.stringify(data)
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content }),
    };
  } catch (error) {
    console.error("Erreur avec l'API OpenAI :", error.message, error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Erreur lors de l'appel à l'API OpenAI : ${error.message}`,
      }),
    };
  }
}
