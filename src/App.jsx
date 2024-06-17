import { useGSAP } from "@gsap/react"
import gsap from "gsap"

function App() {
useGSAP(()=>{
  gsap.to(".go",{
    y:500,
    repeat:-1,
    yoyoEase:true,
    ease:"power1.inOut"
  })
},[])
  return (
   <h1 className="text-3xl font-bold text-black underline go">
      Hello world!
    </h1>
  )
}

export default App
