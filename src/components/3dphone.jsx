import { Canvas } from '@react-three/fiber'
import React from 'react'
import { OrbitControls, View, PerspectiveCamera } from '@react-three/drei'
import  Model  from './object'
import Lights from './lights'



const Iphone = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
  return (
        <>
          <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: false }} >
            <PerspectiveCamera makeDefault position={[0, 0,0.3]} />
            <Lights/>
            <Model />
            <OrbitControls enableDamping={true} enableZoom={false} enablePan={false} enableRotate={true}/>
          </Canvas>
        </>
          
  )
}

export default Iphone
