import React, { useState, useEffect } from 'react';

const CARDS = ['🧪', '🔬', '🧬', '🧠', '⚗️', '🤖', '👾', '🚀'];

const DextersMemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
  };

  const handleClick = (id) => {
    if (disabled) return;
    if (flipped.length === 0) {
      setFlipped([id]);
    } else if (flipped.length === 1) {
      setDisabled(true);
      if (flipped[0] !== id) {
        setFlipped([flipped[0], id]);
        checkMatch(flipped[0], id);
      } else {
        setDisabled(false);
      }
    }
  };

  const checkMatch = (id1, id2) => {
    if (cards[id1].symbol === cards[id2].symbol) {
      setSolved([...solved, cards[id1].symbol]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const isFlipped = (id) => flipped.includes(id) || solved.includes(cards[id].symbol);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Dexter's Laboratory Memory Game</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', maxWidth: '400px', margin: 'auto' }}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleClick(card.id)}
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: isFlipped(card.id) ? '#ff4500' : '#4169e1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            {isFlipped(card.id) ? card.symbol : '?'}
          </div>
        ))}
      </div>
      {solved.length === CARDS.length && (
        <div style={{ marginTop: '20px' }}>
          <h3>Congratulations! You've matched all the cards!</h3>
          <button onClick={initializeGame} style={{ padding: '10px 20px', backgroundColor: '#32cd32', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default DextersMemoryGame;