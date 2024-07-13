import React, { useState, useEffect } from 'react';

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

const FriddsArtChallenge = () => {
  const [pattern, setPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    generatePattern();
  };

  const generatePattern = () => {
    const newPattern = [...pattern, colors[Math.floor(Math.random() * colors.length)]];
    setPattern(newPattern);
    playPattern(newPattern);
  };

  const playPattern = (patternToPlay) => {
    patternToPlay.forEach((color, index) => {
      setTimeout(() => {
        flashColor(color);
      }, (index + 1) * 600);
    });
  };

  const flashColor = (color) => {
    const element = document.getElementById(color);
    element.style.opacity = '1';
    setTimeout(() => {
      element.style.opacity = '0.6';
    }, 300);
  };

  const handleColorClick = (color) => {
    if (gameOver) return;

    const newUserPattern = [...userPattern, color];
    setUserPattern(newUserPattern);

    if (newUserPattern[newUserPattern.length - 1] !== pattern[newUserPattern.length - 1]) {
      setGameOver(true);
      return;
    }

    if (newUserPattern.length === pattern.length) {
      if (newUserPattern.length === level + 2) {
        setLevel(level + 1);
        setUserPattern([]);
        setTimeout(generatePattern, 1000);
      } else {
        setUserPattern([]);
        setTimeout(() => playPattern(pattern), 1000);
      }
    }
  };

  const restartGame = () => {
    setPattern([]);
    setUserPattern([]);
    setLevel(1);
    setGameOver(false);
    startGame();
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#F7B801', borderRadius: '15px', color: 'white' }}>
      <h2>Fridds's Art Challenge</h2>
      <p>Level: {level}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', maxWidth: '300px', margin: '20px auto' }}>
        {colors.map(color => (
          <div
            key={color}
            id={color}
            onClick={() => handleColorClick(color)}
            style={{
              backgroundColor: color,
              height: '100px',
              cursor: 'pointer',
              opacity: 0.6,
              transition: 'opacity 0.3s'
            }}
          />
        ))}
      </div>
      {gameOver && (
        <div>
          <h3>Game Over! You reached level {level}</h3>
          <button onClick={restartGame} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default FriddsArtChallenge;