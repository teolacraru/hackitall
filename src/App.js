import './App.css';

import React, { useState, useEffect } from 'react';
import ChildUI from './ChildUI';
import PartnerUI from './PartnerUI';

const DEFAULT_RECEIVER = 'Parent';
const DEFAULT_SENDER = 'Child';

function App() {
  const [role, setRole] = useState(null);
  const [messagesByReceiver, setMessagesByReceiver] = useState(() => {
    const saved = localStorage.getItem('aac-messages');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('aac-messages', JSON.stringify(messagesByReceiver));
  }, [messagesByReceiver]);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'aac-messages') {
        const newMessages = JSON.parse(e.newValue);
        setMessagesByReceiver(newMessages);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const sendMessage = (to, content) => {
    setMessagesByReceiver((prev) => ({
      ...prev,
      [to]: [...(prev[to] || []), content]
    }));
  };

  if (!role) {
	return (
	  <div className="app-container">
		<img
        src="logo.png"
        alt="Choose your role"
        style={{ width: '300px', marginBottom: '2rem' }}
      />
		<div className="button-group">
		  <button className="user-button" onClick={() => setRole('child')}>Child</button>
		  <button
			className="user-button"
			style={{ backgroundColor: '#4f89b5' }}
			onClick={() => setRole('partner')}
			>
			Parent
			</button>
		</div>
	  </div>
	);
  }


  return role === 'child' ? (
    <ChildUI
      receiver={DEFAULT_RECEIVER}
      sendMessage={sendMessage}
      messages={messagesByReceiver[DEFAULT_RECEIVER] || []}
    />
  ) : (
    <PartnerUI
      receiver={DEFAULT_SENDER}
      messages={messagesByReceiver[DEFAULT_RECEIVER] || []}
    />
  );
}

export default App;
