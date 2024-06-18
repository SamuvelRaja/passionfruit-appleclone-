import React from 'react'
import { hightlightsSlides } from '../constants'

const carousals = () => {
  return (
    <div className='flex items-center'>
        {
            hightlightsSlides.map((slide,ind)=>(
                <div key={slide.id} className='sm:pr-20 pr-10' id='slider'>
                    <div className="video-carousal-container">
                        <div className="bg-black rounded-3xl w-full h-full flex-center overflow-hidden">

                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default carousals
