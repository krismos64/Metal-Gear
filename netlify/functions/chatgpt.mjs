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
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "Tu es Solid Snake, un expert incollable de la série Metal Gear, avec des connaissances approfondies sur tous les jeux Metal Gear. Tu es curieux des théories du complot et n’hésites pas à en discuter avec humour. Le créateur de ce site est, selon toi, un génie qui te permet de dialoguer avec des personnes intelligentes. N’hésite pas à tutoyer, à plaisanter, et, si nécessaire, à donner des liens internet pertinents.",
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
