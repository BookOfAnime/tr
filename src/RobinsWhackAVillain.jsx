import React, { useState, useEffect } from 'react';

const RobinsWhackAVillain = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeVillain, setActiveVillain] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameOver) {
      const timerId = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            clearInterval(timerId);
            setGameOver(true);
            return 0;
          }
          return time - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [gameOver]);

  useEffect(() => {
    if (!gameOver) {
      const villainInterval = setInterval(() => {
        const newVillain = Math.floor(Math.random() * 9);
        setActiveVillain(newVillain);
        setTimeout(() => setActiveVillain(null), 800);
      }, 1000);

      return () => clearInterval(villainInterval);
    }
  }, [gameOver]);

  const whackVillain = (index) => {
    if (index === activeVillain) {
      setScore(score + 1);
      setActiveVillain(null);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setActiveVillain(null);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Robin's Whack-a-Villain</h2>
      <div style={{ marginBottom: '20px' }}>
        <p>Score: {score} | Time Left: {timeLeft}s</p>
      </div>
      {!gameOver ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', maxWidth: '300px', margin: 'auto' }}>
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              onClick={() => whackVillain(index)}
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: activeVillain === index ? '#ff4500' : '#4169e1',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '24px',
              }}
            >
              {activeVillain === index ? '😈' : ''}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3>Game Over!</h3>
          <p>Your final score: {score}</p>
          <button onClick={resetGame} style={{ padding: '10px 20px', backgroundColor: '#32cd32', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default RobinsWhackAVillain;