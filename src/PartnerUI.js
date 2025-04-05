import React from 'react';

function PartnerUI({ messages, receiver }) {
  return (
    <div style={{ fontSize: '1.5rem', border: '1px solid #ccc', padding: '1rem' }}>
  {messages.length === 0 ? (
    <p>No messages yet.</p>
  ) : (
    messages.map((msg, i) => <p key={i}>📩 {msg}</p>)
  )}
</div>

  );
}

export default PartnerUI;
