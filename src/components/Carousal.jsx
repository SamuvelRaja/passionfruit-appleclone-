import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import Video from "./Video";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Carousals = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);

  const [videostat, setVideostat] = useState({
    isPlaying: false,
    id: 0,
    isEnded: false,
    isLastVideo: false,
  });
  const { isPlaying, id, isEnded, isLastVideo } = videostat;
  const [loadedData, setLoadedData] = useState([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(videoRef.current[id], {
      scrollTrigger: {
        trigger: videoRef.current[id],
        toggleActions: "restart none none none",
      },
      onComplete: function () {
        setVideostat((prev) => {
          return { ...prev, isPlaying: true, id: 0, isEnded: false };
        });
      },
    });
  }, []);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[id].pause();
      } else {
        videoRef.current[id].play();
      }
    }
    console.log()
  }, [loadedData, isPlaying, id]);

  useGSAP(() => {
    gsap.to(".slide-div", {
      transform: `translateX(${-100 * id}%)`,
      duration: 2,
      ease: "power2.inOut",
    });
    let spanref = videoSpanRef.current;
    let spanWidth;
    if (window.innerWidth > 768) {
      spanWidth = "7vw";
    } else {
      spanWidth = "10vw";
    }
    //span animation

    if (spanref[id - 1]) {
      gsap.to(spanref[id - 1], {
        width: "0.5rem",
        ease: "power1.inOut",
        onComplete: function () {
          console.log("reduce", id, spanref[id - 1]);
        },
      });
    }
    gsap.to(spanref[id], {
      width: spanWidth,
      ease: "power1.inOut",
    });
    let spanInRef = videoSpanRef.current[id].children[0];
    let timeln = gsap.to(spanInRef, {
      onUpdate: function () {
        let currentProgress = 0;
        const progress = Math.ceil(timeln.progress() * 100);
        
        if (progress != currentProgress) {
          currentProgress = progress;

          gsap.to(spanInRef, {
            width: `${progress}%`,
            backgroundColor: "white",
          });
        }
      },
      onComplete: function () {
        gsap.to(spanInRef, {
          width: "8px",
          backgroundColor: "#afafaf",
        });
      },
    });
    if (id == 0) {
      timeln.restart();
    }

    // update the progress bar
    const timelnUpdate = () => {
      timeln.progress(
        videoRef.current[id].currentTime / hightlightsSlides[id].videoDuration
      );
    };

    if (isPlaying) {
      // ticker to update the progress bar
      gsap.ticker.add(timelnUpdate);
    } else {
      // remove the ticker when the video is paused (progress bar is stopped)
      gsap.ticker.remove(timelnUpdate);
    }
  }, [id]);

  function handleProcess(prp) {
    switch (prp) {
      case "play":
        setVideostat((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case "pause":
        setVideostat((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case "video-reset":
        setVideostat((prev) => ({
          ...prev,
          isPlaying: !prev.isPlaying,
          isEnded: !prev.isEnded,
          id: 0,
        }));
        break;
      default:
        return videostat;
    }
    console.log(videostat);
  }
  const handleLoadedMetaData = (i, e) => {
    setLoadedData((pre) => [...pre, e]);
  };
  return (
    <>
      <div className="flex items-center ">
        {hightlightsSlides.map((slide, ind) => (
          <div key={slide.id} className="sm:pr-20 pr-10 slide-div">
            <div className="video-carousel-container">
              <div className="bg-black rounded-3xl w-full h-full flex-center overflow-hidden">
                <video
                  autoPlay={false}
                  muted
                  ref={(el) => (videoRef.current[ind] = el)}
                  // onPlay={()=>(setVideostat((prev)=>({
                  //     ...prev,
                  //     isEnded:false
                  // })))}
                  onEnded={() => {
                    if (id < 3) {
                      setVideostat((prev) => ({
                        ...prev,
                        // isEnded:true
                        id: id + 1,
                      }));
                    } else {
                      setVideostat((prev) => ({
                        ...prev,
                        isPlaying: false,
                        isEnded: true,
                      }));
                    }
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetaData(ind, e)}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {slide.textLists.map((text, i) => (
                  <p
                    key={Math.random() * i}
                    className="md:text-2xl text-xl font-medium"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-center mt-6" >
        <div className="rounded-full flex-center py-5 px-7 bg-gray-300 backdrop-blur gap-2">
          {hightlightsSlides.map((_, i) => (
            <span
              key={Math.random() * i}
              onClick={() => {
                setVideostat((prev) => ({
                  ...prev,
                  id: i,
                  isPlaying: true,
                  isEnded: false,
                }));
              }}
              className="w-2 bg-gray-200 relative h-2 rounded-full "
              dat-id={i}
              ref={(el) => (videoSpanRef.current[i] = el)}
            >
              <span className="absolute h-2 w-full max-w-[100%] rounded-full"></span>
            </span>
          ))}
        </div>
        <button
          className="control-btn ml-4 p-3"
          onClick={
            isEnded
              ? () => handleProcess("video-reset")
              : !isPlaying
              ? () => handleProcess("play")
              : () => handleProcess("pause")
          }
        >
          <img
            className="w-full"
            src={isEnded ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isEnded ? "replay" : !isPlaying ? "play" : "pause"}
          />
        </button>
      </div>
    </>
  );
};

export default Carousals;
