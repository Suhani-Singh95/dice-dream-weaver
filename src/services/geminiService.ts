
interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
  error?: {
    message: string;
  };
}

export async function queryGemini(prompt: string, apiKey: string): Promise<string> {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a D&D character creation assistant. Only answer questions related to D&D character creation, classes, races, abilities, spells, backgrounds, and game mechanics. If asked about topics outside of D&D character creation, politely decline to answer and redirect the conversation back to D&D character creation. 

Current query: ${prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    const data: GeminiResponse = await response.json();

    if (data.error) {
      return `Error: ${data.error.message}`;
    }

    if (!data.candidates || data.candidates.length === 0) {
      return "Sorry, I couldn't generate a response. Please try again.";
    }

    const reply = data.candidates[0].content.parts[0].text;
    return reply;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, there was an error communicating with the AI service. Please try again later.";
  }
}
