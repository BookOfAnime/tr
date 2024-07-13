import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, useProgress } from '@react-three/drei';
import Laptop from './Laptop';
import { CN } from './CN';
import { CNBlue } from './CnBlue';
import './App.css';

// Loading Screen Component
const LoadingScreen = ({ progress }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #0F3443 0%, #34E89E 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  }}>
    <CNBlue scale={0.2} /> {/* You might need to adjust this if it's a 3D component */}
    <h2 style={{ color: '#fff', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
      Loading Cartoon Network...
    </h2>
    <div style={{ width: '200px', backgroundColor: '#4ECDC4', borderRadius: '10px', marginTop: '20px' }}>
      <div style={{
        width: `${progress}%`,
        height: '20px',
        backgroundColor: '#FF6B6B',
        borderRadius: '10px',
        transition: 'width 0.3s ease-in-out',
      }} />
    </div>
    <p style={{ color: '#fff', marginTop: '10px' }}>{Math.round(progress)}%</p>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { progress, item } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      // Give a little extra time for any final setup
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (isLoading) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <Canvas camera={{ fov: 50, near: 0.1, far: 2000 }}>
      <PresentationControls 
        global 
        rotation={[0.13, 0.1, 0]} 
        polar={[-0.2, 0.2]} 
        azimuth={[-0.5, 0.5]} 
        config={{ mass: 2, tension: 400 }} 
        snap={{ mass: 4, tension: 400 }}
      >
        <Laptop />
        <ambientLight intensity={10} />
        <CNBlue scale={0.4} position={[0, 1.35, 0]}/>
      </PresentationControls>
    </Canvas>
  );
}

export default App;