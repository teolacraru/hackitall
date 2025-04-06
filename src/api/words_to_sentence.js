import OpenAI from "openai";

// Replace this with your real API token
const token = "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";

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
  }

export async function generateSentenceFromWords(words) {
  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
	dangerouslyAllowBrowser: true
  });
  await delay(1000);
  // 🎯 Prompt adaptat pentru AAC assistant
  const prompt = `
You are an AAC assistant helping a child with autism communicate using a limited set of known English words.
Given the following words: ${words.join(", ")}, generate a simple and clear sentence that a typical adult can easily understand.
The sentence should use only those words or simple forms of them, and sound natural.
Avoid extra complex vocabulary or grammar.
`;

  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an AAC assistant helping children with autism form understandable sentences from simple word selections."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "gpt-4o",
    temperature: 0.6,
    max_tokens: 100,
    top_p: 1
  });

  console.log("🧒 AAC-style sentence:");
  console.log(response.choices[0].message.content);
  return response.choices[0].message.content;
}
