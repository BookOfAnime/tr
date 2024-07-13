import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function CNBlue(props) {
  const group = useRef()
  const { scene } = useGLTF('./cnBlue.gltf')

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/cnBlue.glb')