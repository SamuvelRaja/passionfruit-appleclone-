import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { heroVideo, smallHeroVideo } from "../utils"
import { useEffect, useState } from "react"
import Video from "./Video"
Video


const Hero = () => {
    const[src, setSrc]=useState(heroVideo)
    function changeSrc(){
      if(window.innerWidth>588){
          setSrc(heroVideo)
        }else{
          setSrc(smallHeroVideo)
        }
    }
    useEffect(()=>{
      changeSrc()
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
    gsap.to(".rise",{
      opacity:1,
      delay:1,
      y:-50,
      stagger:0.2
    })
  })
  


  return (
    <section className="nav-height">
      <div className="flex flex-col flex-center h-4/6 mt-4 ">
        <h1 className="text-[#94928D] opacity-0 herotxt text-2xl md:text-3xl text-center  font-semibold mb-5">iPhone 15 Pro</h1>
          <div className="px-4">
            <Video  src={src} autoPlay={true} playsInline={true} muted={true} key={src} className="pointer-events-none w-full md:w-5/6 lg:w-4/6 mx-auto" uref={""} />
        </div>
      </div>
      <div className=" flex-col  flex-wrap flex-center gap-1 md:gap-4 mt-8">
        <a href="" className="btn rise opacity-0 relative">Buy</a>
        <p className="rise opacity-0 text-[14px] md:text-xl relative">From ₹134900.00 ‡</p>
      </div>
    </section>
  )
}

export default Hero
