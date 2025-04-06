import React, { useState, useEffect } from 'react';
import {generateSentenceFromWords} from './api/words_to_sentence.js'  // Importing the function to convert words to sentences
import {reduceSentenceToKnownWords} from './api/sentence_to_words.js' // Importing the function to reduce sentences to known words

const vocabularyByCategory = {
	Actions: [
	  { word: 'want', emoji: '👐' },
	  { word: 'play', emoji: '⚽' },
	  { word: 'eat', emoji: '🍽️' },
	  { word: 'drink', emoji: '🥤' },
	  { word: 'sleep', emoji: '😴' },
	  { word: 'read', emoji: '📖' },
	  { word: 'run', emoji: '🏃' },
	  { word: 'watch', emoji: '👀' },
	  { word: 'draw', emoji: '🖍️' },
	  { word: 'dance', emoji: '💃' },
	],
	Needs: [
	  { word: 'water', emoji: '💧' },
	  { word: 'bathroom', emoji: '🚽' },
	  { word: 'help', emoji: '🆘' },
	  { word: 'food', emoji: '🍕' },
	  { word: 'medicine', emoji: '💊' },
	  { word: 'hug', emoji: '🤗' },
	  { word: 'break', emoji: '⏸️' },
	  { word: 'sleep', emoji: '🛌' },
	  { word: 'toy', emoji: '🧸' },
	  { word: 'blanket', emoji: '🛏️' },
	],
	Places: [
	  { word: 'outside', emoji: '🌳' },
	  { word: 'home', emoji: '🏠' },
	  { word: 'school', emoji: '🏫' },
	  { word: 'park', emoji: '🏞️' },
	  { word: 'kitchen', emoji: '🍽️' },
	  { word: 'bathroom', emoji: '🚻' },
	  { word: 'bedroom', emoji: '🛏️' },
	  { word: 'hospital', emoji: '🏥' },
	  { word: 'store', emoji: '🏪' },
	  { word: 'car', emoji: '🚗' },
	],
	People: [
	  { word: 'I', emoji: '👦' },
	  { word: 'mom', emoji: '👩' },
	  { word: 'dad', emoji: '👨' },
	  { word: 'sister', emoji: '👧' },
	  { word: 'brother', emoji: '👦' },
	  { word: 'teacher', emoji: '🧑‍🏫' },
	  { word: 'friend', emoji: '🧑‍🤝‍🧑' },
	  { word: 'grandma', emoji: '👵' },
	  { word: 'grandpa', emoji: '👴' },
	  { word: 'nurse', emoji: '🧑‍⚕️' },
	],
  };

function PartnerUI({ receiver, sendMessage, messages, mode, onExit }) {
  const [seqPhrase, setSeqPhrase] = useState([]);
  const [manualSentence, setManualSentence] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sentMessages, setSentMessages] = useState([]);

  const [localMessages, setLocalMessages] = useState([]);
  const sendPhrase = async () => {
	let phrase;
	console.log('Sending phrase:', seqPhrase, manualSentence);
	if (manualSentence.trim().length > 0) {
		const reducedWords = await reduceSentenceToKnownWords(manualSentence.trim());
		phrase = reducedWords.join(' ');
	} else if (seqPhrase.length > 0) {
		phrase = seqPhrase.join(' ');
	} else {
		return; // nimic de trimis
	}

	sendMessage(receiver, phrase);
	setSentMessages((prev) => [...prev, phrase]);
	setManualSentence('');
	setSeqPhrase([]);  };


  useEffect(() => {
	if (mode === 'receive') {
	  const stored = localStorage.getItem('aac-messages');
	  if (stored) {
		const parsed = JSON.parse(stored);
		setLocalMessages(parsed['Parent'] || []);
	  }
	}
  }, [mode, receiver]);

  const addWord = (word) => {
    setSeqPhrase([...seqPhrase, word]);
  };

  if (mode === 'receive') {
	console.log('Received messages:', localMessages);
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
          {localMessages.length === 0 ? (
            <p style={{ fontStyle: 'italic', color: '#888' }}>No messages yet.</p>
          ) : (
            localMessages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: 'flex-end',
                backgroundColor: '#cce5ff',
                padding: '0.8rem 1.2rem',
                borderRadius: '16px',
                maxWidth: '70%',
                fontSize: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
				<div key={i}>
					<p><strong>Original:</strong> {msg.original.join(' ')}</p>
					<p><strong>Sentence:</strong> {msg.sentence}</p>
				</div>
              <div style={{ fontStyle: 'italic', color: '#555' }}>
              </div>
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
		<h4>Or write a sentence manually:</h4>
		<input
			type="text"
			value={manualSentence}
			onChange={(e) => setManualSentence(e.target.value)}
			placeholder="Type your sentence here..."
			style={{
			padding: '0.5rem',
			width: '80%',
			fontSize: '1rem',
			borderRadius: '8px',
			border: '1px solid #ccc',
			}}
		/>
		</div>


      <div style={{ marginTop: '2rem' }}>
        <strong>Preview:</strong> {manualSentence || seqPhrase.join(' ')}
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