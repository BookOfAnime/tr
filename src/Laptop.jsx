import { Environment, Html, PresentationControls, useGLTF } from '@react-three/drei'
import React, { useRef, useState } from 'react'
import CartoonNetworkWebsite from './CartoonNetworkWebsite'
import { CN } from './CN'

const Laptop = ({ powertonImage }) => {
    const laptopRef = useRef()
    const { scene: laptopScene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf")
    const { scene: deskScene } = useGLTF("/desk.glb")
    const { scene: bravoScene } = useGLTF("/bravo.glb")
    const { scene: courageScene } = useGLTF("/courage.glb")
    const [isFullScreen, setIsFullScreen] = useState(false)

    const handleToggleFullScreen = (e) => {
        e.stopPropagation()
        setIsFullScreen(!isFullScreen)
    }

    if (isFullScreen) {
        return (
            <Html fullscreen>
                <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'auto' }}>
                    <CartoonNetworkWebsite powertonImage={powertonImage} />
                    <button 
                        onClick={handleToggleFullScreen}
                        style={{
                            position: 'fixed',
                            top: '10px',
                            right: '10px',
                            padding: '10px',
                            backgroundColor: '#ff4500',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            zIndex: 1000
                        }}
                    >
                        Exit Site
                    </button>
                </div>
            </Html>
        )
    }

    return (
        <>
            <Environment preset='warehouse'/>
            
            <primitive 
                object={deskScene} 
                scale={1.8}
                position={[0, -2, 0]}
            />

            <primitive 
                object={bravoScene} 
                scale={0.5}
                position={[3, -2, 0]}
            />

            <primitive 
                object={courageScene} 
                scale={0.5}
                position={[-3, -2, 0]}
            />
            
            <group ref={laptopRef} position={[0, -.3, 0]} scale={0.35}>
                <primitive object={laptopScene} />
                
                <Html
                    transform
                    wrapperClass="htmlScreen"
                    distanceFactor={1.17}
                    position={[0, 1.56, -1.4]}
                    rotation-x={-0.256}
                >
                    <div 
                        style={{ 
                            width: '1024px', 
                            height: '670px', 
                            overflow: 'hidden', 
                            position: 'relative',
                            pointerEvents: 'auto'
                        }}
                    >
                        <CartoonNetworkWebsite powertonImage={powertonImage} />
                    </div>
                </Html>
            </group>
            
            <Html
                position={[0, 0, 0]}
                wrapperClass="fullscreen-button"
                center
            >
                <button 
                    onClick={handleToggleFullScreen}
                    style={{
                        padding: '15px 30px',
                        fontSize: 'max(16px, min(5vw, 24px))',
                        backgroundColor: '#ff4500',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        pointerEvents: 'auto',
                        position:'relative',
                        top:"30vh",
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#ff6347'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ff4500'}
                >
                    Enter Site
                </button>
            </Html>
        </>
    )
}

export default Laptop

// Preload models
useGLTF.preload("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf")
useGLTF.preload("/desk.glb")
useGLTF.preload("/bravo.glb")
useGLTF.preload("/courage.glb")