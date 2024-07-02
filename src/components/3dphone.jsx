import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import { OrbitControls, View, PerspectiveCamera } from '@react-three/drei'
import  Model  from './object'
import Lights from './lights'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'



const Iphone = ({}) => {

    const colors = [
      { id: 0, code: '#8F8A81', name: 'Blue' },
      { id: 1, code: '#FFE7B9', name: 'Red' },
      { id: 2, code: '#6F6C64', name: 'Green' }
    ];

    const sizes = ['6.1"', '6.7"'];

      const [selectedColor, setSelectedColor] = useState(colors[0]); // Initialize with first color
      const [isPro, setIsPro] = useState(false); // Pro model state
      console.log(selectedColor,"ss")
      const handleColorChange = (color) => {
        setSelectedColor(color);
        
      };

      const handleProToggle = () => {
        setIsPro(prevState => !prevState);
      };

      useGSAP(()=>{
        gsap.to(".tg-bar",{
          marginLeft:isPro?'50%':'0%',
          duration:0.5,
          ease:"expo.out"
        })
    },[isPro])
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
                  className={`mx-1 text-white font-bold rounded-full
                  ${selectedColor.id === color.id ? 'border-2 border-white px-[11px]' : 'px-[13px]'}`}
                  style={{ backgroundColor: color.code }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
            <div className="pro-toggle w-full max-w-[290px] rounded-full backdrop-blur bg-gray-300 h-[50px]   flex ">
              <div className='flex w-full '>
                <div className='rounded-full bg-[#fff] border-2 border-[#0000bb] shadow-white tg-bar w-[48%]'>
                </div>
              </div>
              <div className="tgbtn h-full gap-2 items-center flex absolute bg-transparent text-[17px] font-normal ">
                <p className={`bg-transparent px-2 text-center ${isPro?"text-[#fff]":"text-[#000]"}`}
                  onClick={() => handleProToggle()}
                >15.54 CM (6.1")</p>
                <p className={`bg-transparent px-3 text-center ${isPro?"text-[#000]":"text-[#fff]"}`}
                  onClick={() => handleProToggle()}
                  >17.00CM (6.7")</p>
              </div>
            </div>
            
          </div>
        </>
          
  )
}

export default Iphone
