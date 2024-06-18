import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { heroVideo, smallHeroVideo } from "../utils"
import { useEffect, useState } from "react"



const Hero = () => {
    const[src, setSrc]=useState(heroVideo)
    function changeSrc(){
      if(this.window.innerWidth>588){
          setSrc(heroVideo)
        }else{
          setSrc(smallHeroVideo)
        }
    }
    useEffect(()=>{
    window.addEventListener("resize",changeSrc)
    return ()=>{
        window.removeEventListener("resize",changeSrc)
      }
    },[])

  useGSAP(()=>{
    gsap.to(".herotxt",{
      opacity:1,
      delay:1
    })
  })
  


  return (
    <section className="nav-height">
      <div className="flex flex-col flex-center h-5/6">
        <h1 className="text-[#94928D] opacity-0 herotxt text-3xl text-center  font-semibold mb-5">iPhone 15 Pro</h1>
          <div >
            <video key={src} playsInline autoPlay muted className="pointer-events-none w-4/6 md:w-5/6 lg:w-4/6 mx-auto">
              <source src={src} type="video/mp4" />
            </video>
        </div>
      </div>
    </section>
  )
}

export default Hero
