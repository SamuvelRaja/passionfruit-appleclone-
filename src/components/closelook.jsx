import { View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

const Closelook = () => {
  return (
    <section>
        <div className="screen-max-width">
            <h1 id="heading" className="section-heading">
                Take a closer look.
            </h1>
        </div>
        <Canvas>
            <View.Port/>
        </Canvas>
    </section>
  )
}

export default Closelook
