import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import Video from './Video'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Carousals = () => {
    const videoRef=useRef([])
    const spanRef=useRef([])
    const videoDivRef=useRef([])

    const [videostat, setVideostat]=useState({
        isPlaying:false,
        id:0,
        isEnded:false,
        isLastVideo:false
    })
    const{isPlaying,id,isEnded,isLastVideo}=videostat
    const [loadedData, setLoadedData] = useState([]);

    useGSAP(()=>{
        gsap.registerPlugin(ScrollTrigger) 
        gsap.to(videoRef.current[id],{
            scrollTrigger:{
                trigger:videoRef.current[id],
                toggleActions: "restart none none none",
            },
            onComplete:function(){
                setVideostat((prev)=>{
                    return {...prev,
                    isPlaying:true,
                    id:0,
                    isEnded:false}
                })
            }
        })
    },[])

    useEffect(()=>{
        if(loadedData.length>3){
            if(!isPlaying){
                videoRef.current[id].pause()
            }else{
                videoRef.current[id].play()
            }
        }
        console.log(videostat,"play")
    },[loadedData,isPlaying,id])
    
        useGSAP(()=>{
            gsap.to(".slide-div",{
                transform: `translateX(${-100 * id}%)`,
                duration: 2,
                ease: "power2.inOut",
            })
        },[id])
   
    function handleProcess(prp){
        switch(prp){
            case "play":
                setVideostat((prev)=>({...prev,isPlaying:!prev.isPlaying}))
                break;
            case "pause":
                setVideostat((prev)=>({...prev,isPlaying:!prev.isPlaying}))
                break;
            case "video-reset":
                setVideostat((prev)=>({...prev,isPlaying:!prev.isPlaying,isEnded:!prev.isEnded,id:0}))
                break;
                default:
                    return videostat

        }
        console.log(videostat)
    }
     const handleLoadedMetaData = (i, e) => {setLoadedData((pre) => [...pre, e])};
  return (
        <>
            <div className='flex items-center slide-div'>
                {
                    hightlightsSlides.map((slide,ind)=>(
                        <div key={slide.id} className='sm:pr-20 pr-10' id='slider'>
                            <div className="video-carousel-container">
                                <div className="bg-black rounded-3xl w-full h-full flex-center overflow-hidden">
                                    <video  autoPlay={false} muted 
                                    ref={(el)=>(videoRef.current[ind]=el) }
                                    // onPlay={()=>(setVideostat((prev)=>({
                                    //     ...prev,
                                    //     isEnded:false
                                    // })))}
                                    onEnded={()=>{
                                        if(id<3){
                                            setVideostat((prev)=>({
                                                ...prev,
                                                // isEnded:true
                                                id:id+1
                                            }))
                                        }else{
                                            setVideostat((prev)=>({
                                                ...prev,
                                                isPlaying:false,
                                                isEnded:true,
                                            }))
                                        }
                                        }}
                                    onLoadedMetadata={(e) => handleLoadedMetaData(ind, e)}
                                    >
                                        <source src={slide.video} type="video/mp4" />
                                    </video>
                                </div>
                                <div className="absolute top-12 left-[5%] z-10">
                                    {slide.textLists.map((text, i) => (
                                    <p key={Math.random()*i} className="md:text-2xl text-xl font-medium">
                                        {text}
                                    </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex-center mt-6">
                <div className="rounded-full flex-center py-5 px-7 bg-gray-300 backdrop-blur gap-2">
                    {
                        hightlightsSlides.map((_,i)=>(
                            <span key={Math.random()*i} className="w-2 bg-gray-200 h-2 rounded-full"></span>
                        ))
                    }
                </div>
                <button className="control-btn ml-4 p-3"
                        onClick={
                isEnded
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
                >
                    <img className='w-full'  src={isEnded ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isEnded ? "replay" : !isPlaying ? "play" : "pause"} />

                </button>
            </div>
            
        </>
  )
}

export default Carousals
