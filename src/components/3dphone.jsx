import { Canvas } from '@react-three/fiber'
import React from 'react'
import { OrbitControls, View, PerspectiveCamera } from '@react-three/drei'
import  Model  from './object'
import Lights from './lights'



const Iphone = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
  return (
          <View
            index={index}
            id={gsapType}
            className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
          >
            <ambientLight intensity={0.3} />
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />

            <Lights/>
            <Model position={500} />
            <OrbitControls enableDamping={true}/>
            
        </View>
  )
}

export default Iphone
