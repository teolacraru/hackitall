import React from 'react';

function PartnerUI({ messages, receiver }) {
  return (
    <div style={{
      maxWidth: '500px',
      margin: '2rem auto',
      border: '1px solid #ccc',
      borderRadius: '16px',
      padding: '1rem',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
      minHeight: '80vh'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>Messages from {receiver}</h2>

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
              alignSelf: 'flex-start',
              backgroundColor: '#e0e0e0',
              padding: '0.8rem 1.2rem',
              borderRadius: '18px',
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

export default PartnerUI;
