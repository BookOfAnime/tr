
import React from 'react';

const MemesSection = () => (
  <div>
    <h2 style={{ color: '#00A5E3', textAlign: 'center', margin: '20px 0' }}>Cartoon Network Memes</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
      {[1, 2, 3, 4].map((meme) => (
        <div key={meme} style={{
          backgroundColor: '#2C2C2C',
          height: '250px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
        }}>
          Meme {meme}
        </div>
      ))}
    </div>
  </div>
);

export default MemesSection;