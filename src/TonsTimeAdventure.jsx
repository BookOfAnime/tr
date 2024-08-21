import React, { useState, useEffect } from 'react';

const TonsTimeAdventure = () => {
  const [time, setTime] = useState(60);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [targetTime, setTargetTime] = useState(null);

  useEffect(() => {
    if (time > 0 && !gameOver) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      setGameOver(true);
    }
  }, [time, gameOver]);

  useEffect(() => {
    if (!gameOver) {
      generateNewTarget();
    }
  }, [gameOver]);

  const generateNewTarget = () => {
    setTargetTime(Math.floor(Math.random() * 60));
  };

  const handleClockClick = () => {
    if (gameOver) return;
    
    if (Math.abs(time - targetTime) <= 3) {
      setScore(score + 1);
      generateNewTarget();
    } else {
      setScore(Math.max(0, score - 1));
    }
  };

  const restartGame = () => {
    setTime(60);
    setScore(0);
    setGameOver(false);
    generateNewTarget();
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#45B7D1', borderRadius: '15px', color: 'white' }}>
      <h2>TRons' Time Adventure</h2>
      <p>Score: {score}</p>
      <p>Time Left: {time}</p>
      {!gameOver && <p>Set the clock to: {targetTime}</p>}
      <div 
        onClick={handleClockClick}
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: 'white',
          margin: '20px auto',
          position: 'relative',
          cursor: 'pointer'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            height: '80px',
            width: '6px',
            backgroundColor: 'black',
            transformOrigin: 'bottom',
            transform: `translate(-50%, -100%) rotate(${time * 6}deg)`
          }}
        />
      </div>
      {gameOver && (
        <div>
          <h3>Game Over! Final Score: {score}</h3>
          <button onClick={restartGame} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TonsTimeAdventure;