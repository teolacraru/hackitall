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

// function PartnerUI({ receiver, sendMessage, messages, mode }) {
//   const [localPhrase, setLocalPhrase] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [sentMessages, setSentMessages] = useState([]);

//   const addWord = (word) => {
//     setLocalPhrase([...localPhrase, word]);
//   };

//   const sendPhrase = () => {
//     const phrase = localPhrase.join(' ');
//     sendMessage(receiver, phrase); // trimite și salvează la receiver
//     setSentMessages((prev) => [...prev, phrase]);
//     setLocalPhrase([]);
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
// 				alignSelf: 'flex-end',
//                 backgroundColor: i % 2 === 0 ? '#e0e0e0' : '#cce5ff',
//                 padding: '0.8rem 1.2rem',
//                 borderRadius: '16px',
//                 maxWidth: '70%',
//                 fontSize: '1rem',
//                 boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//               }}>
//                 {msg}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: '1rem', textAlign: 'center' }}>
//       <h3>AAC Partner Communicator</h3>
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

// export default PartnerUI;

// PartnerUI.js
import React, { useState } from 'react';

const vocabularyByCategory = {
  Actions: [
    { word: 'look', emoji: '👀' },
    { word: 'listen', emoji: '👂' },
    { word: 'come', emoji: '👋' },
  ],
  Needs: [
    { word: 'break', emoji: '⏸️' },
    { word: 'food', emoji: '🍎' },
    { word: 'rest', emoji: '🛏️' },
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

function PartnerUI({ receiver, sendMessage, messages, mode, onExit }) {
  const [localPhrase, setLocalPhrase] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sentMessages, setSentMessages] = useState([]);

  const addWord = (word) => {
    setLocalPhrase([...localPhrase, word]);
  };

  const sendPhrase = () => {
    const phrase = localPhrase.join(' ');
    sendMessage(receiver, phrase);
    setSentMessages((prev) => [...prev, phrase]);
    setLocalPhrase([]);
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
                backgroundColor: i % 2 === 0 ? '#e0e0e0' : '#cce5ff',
                padding: '0.8rem 1.2rem',
                borderRadius: '16px',
                maxWidth: '70%',
                fontSize: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {msg}
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

      <h3>AAC Partner Communicator</h3>
      <p>Sending to: <strong>{receiver}</strong></p>

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

      <div style={{ marginTop: '2rem' }}>
        <strong>Preview:</strong> {localPhrase.join(' ')}
      </div>
      <button onClick={sendPhrase} style={{ marginTop: '1rem' }}>
        Send
      </button>

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

export default PartnerUI;