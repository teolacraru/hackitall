// ChildUI.js
// import React, { useState } from 'react';

// const vocabularyByCategory = {
//   Actions: [
//     { word: 'want', emoji: '👐' },
//     { word: 'play', emoji: '⚽' },
//     { word: 'eat', emoji: '🍽️' },
//   ],
//   Needs: [
//     { word: 'water', emoji: '💧' },
//     { word: 'bathroom', emoji: '🚽' },
//     { word: 'help', emoji: '🆘' },
//   ],
//   Places: [
//     { word: 'outside', emoji: '🌳' },
//     { word: 'home', emoji: '🏠' },
//     { word: 'school', emoji: '🏫' },
//   ],
//   People: [
//     { word: 'I', emoji: '👦' },
//     { word: 'mom', emoji: '👩' },
//     { word: 'dad', emoji: '👨' },
//   ],
// };

// function ChildUI({ receiver, sendMessage, messages, mode }) {
//   const [localPhrase, setLocalPhrase] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [sentMessages, setSentMessages] = useState([]);

//   const addWord = (word) => {
//     setLocalPhrase([...localPhrase, word]);
//   };

//   const sendPhrase = () => {
//     const phrase = localPhrase.join(' ');
//     sendMessage(receiver, phrase);
//     setSentMessages((prev) => [...prev, phrase]);
//     setLocalPhrase([]);
//   };

//   const getEmojiForWord = (word) => {
//     const allWords = Object.values(vocabularyByCategory).flat();
//     const match = allWords.find((entry) => entry.word === word);
//     return match ? match.emoji : '❓';
//   };

//   if (mode === 'receive') {
//     return (
//       <div style={{
//         maxWidth: '500px',
//         margin: '2rem auto',
//         border: '1px solid #ccc',
//         borderRadius: '16px',
//         padding: '1rem',
//         backgroundColor: '#f9f9f9',
//         fontFamily: 'Arial, sans-serif',
//         minHeight: '80vh'
//       }}>
//         <h2 style={{ marginBottom: '1rem' }}>Messages with {receiver}</h2>

//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '0.75rem'
//         }}>
//           {messages.length === 0 ? (
//             <p style={{ fontStyle: 'italic', color: '#888' }}>No messages yet.</p>
//           ) : (
//             messages.map((msg, i) => (
//               <div key={i} style={{
//                 alignSelf: 'flex-end',
//                 backgroundColor: '#cce5ff',
//                 padding: '0.8rem 1.2rem',
//                 borderRadius: '16px',
//                 maxWidth: '80%',
//                 fontSize: '1rem',
//                 boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                 display: 'flex',
//                 gap: '0.5rem',
//                 flexWrap: 'wrap',
//                 justifyContent: 'flex-end'
//               }}>
//                 {msg.split(' ').map((word, j) => (
//                   <div key={j} style={{ textAlign: 'center' }}>
//                     <div style={{ fontSize: '1.5rem' }}>{getEmojiForWord(word)}</div>
//                     <div style={{ fontSize: '0.8rem' }}>{word}</div>
//                   </div>
//                 ))}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: '1rem', textAlign: 'center' }}>
//       <h3>AAC Child Communicator</h3>
//       <p>Sending to: <strong>{receiver}</strong></p>

//       {/* 🔹 CATEGORII CU IMAGINI */}
//       <div style={{ margin: '1rem 0', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
//         {Object.keys(vocabularyByCategory).map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             style={{
//               backgroundColor: selectedCategory === cat ? '#d0f0d0' : 'transparent',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               padding: 0,
//             }}
//           >
//             <img
//               src={`/${cat.toLowerCase()}.png`}
//               alt={cat}
//               style={{
//                 width: '80px',
//                 height: '80px',
//                 objectFit: 'contain',
//                 border: selectedCategory === cat ? '2px solid #4caf50' : '2px solid transparent',
//                 borderRadius: '8px',
//               }}
//             />
//           </button>
//         ))}
//       </div>

//       {/* 🔹 CUVINTE DIN CATEGORIE */}
//       {selectedCategory && (
//         <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
//           {vocabularyByCategory[selectedCategory].map((item) => (
//             <button
//               key={item.word}
//               onClick={() => addWord(item.word)}
//               style={{
//                 padding: '1rem',
//                 fontSize: '1.2rem',
//                 border: '1px solid #ccc',
//                 borderRadius: '10px',
//                 width: '90px',
//                 height: '90px',
//               }}
//             >
//               {item.emoji} <br /> {item.word}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* 🔹 Preview + Send */}
//       <div style={{ marginTop: '2rem' }}>
//         <strong>Preview:</strong> {localPhrase.join(' ')}
//       </div>
//       <button onClick={sendPhrase} style={{ marginTop: '1rem' }}>
//         Send
//       </button>

//       {/* 🔹 Mesaje trimise */}
//       <div style={{ marginTop: '2rem' }}>
//         <h4>Sent Messages:</h4>
//         {sentMessages.length === 0 ? (
//           <p>No messages yet.</p>
//         ) : (
//           sentMessages.map((msg, i) => <p key={i}>💬 {msg}</p>)
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChildUI;

// ChildUI.js
import React, { useState, useEffect } from 'react';
import {generateSentenceFromWords} from './api/words_to_sentence.js'  // Importing the function to convert words to sentences


const vocabularyByCategory = {
  Actions: [
    { word: 'want', emoji: '👐' },
    { word: 'play', emoji: '⚽' },
    { word: 'eat', emoji: '🍽️' },
  ],
  Needs: [
    { word: 'water', emoji: '💧' },
    { word: 'bathroom', emoji: '🚽' },
    { word: 'help', emoji: '🆘' },
  ],
  Places: [
    { word: 'outside', emoji: '🌳' },
    { word: 'home', emoji: '🏠' },
    { word: 'school', emoji: '🏫' },
  ],
  People: [
    { word: 'I', emoji: '👦' },
    { word: 'mom', emoji: '👩' },
    { word: 'dad', emoji: '👨' },
  ],
};

function ChildUI({ receiver, sendMessage, messages, mode, onExit }) {
  const [localPhrase, setLocalPhrase] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sentMessages, setSentMessages] = useState([]);

  const addWord = (word) => {
    setLocalPhrase([...localPhrase, word]);
  };

  const sendPhrase = async () => {
	if (localPhrase.length === 0) return;

	const sentence = await generateSentenceFromWords(localPhrase);

	const fullMessage = {
	  original: [...localPhrase],
	  sentence: sentence || "Generating..."
	};

	sendMessage(receiver, fullMessage);
	setSentMessages((prev) => [...prev, fullMessage]);
	setLocalPhrase([]);
  };

  const getEmojiForWord = (word) => {
    const allWords = Object.values(vocabularyByCategory).flat();
    const match = allWords.find((entry) => entry.word === word);
    return match ? match.emoji : '❓';
  };

  if (mode === 'receive') {
    return (
      <div style={{
        maxWidth: '500px',
        margin: '2rem auto',
        border: '1px solid #ccc',
        borderRadius: '16px',
        padding: '1rem',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
        minHeight: '80vh',
        position: 'relative'
      }}>
        {onExit && (
          <button
            onClick={onExit}
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >⬅</button>
        )}

        <h2 style={{ marginBottom: '1rem' }}>Messages with {receiver}</h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {messages.length === 0 ? (
            <p style={{ fontStyle: 'italic', color: '#888' }}>No messages yet.</p>
          ) : (
            messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: 'flex-end',
                backgroundColor: '#cce5ff',
                padding: '0.8rem 1.2rem',
                borderRadius: '16px',
                maxWidth: '80%',
                fontSize: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: 'flex-end'
              }}>
                {msg.split(' ').map((word, j) => (
                  <div key={j} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem' }}>{getEmojiForWord(word)}</div>
                    <div style={{ fontSize: '0.8rem' }}>{word}</div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem', textAlign: 'center', position: 'relative' }}>
      {onExit && (
        <button
          onClick={onExit}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >⬅</button>
      )}

      <h3>AAC Child Communicator</h3>
      <p>Sending to: <strong>{receiver}</strong></p>

      {/* 🔹 CATEGORII CU IMAGINI */}
      <div style={{ margin: '1rem 0', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
        {Object.keys(vocabularyByCategory).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              backgroundColor: selectedCategory === cat ? '#d0f0d0' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <img
              src={`/${cat.toLowerCase()}.png`}
              alt={cat}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain',
                border: selectedCategory === cat ? '2px solid #4caf50' : '2px solid transparent',
                borderRadius: '8px',
              }}
            />
          </button>
        ))}
      </div>

      {/* 🔹 CUVINTE DIN CATEGORIE */}
      {selectedCategory && (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {vocabularyByCategory[selectedCategory].map((item) => (
            <button
              key={item.word}
              onClick={() => addWord(item.word)}
              style={{
                padding: '1rem',
                fontSize: '1.2rem',
                border: '1px solid #ccc',
                borderRadius: '10px',
                width: '90px',
                height: '90px',
              }}
            >
              {item.emoji} <br /> {item.word}
            </button>
          ))}
        </div>
      )}

      {/* 🔹 Preview + Send */}
      <div style={{ marginTop: '2rem' }}>
        <strong>Preview:</strong> {localPhrase.join(' ')}
      </div>
      <button onClick={sendPhrase} style={{ marginTop: '1rem' }}>
        Send
      </button>

      {/* 🔹 Mesaje trimise */}
      <div style={{ marginTop: '2rem' }}>
        <h4>Sent Messages:</h4>
        {sentMessages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          sentMessages.map((msg, i) => <p key={i}>💬 {msg}</p>)
        )}
      </div>
    </div>
  );
}

export default ChildUI;
