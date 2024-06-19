

const Video = (props) => {
    
    return (
        <video {...props}>
            <source src={props.src} type="video/mp4" />
        </video>
    )
}

export default Video
