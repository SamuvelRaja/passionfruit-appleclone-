import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import { OrbitControls, View, PerspectiveCamera } from '@react-three/drei'
import  Model  from './object'
import Lights from './lights'



const Iphone = ({}) => {

    const colors = [
      { id: 0, code: '#8F8A81', name: 'Blue' },
      { id: 1, code: '#FFE7B9', name: 'Red' },
      { id: 2, code: '#6F6C64', name: 'Green' }
    ];

    const sizes = ['6.1"', '6.7"'];

      const [selectedColor, setSelectedColor] = useState(colors[0]); // Initialize with first color
      const [isPro, setIsPro] = useState(false); // Pro model state

      const handleColorChange = (color) => {
        setSelectedColor(color);
      };

      const handleProToggle = () => {
        setIsPro(prevState => !prevState);
      };

  return (
        <>
          <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: false }} >
            <PerspectiveCamera makeDefault position={[0, 0,0.3]} />
            <Lights/>
            <Model />
            <OrbitControls enableDamping={true} enableZoom={false} enablePan={false} enableRotate={true}/>
          </Canvas>
          <div className="iphone-toggle flex justify-center gap-4">
            <div className="color-selection rounded-full backdrop-blur bg-gray-300 h-[50px]  py-3 px-4  flex">
              {colors.map((color) => (
                <button
                  key={color.id}
                  className={`px-3  mx-1 bg-[${color.code}] text-white font-bold rounded-full
                  ${selectedColor.id === color.id ? 'border-[#fff]' : ''}`}
                  style={{ backgroundColor: color.code }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
            <div className="pro-toggle w-full max-w-[290px] rounded-full backdrop-blur bg-gray-300 h-[50px]  p-[8px]   flex ">
              <div className='flex w-full '>
                <div className='rounded-full bg-[#fff]  w-[48%]'>
                </div>
              </div>
              <div className="tgbtn h-[34px] items-center flex absolute bg-transparent margin text-[#000]">
                <p className="bg-transparent px-3">15.54 CM (6.1")</p>
                <p className="bg-transparent">17.00CM (6.7")</p>
              </div>
            </div>
            
          </div>
        </>
          
  )
}

export default Iphone
