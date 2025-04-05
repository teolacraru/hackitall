import './App.css';

import React, { useState, useEffect } from 'react';
import ChildUI from './ChildUI';
import PartnerUI from './PartnerUI';

const DEFAULT_RECEIVER = 'Parent';
const DEFAULT_SENDER = 'Child';

function App() {
  const [role, setRole] = useState(null);
  const [childPage, setChildPage] = useState(null);
  const [partnerPage, setPartnerPage] = useState(null);
  const [messagesByReceiver, setMessagesByReceiver] = useState(() => {
    const saved = localStorage.getItem('aac-messages');
    return saved ? JSON.parse(saved) : {};
  });
  const messagetoChild = messagesByReceiver['Child'] || [];
  const messagetoParent = messagesByReceiver['Parent'] || [];
  console.log('Messages to Child:', messagetoChild);

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

//   if (role === 'child' && !childPage) {
//     return (
//       <div style={{ textAlign: 'center', marginTop: '3rem' }}>
//         <h2>What would you like to do?</h2>
//         <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
//           <button onClick={() => setChildPage('compose')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
//             <img src="/compose.png" alt="Compose" style={{ width: '120px', height: '120px' }} />
//             <div>Compose Message</div>
//           </button>
//           <button onClick={() => setChildPage('receive')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
//             <img src="/receive.png" alt="Receive" style={{ width: '120px', height: '120px' }} />
//             <div>Receive Message</div>
//           </button>
//         </div>
//       </div>
//     );
//   }

if (role === 'child' && !childPage) {
	return (
	  <div style={{ textAlign: 'center', marginTop: '3rem', position: 'relative' }}>
		<button
		  onClick={() => setRole(null)}
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

		<h2>What would you like to do?</h2>
		<div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
		  <button onClick={() => setChildPage('compose')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
			<img src="/compose.png" alt="Compose" style={{ width: '120px', height: '120px' }} />
			<div>Compose Message</div>
		  </button>
		  <button onClick={() => setChildPage('receive')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
			<img src="/receive.png" alt="Receive" style={{ width: '120px', height: '120px' }} />
			<div>Receive Message</div>
		  </button>
		</div>
	  </div>
	);
  }


  if (role === 'child' && childPage === 'compose') {
    return (
      <ChildUI
        receiver="Parent"
        sendMessage={sendMessage}
        messages={messagesByReceiver['Parent'] || []}
        mode="compose"
		onExit={() => setChildPage(null)}
      />
		// <ChildUI
		// receiver="Parent"
		// sendMessage={sendMessage}
		// messages={messagesByReceiver['Parent'] || []}
		// mode="compose"
		// onExit={() => setChildPage(null)}
	// />
    );
  }

  if (role === 'child' && childPage === 'receive') {
    return (
      <ChildUI
        receiver="Parent"
        messages={messagesByReceiver['Child'] || []}
        mode="receive"
		onExit={() => setChildPage(null)}
      />
		// <ChildUI
		// receiver="Parent"
		// messages={messagesByReceiver['Child'] || []}
		// mode="receive"
		// onExit={() => setChildPage(null)}
		// />
    );
  }

//   if (role === 'partner' && !partnerPage) {
//     return (
//       <div style={{ textAlign: 'center', marginTop: '3rem' }}>
//         <h2>What would you like to do?</h2>
//         <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
//           <button onClick={() => setPartnerPage('compose')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
//             <img src="/compose.png" alt="Compose" style={{ width: '120px', height: '120px' }} />
//             <div>Compose Message</div>
//           </button>
//           <button onClick={() => setPartnerPage('receive')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
//             <img src="/receive.png" alt="Receive" style={{ width: '120px', height: '120px' }} />
//             <div>Receive Message</div>
//           </button>
//         </div>
//       </div>
//     );
//   }

if (role === 'partner' && !partnerPage) {
	return (
	  <div style={{ textAlign: 'center', marginTop: '3rem', position: 'relative' }}>
		<button
		  onClick={() => setRole(null)}
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

		<h2>What would you like to do?</h2>
		<div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
		  <button onClick={() => setPartnerPage('compose')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
			<img src="/compose.png" alt="Compose" style={{ width: '120px', height: '120px' }} />
			<div>Compose Message</div>
		  </button>
		  <button onClick={() => setPartnerPage('receive')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
			<img src="/receive.png" alt="Receive" style={{ width: '120px', height: '120px' }} />
			<div>Receive Message</div>
		  </button>
		</div>
	  </div>
	);
  }


  if (role === 'partner' && partnerPage === 'compose') {
    return (
		<PartnerUI
		receiver={DEFAULT_SENDER}
		sendMessage={sendMessage}
		messages={messagesByReceiver[DEFAULT_RECEIVER] || []}
		mode="compose"
		onExit={() => setPartnerPage(null)}
	  />
    );
  }

  if (role === 'partner' && partnerPage === 'receive') {
    return (
		<PartnerUI
		receiver={DEFAULT_SENDER}
		messages={messagesByReceiver[DEFAULT_RECEIVER] || []}
		mode="receive"
		onExit={() => setPartnerPage(null)}
	  />
    );
  }

  return null;
}

export default App;
