import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';

const DextersMemoryGame = lazy(() => import('./DextersMemoryGame'));
const RobinsWhackAVillain = lazy(() => import('./RobinsWhackAVillain'));
const TonsTimeAdventure = lazy(() => import('./TonsTimeAdventure'));
const FriddsArtChallenge = lazy(() => import('./FriddsArtChallenge'));




const characters = [
  { 
    name: "Ruben", 
    image: "/ruben.webp", 
    audio: "/ruben.mp3",
    description: "Ruben is a brave and adventurous hero, always ready to save the day with his quick wit and agility."
  },
  { 
    name: "Powerton", 
    image: "/powerton-09.webp", 
    audio: "/powerton-09.mp3",
    description: "Powerton is an energetic character with the ability to manipulate electricity. He's always buzzing with excitement!"
  },
  { 
    name: "Doxter", 
    image: "/Doxter.webp", 
    audio: "/Doxter.mp3",
    description: "Doxter is a boy genius with a secret laboratory. His inventions often lead to hilarious mishaps and adventures."
  },
  { 
    name: "Fridd", 
    image: "/Fridd.webp", 
    audio: "/Fridd.mp3",
    description: "Fridd is an artistic soul with a magical paintbrush. Her creations often come to life in unexpected ways!"
  }
];

const games = [
  { name: "Doxter's Lab Puzzle", image: "/Doxter.webp", color: "#FF6B6B", component: DextersMemoryGame },
  { name: "Ruben's Whack-a-Villain", image: "/ruben.webp", color: "#4ECDC4", component: RobinsWhackAVillain },
  { name: "Tons' Time Adventure", image: "/Tons.webp", color: "#45B7D1", component: TonsTimeAdventure },
  { name: "Fridds's Art Challenge", image: "/Frida.webp", color: "#F7B801", component: FriddsArtChallenge },
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
      <div style={{ fontWeight: 'bold', fontSize: '28px', cursor: 'pointer', color: '#0098ea' }} onClick={() => setActiveSection('home')}>CartTON Network</div>
      <div style={{
        display: 'flex',
        gap: '30px',
      }}>
        {['HOME', 'GAMES', 'CHARACTERS', 'ABOUT'].map(item => (
          <div 
            key={item} 
            style={{ 
              cursor: 'pointer',
              color: activeSection === item.toLowerCase() ? '#0098ea' : '#fff',
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
              backgroundColor: '#0098ea',
              transition: 'width 0.3s ease',
            }}></span>
          </div>
        ))}
      </div>
    </div>
  </nav>
);

const CharacterInfoCard = ({ character, onClose }) => (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    zIndex: 1000,
    maxWidth: '300px',
    width: '90%',
  }}>
    <h2 style={{ color: '#0098ea', marginBottom: '10px' }}>{character.name}</h2>
    <p style={{ marginBottom: '20px' }}>{character.description}</p>
    <button onClick={onClose} style={{
      padding: '10px 20px',
      backgroundColor: '#0098ea',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }}>
      Close
    </button>
  </div>
);

const CharacterSpotlight = React.memo(({ character, onClick }) => {
  const audioRef = useRef(new Audio(character.audio));
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    onClick(character);
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false));
      audio.pause();
    };
  }, []);

  return (
    <div 
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '15px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      }}
      onClick={handleClick}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img src={character.image} alt={character.name} style={{ width: '100%', height: 'auto' }} loading="lazy" />
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
      {isPlaying && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#0098ea',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <span style={{ color: '#fff' }}>♪</span>
        </div>
      )}
    </div>
  );
});

const GameCard = React.memo(({ game, onClick }) => (
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
    <img src={game.image} alt={game.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} loading="lazy" />
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
));

const CartoonNetworkWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeGame, setActiveGame] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div>
            <h1 style={{ color: '#0098ea', marginBottom: '30px', fontSize: '3em', textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>Welcome to CartTON Network</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '50px' }}>
              {characters.map(char => (
                <CharacterSpotlight key={char.name} character={char} onClick={handleCharacterClick} />
              ))}
            </div>
            <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '2em', textAlign: 'center' }}>Featured Games</h2>
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
            <h1 style={{ color: '#0098ea', marginBottom: '30px', fontSize: '3em', textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>CartTON Network Games</h1>
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
            <h1 style={{ color: '#0098ea', marginBottom: '30px', fontSize: '3em', textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>Meet Our Characters</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
              {characters.map(char => (
                <CharacterSpotlight key={char.name} character={char} onClick={handleCharacterClick} />
              ))}
            </div>
          </div>
        );
      case 'about':
        return (
          <div>
            <h1 style={{ color: '#0098ea', marginBottom: '30px', fontSize: '3em', textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>About CartTON Network</h1>
            <p style={{ color: '#fff', fontSize: '1.2em', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto', textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '15px' }}>
              CartTON Network brings your favorite cartoon characters to life in a whole new way. 
              Join Ruben, Tons, Doxter, and Frida on exciting adventures and challenging games. 
              This is where nostalgia meets the future of Crypto!
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
          backgroundColor: '#0098ea',
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
        <Suspense fallback={<div>Loading...</div>}>
          {GameComponent && <GameComponent />}
        </Suspense>
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
        background: 'linear-gradient(135deg, #0F3443 0%, #0098ea 100%)',
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

      {selectedCharacter && (
        <CharacterInfoCard 
          character={selectedCharacter} 
          onClose={() => setSelectedCharacter(null)} 
        />
      )}

      <footer style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        padding: '30px 5%',
        textAlign: 'center',
      }}>
        <p>© 2024 CartTON Network. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CartoonNetworkWebsite;