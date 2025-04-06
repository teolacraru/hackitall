import OpenAI from "openai";

// Tokenul tău de acces API
const token = "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";

const knownWords = [
	// People
	"I",
	"mom",
	"dad",
	"sister",
	"brother",
	"teacher",
	"friend",
	"grandma",
	"grandpa",
	"nurse",

	// Actions
	"want",
	"play",
	"eat",
	"drink",
	"sleep",
	"read",
	"run",
	"watch",
	"draw",
	"dance",

	// Needs
	"water",
	"bathroom",
	"help",
	"food",
	"medicine",
	"hug",
	"break",
	"sleep", // deja apare la Actions, dar lăsăm pentru claritate
	"toy",
	"blanket",

	// Places
	"outside",
	"home",
	"school",
	"park",
	"kitchen",
	"bathroom", // deja apare la Needs
	"bedroom",
	"hospital",
	"store",
	"car"
  ];


export async function reduceSentenceToKnownWords(sentence) {
  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
	dangerouslyAllowBrowser: true
  });

  const prompt = `
You are an AAC assistant helping a child with autism communicate using a limited set of known words.

Given the sentence:
"${sentence}"

And the list of words the child knows:
${JSON.stringify(knownWords)}

Your task is to rewrite the sentence using only the known words, or close approximations, to best preserve the original meaning.

Try to use semantically similar words (e.g., "go" → "walk", "mother" → "mum", "inside" → "home").

Output only a valid JSON array of words that the child knows, in a meaningful order that represents the original sentence.

If no words apply, return an empty array. Never return null or undefined.
`;

  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful and intelligent AAC assistant that simplifies input sentences using only a restricted vocabulary. Use only the given known words or semantically close alternatives."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "gpt-4o",
    temperature: 0.2,
    max_tokens: 100,
    top_p: 1
  });

  const output = response.choices[0].message.content;
  let extractedWords = [];
  try {
    // Încercăm să îl parsăm ca JSON
    extractedWords = JSON.parse(output);
  } catch (e) {
    // Dacă nu e formatat perfect, folosim un fallback simplu
    extractedWords = output
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/[\[\]"]/g, "")
      .split(",")
      .map(word => word.trim())
      .filter(word => knownWords.includes(word));
  }

  console.log("✅ Final result as string array:", extractedWords);
  return extractedWords;
}
