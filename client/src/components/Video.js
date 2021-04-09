import React from 'react'


const Video = (props) => {

    const banner ={
        lineHeight:"0",
        position: "relative",
        margin: "0 auto",
        maxWidth: "100%"
    }
    

    return (
        <div className="banner" style={banner}>
            <div className="bannner-container" >   
                <div className='banner-video' >
                    <video  id = "video"  loop="on" style={props.style} preload="auto" muted="muted" src={props.source}  controls="controls" autoplay="true">
                        <source src="" type="video/mp4"/>
                        not supported
                    </video>
                </div>
            </div>
        </div>
    )
}

export default Video
