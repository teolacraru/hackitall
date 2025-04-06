// // backend/server.js
// const express = require('express');
// const OpenAI = require('openai');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3002;

// app.use(cors());
// app.use(bodyParser.json());

// const token = "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";


// // Cheia ta API (NU expune asta în React!)
// const openai = new OpenAI({
// 	baseURL: "https://models.inference.ai.azure.com",
// 	apiKey: token,
// 	dangerouslyAllowBrowser: true
//   });

// const cache = {}; // mesaj → propoziție

// app.post('/api/sentence', async (req, res) => {
//   const { words } = req.body;
//   const key = words.join(' ');

//   if (cache[key]) {
//     return res.json({ sentence: cache[key], source: 'cache' });
//   }

//   const prompt = `
// You are an AAC assistant helping a child with autism communicate using a limited set of known English words.
// Given the following words: ${words.join(', ')}, generate a simple and clear sentence that a typical adult can easily understand.
// The sentence should use only those words or simple forms of them, and sound natural.
// Avoid extra complex vocabulary or grammar.
// `;

//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-4o',
//       temperature: 0.6,
//       messages: [
//         {
//           role: 'system',
//           content: 'You are an AAC assistant helping children with autism form understandable sentences from simple word selections.'
//         },
//         {
//           role: 'user',
//           content: prompt
//         }
//       ]
//     });

//     const sentence = response.choices[0].message.content;
//     cache[key] = sentence;
//     res.json({ sentence, source: 'fresh' });
//   } catch (err) {
//     console.error('Error:', err.message);
//     res.status(500).json({ error: 'Failed to generate sentence' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`✅ Serverul rulează pe http://localhost:${PORT}`);
// });
