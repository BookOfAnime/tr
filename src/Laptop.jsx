import { Environment, Html, PresentationControls, useGLTF, Text, useFont } from '@react-three/drei'
import React, { useRef, useState } from 'react'
import { Box } from '@react-three/drei'
import CartoonNetworkWebsite from './CartoonNetworkWebsite'
import { CN } from './CN'

const Laptop = ({ powertonImage }) => {
    const laptopRef = useRef()
    const { scene: laptopScene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf")
    const { scene: deskScene } = useGLTF("/desk.glb")
    const { scene: bravoScene } = useGLTF("/bravo.glb")
    const { scene: courageScene } = useGLTF("/courage.glb")
    const { scene: bmoScene } = useGLTF("/bmo.glb")
    const { scene: jakeScene } = useGLTF("/jake.glb")
    const { scene: captainScene } = useGLTF("/captain.glb")
    const { scene: dexterScene } = useGLTF("/dexter.glb")
    const { scene: blossomScene } = useGLTF("/blossom.glb")
    const { scene: macScene } = useGLTF("/mac.glb")
    const [isFullScreen, setIsFullScreen] = useState(false)
    const fontProps = { font: '/new.ttf', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false,color: "#0098ea"}


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
                            bottom: '-40vh',
                            right: '20px',
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
            
            {/* Models on the desk */}
            <primitive 
                object={bmoScene} 
                scale={0.2}
                position={[-1, -0.5, -0.5]}
                rotation={[0, Math.PI / 4, 0]}
            />
            
            <primitive 
                object={jakeScene} 
                scale={0.05}
                position={[1, .1, -0.5]}
            />
            
            <primitive 
                object={captainScene} 
                scale={0.1}
                position={[-0.8, -0.5, 0.8]}
            />
            
            <primitive 
                object={dexterScene} 
                scale={0.1}
                position={[0.8, -0.5, 0.8]}
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
            
            {/* C and N boxes with Blossom and Mac on top */}
            <group position={[0, 1.5, 0]}>
                {/* C box with Blossom */}
                <group position={[-0.45, -.2, 0]}>
                    <Box args={[1, 1, 1]}>
                        <meshStandardMaterial color="#0098ea" />
                        <Text 
                            {...fontProps}
                            position={[0, 0, 0.51]} 
                            fontSize={0.8} 
                            color="#0098ea"
                            anchorX="center"
                            anchorY="middle"
                        >
                            C
                        </Text>
                    </Box>
                    <primitive 
                        object={blossomScene} 
                        scale={0.52}
                        position={[0, 0.5, 0]}
                    />
                </group>

                {/* N box with Mac */}
                <group position={[0.55, -.2, 0]}>
                    <Box args={[1, 1, 1]}>
                        <meshStandardMaterial color="#0098ea" />
                        <Text 
                        {...fontProps}
                            position={[0, 0, 0.51]} 
                            fontSize={0.8} 
                            color="#0098ea"
                            anchorX="center"
                            anchorY="middle"
                        >
                            N
                        </Text>
                    </Box>
                    <primitive 
                        object={macScene} 
                        scale={0.6}
                        position={[0, 0.5, 0]}
                    />
                </group>
            </group>
            <Html
    position={[0, 0, 0]}
    wrapperClass="fullscreen-button"
    center
>
    <button 
        onClick={handleToggleFullScreen}
        style={{
            padding: '20px 40px',
            fontSize: 'max(18px, min(5vw, 28px))',
            fontWeight: 'bold',
            backgroundColor: '#0098ea',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 6px 0 #0072b1, 0 12px 20px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            pointerEvents: 'auto',
            position: 'relative',
            top: "30vh",
            textTransform: 'uppercase',
            letterSpacing: '2px',
            overflow: 'hidden',
        }}
    >
        <span 
            style={{
                display: 'inline-block',
                transition: 'transform 0.3s ease',
            }}
        >
            Come on in!
        </span>
        <style jsx>{`
            button:hover {
                background-color: #00a8ff;
                box-shadow: 0 4px 0 #0072b1, 0 8px 16px rgba(0, 0, 0, 0.3);
                transform: translateY(2px);
            }
            button:active {
                background-color: #0072b1;
                box-shadow: 0 2px 0 #005b8e, 0 6px 10px rgba(0, 0, 0, 0.3);
                transform: translateY(4px);
            }
        `}</style>
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
useGLTF.preload("/bmo.glb")
useGLTF.preload("/jake.glb")
useGLTF.preload("/captain.glb")
useGLTF.preload("/dexter.glb")
useGLTF.preload("/blossom.glb")
useGLTF.preload("/mac.glb")