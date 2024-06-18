

const Video = ({ src, autoplay, classname }) => {
    return (
        <video key={src} playsInline autoPlay={autoplay} preload="auto" muted className={classname}>
                <source src={src} type="video/mp4" />
        </video>
    )
}

export default Video
