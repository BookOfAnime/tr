import React from 'react';

const LinksSection = () => (
  <div>
    <h2 style={{ color: '#00A5E3', textAlign: 'center', margin: '20px 0' }}>Useful Links</h2>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {['Official Cartoon Network Site', 'CN YouTube Channel', 'CN Store', 'CN Apps'].map((link, index) => (
        <li key={index} style={{
          backgroundColor: '#2C2C2C',
          margin: '10px 0',
          padding: '15px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}>
          {link}
        </li>
      ))}
    </ul>
  </div>
);

export default LinksSection;