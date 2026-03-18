'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

type Props = {
  modelName: string
}

function ProductModel({ modelName }: Props) {
  const { scene } = useGLTF(`/models/duck/${modelName}.glb`)

  return (
    <primitive
      object={scene}
      scale={3}          // كبرناه
      position={[0, 0, 0]} // رفعناه
    />
  )
}

export default function ProductViewer({ modelName }: Props) {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 1.5, 4] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 2]} />

        <ProductModel modelName={modelName} />

        <OrbitControls />
      </Canvas>
    </div>
  )
}