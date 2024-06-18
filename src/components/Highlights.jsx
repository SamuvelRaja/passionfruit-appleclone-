import React from 'react'
import { rightImg, watchImg } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


const Highlights = () => {
    useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger) 
    gsap.to('.hgl', { 
        scrollTrigger:{
            trigger:".hgl",
            start:'bottom bottom',
            toggleActions:"restart none none reverse"
        },
        opacity: 1, 
        y: 0, 
        duration: 1,
        stagger: 0.25 })
  }, [])
    return (
        <section  id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
            <div className="screen-max-width">
                <div className='md:flex items-end justify-between mb-12'>
                    <h3 id="head" className='section-heading hgl'>Get the highlights.</h3>
                    <div className="flex-wrap items-end gap-5 flex">
                        <a href="#" className='link hgl'>Watch the film &nbsp; <img src={watchImg} alt="watch" /></a>
                        <a href="#" className='link hgl'>Watch the event &nbsp; <img src={rightImg} alt="right" /></a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Highlights
