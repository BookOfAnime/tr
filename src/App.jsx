import React, { useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PresentationControls, useProgress } from '@react-three/drei';
import Laptop from './Laptop';
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
    backgroundImage: 'url(/banner-11.png)',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  }}>
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: '20px',
      borderRadius: '10px',
    }}>
      <h2 style={{ color: '#fff', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
        Loading CarTON Network...
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
  </div>
);

// Custom hook for responsive adjustments
const useResponsiveAdjustments = () => {
  const { viewport } = useThree();
  const aspect = viewport.width / viewport.height;

  let cameraPosition = [0, 0, 5];
  let scale = 1;

  if (aspect < 1) { // Portrait
    cameraPosition = [0, 0, 8];
    scale = 0.8;
  } else if (aspect < 1.5) { // Square-ish
    cameraPosition = [0, 0, 6];
    scale = 0.9;
  }

  return { cameraPosition, scale };
};

const Scene = () => {
  const { cameraPosition, scale } = useResponsiveAdjustments();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...cameraPosition);
    camera.updateProjectionMatrix();
  }, [camera, cameraPosition]);

  return (
    <PresentationControls
      global
      rotation={[0.13, 0.1, 0]}
      polar={[-0.2, 0.2]}
      azimuth={[-0.5, 0.5]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 400 }}
    >
      <group scale={scale}>
        <Laptop powertonImage="/powerton-09.png" />
        {/* <CNBlue scale={0.4} position={[0, 1.35, 0]}/> */}
      </group>
      <ambientLight intensity={10} />
    </PresentationControls>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { progress } = useProgress();
  const [extraLoadTime, setExtraLoadTime] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setExtraLoadTime(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    if (!extraLoadTime && progress === 100) {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [extraLoadTime, progress]);

  if (isLoading) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <Canvas camera={{ fov: 50, near: 0.1, far: 2000 }}>
      <Scene />
    </Canvas>
  );
}

export default App;