import React, { useState } from 'react';

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

function ChildUI({ receiver, sendMessage, messages }) {
  const [localPhrase, setLocalPhrase] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const addWord = (word) => {
    setLocalPhrase([...localPhrase, word]);
  };

  const sendPhrase = () => {
    const phrase = localPhrase.join(' ');
    sendMessage(receiver, phrase);
    setLocalPhrase([]);
  };

  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h3>AAC Communicator</h3>
      <p>Sending to: <strong>{receiver}</strong></p>

      {/* 🔹 CATEGORII */}
      <div style={{ margin: '1rem 0', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
        {Object.keys(vocabularyByCategory).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selectedCategory === cat ? '#4caf50' : '#e0e0e0',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {cat}
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
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, i) => <p key={i}>💬 {msg}</p>)
        )}
      </div>
    </div>
  );
}

export default ChildUI;
