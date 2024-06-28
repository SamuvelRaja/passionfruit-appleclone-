import { Canvas } from '@react-three/fiber'
import React from 'react'
import { Stats, OrbitControls } from '@react-three/drei'
import { Model } from './object'


const Iphone = () => {
  return (
    <section style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <Canvas camera={{ near: 0.1, far: 1000 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Model position={500} />
            <OrbitControls enableDamping={true}/>
            <Stats/>
        </Canvas>
    </section>
  )
}

export default Iphone
