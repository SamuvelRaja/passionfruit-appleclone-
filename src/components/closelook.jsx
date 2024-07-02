import { View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Iphone from './3dphone'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


const Closelook = () => {
  useGSAP(()=>{
    gsap.registerPlugin(ScrollTrigger) 
    gsap.to("#cl",{
        scrollTrigger:{
            trigger:"#cl",
            start:'bottom bottom',
            toggleActions:"restart none none reverse"
        },
        opacity: 1, 
        y: 0, 
        duration: 1
    }
      )
  },[])
  return (
    <section className="h-[100vh] ">
        <div className="screen-max-width">
            <h2 id="cl" className="mt-5 mx-5 section-heading">
                Take a closer look.
            </h2>
        </div>
        <Iphone/>
    </section>
  )
}

export default Closelook
