'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath)
  return <primitive object={scene} scale={1.5} />
}

export default function ProductViewer() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />

        <Model modelPath="/models/duck/fridge.glb" />

        <OrbitControls />
      </Canvas>
    </div>
  )
}