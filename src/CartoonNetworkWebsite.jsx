import React, { useState, useEffect } from 'react';
import DextersMemoryGame from './DextersMemoryGame';
import RobinsWhackAVillain from './RobinsWhackAVillain';

const characters = [
  { name: "Ruben", image: "/ruben.png" },
  { name: "Tons", image: "/Tons.png" },
  { name: "Doxter", image: "/Doxter.png" },
  { name: "Fridd", image: "/Fridd.png" }
];

const games = [
  { name: "Doxter's Lab Puzzle", image: "/Doxter.png", color: "#FF6B6B", component: DextersMemoryGame },
  { name: "Ruben's Whack-a-Villain", image: "/ruben.png", color: "#4ECDC4", component: RobinsWhackAVillain },
  { name: "Tons' Time Adventure", image: "/Tons.png", color: "#45B7D1" },
  { name: "Frida's Art Challenge", image: "/Frida.png", color: "#F7B801" },
];

const NavBar = ({ activeSection, setActiveSection }) => (
  <nav style={{
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    padding: '15px 5%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '28px', cursor: 'pointer' }} onClick={() => setActiveSection('home')}>CN Reimagined</div>
      <div style={{
        display: 'flex',
        gap: '30px',
      }}>
        {['HOME', 'GAMES', 'CHARACTERS', 'ABOUT'].map(item => (
          <div 
            key={item} 
            style={{ 
              cursor: 'pointer',
              color: activeSection === item.toLowerCase() ? '#4ECDC4' : '#fff',
              fontWeight: activeSection === item.toLowerCase() ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              position: 'relative',
              padding: '5px 0',
            }}
            onClick={() => setActiveSection(item.toLowerCase())}
          >
            {item}
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: activeSection === item.toLowerCase() ? '100%' : '0%',
              height: '2px',
              backgroundColor: '#4ECDC4',
              transition: 'width 0.3s ease',
            }}></span>
          </div>
        ))}
      </div>
    </div>
  </nav>
);

const CharacterSpotlight = ({ character, onClick }) => (
  <div 
    style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '15px',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
    }}
    onClick={onClick}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
  >
    <img src={character.image} alt={character.name} style={{ width: '100%', height: 'auto' }} />
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
      padding: '20px',
      color: '#fff',
      fontSize: '24px',
      fontWeight: 'bold',
    }}>
      {character.name}
    </div>
  </div>
);

const GameCard = ({ game, onClick }) => (
  <div 
    style={{
      backgroundColor: game.color,
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }}
    onClick={() => onClick(game)}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    }}
  >
    <img src={game.image} alt={game.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
    <div style={{
      padding: '20px',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '18px',
      textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
    }}>
      {game.name}
    </div>
  </div>
);

const CartoonNetworkWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeGame, setActiveGame] = useState(null);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div>
            <h1 style={{ color: '#fff', marginBottom: '30px', fontSize: '3em', textAlign: 'center' }}>Welcome to Cartoon Network Reimagined</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginBottom: '50px' }}>
              {characters.map(char => (
                <CharacterSpotlight key={char.name} character={char} onClick={() => setActiveSection('characters')} />
              ))}
            </div>
            <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '2em' }}>Featured Games</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
              {games.map(game => (
                <GameCard key={game.name} game={game} onClick={(game) => setActiveGame(game.name)} />
              ))}
            </div>
          </div>
        );
      case 'games':
        return (
          <div>
            <h1 style={{ color: '#fff', marginBottom: '30px', fontSize: '3em', textAlign: 'center' }}>Cartoon Network Games</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
              {games.map(game => (
                <GameCard key={game.name} game={game} onClick={(game) => setActiveGame(game.name)} />
              ))}
            </div>
          </div>
        );
      case 'characters':
        return (
          <div>
            <h1 style={{ color: '#fff', marginBottom: '30px', fontSize: '3em', textAlign: 'center' }}>Meet Our Characters</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
              {characters.map(char => (
                <CharacterSpotlight key={char.name} character={char} onClick={() => {}} />
              ))}
            </div>
          </div>
        );
      case 'about':
        return (
          <div>
            <h1 style={{ color: '#fff', marginBottom: '30px', fontSize: '3em', textAlign: 'center' }}>About CN Reimagined</h1>
            <p style={{ color: '#fff', fontSize: '1.2em', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
              CN Reimagined brings your favorite Cartoon Network characters to life in a whole new way. 
              Join Ruben, Tons, Doxter, and Frida on exciting adventures and challenging games. 
              This is where nostalgia meets the future of animation!
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  if (activeGame) {
    const GameComponent = games.find(g => g.name === activeGame)?.component;
    return (
      <div style={{ padding: '40px 5%', background: '#f0f0f0', minHeight: '100vh' }}>
        <button onClick={() => setActiveGame(null)} style={{
          padding: '15px 30px',
          marginBottom: '30px',
          backgroundColor: '#4ECDC4',
          color: 'white',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        }}>
          Back to Games
        </button>
        {GameComponent && <GameComponent />}
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#1A1A2E',
      minHeight: '100vh',
    }}>
      <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main style={{
        background: 'linear-gradient(135deg, #0F3443 0%, #34E89E 100%)',
        padding: '60px 5%',
        minHeight: 'calc(100vh - 60px)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {renderContent()}
        </div>
      </main>

      <footer style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        padding: '30px 5%',
        textAlign: 'center',
      }}>
        <p>© 2024 Cartoon Network Reimagined. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CartoonNetworkWebsite;