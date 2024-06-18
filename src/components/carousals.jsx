import React from 'react'
import { hightlightsSlides } from '../constants'
import Video from './Video'

const carousals = () => {
  return (
    <div className='flex items-center'>
        {
            hightlightsSlides.map((slide,ind)=>(
                <div key={slide.id} className='sm:pr-20 pr-10' id='slider'>
                    <div className="video-carousal-container">
                        <div className="bg-black rounded-3xl w-full h-full flex-center overflow-hidden">
                            <Video src={slide.video} autoplay={false} classname={""} />
                        </div>
                        <div className="absolute top-12 left-[5%] z-10">
                            {slide.textLists.map((text, i) => (
                            <p key={i} className="md:text-2xl text-xl font-medium">
                                {text}
                            </p>
                            ))}
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default carousals
