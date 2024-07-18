import { Canvas } from '@react-three/fiber'
import React, { Suspense, useRef, useState,useEffect } from 'react'
import { OrbitControls, View, PerspectiveCamera } from '@react-three/drei'
import  Model  from './object'
import Lights from './lights'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Loader from './loader'
import { yellowImg,blackImg,blueImg,whiteImg } from '../utils'

const deviceWidth=window.innerWidth

const Iphone = ({}) => {

     const colors = [
  {
    id: 1,
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    code:"#ffe7b9",
    img: yellowImg,
  },
  {
    id: 2,
    title: "iPhone 15 Pro in Blue Titanium",
    color: ["#53596E", "#6395ff", "#21242e"],
    code:"#6395ff",
    img: blueImg,
  },
  {
    id: 3,
    title: "iPhone 15 Pro in White Titanium",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
    code:"#ffffff",
    img: whiteImg,
  },
  {
    id: 4,
    title: "iPhone 15 Pro in Black Titanium",
    color: ["#454749", "#3b3b3b", "#181819"],
    code:"#3b3b3b",
    img: blackImg,
  },
];
    const sizes = ['6.1"', '6.7"'];
    const controlsRef = useRef();
    const canvasRef = useRef(null);
      const [selectedColor, setSelectedColor] = useState(colors[0]); // Initialize with first color
      const [isPro, setIsPro] = useState(false); // Pro model state
      
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

    // handling touch in mobile
    useEffect(() => {
    const canvas = canvasRef.current;

    let startY;
    let startScrollY;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      startScrollY = window.scrollY;
    };

    const handleTouchMove = (e) => {
      const deltaY = e.touches[0].clientY - startY;
      window.scrollTo(0, startScrollY - deltaY);
    };

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  
  return (
        <>
          <Canvas  gl={{ antialias: true }} ref={canvasRef} >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            
            <directionalLight color="white" intensity={10} position={[0, 2, 0.9]} />
            <directionalLight color="white" intensity={10} position={[0, -1, 0.5]} /> 
            <Lights/>
            <Model />
            <Suspense fallback={<Loader />}>
                <Model
                  scale={isPro? [17, 17, 17] : [15, 15, 15]}
                  hex={selectedColor.color[0]}
                  img={selectedColor.img}
                />
            </Suspense>
            <OrbitControls ref={controlsRef}
              enableDamping={true} 
              enableZoom={false}
              minPolarAngle={(deviceWidth<640) ? Math.PI / 2 : 0}
              maxPolarAngle={(deviceWidth<640) ? Math.PI / 2 : Math.PI}
              />
          </Canvas>
          <p className='text-center text-[12px] font-light mb-5'>{selectedColor.title}</p>
          <div className="iphone-toggle flex flex-col items-center md:flex-row pb-8 justify-center gap-4"> 
            <div className="color-selection rounded-full backdrop-blur bg-gray-300 h-[50px] max-w-[168px]  py-3 px-4  flex">
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
            <div className="pro-toggle w-full max-w-[290px] rounded-full backdrop-blur bg-gray-300 h-[50px]   flex  ">
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
