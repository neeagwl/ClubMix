import React from "react";
import { render } from "react-dom";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import {Link,useHistory} from 'react-router-dom';
import "normalize.css/normalize.css";
import "./SliderAnimations.css";
import "./Slide.css";

var slides =[
    {
       uni:'1',
       title:"Technical",
       description:"With a motive to provide a common platform for Interdisciplinary Technical Activities of the College, The club aims to technically strengthen the students by integrating their skills in the various fields of Engineering & technology, so as to cope up with the highly competitive environment.",
       img1:"https://media.istockphoto.com/photos/innovation-and-science-concept-picture-id1177116437?s=612x612",
       img2:"",
    },
    {
        uni:'2',
        title:"Social",
        description: "A social club is a broad term describing an organization consisting of members that have a shared interest. These clubs allow people interested in an activity or subject to congregate and interact with one another.",
        img1:"https://media.gettyimages.com/vectors/abstract-network-background-vector-id912819536?s=612x612",
        img2:"",
    },
    {
       uni:'3',
       title:"Cultural",
       description: "There is abundance of cultural talent in the college premises and the Cultural club provides platform for those talents to flourish. Promote opportunities for everyone to experience culture, participate in educational programmes and develop their creative abilities.",
       img1:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8CJdlvQDH0KoH4xHyiJjzzjbkAoIeomXewg&usqp=CAU",
       img2:"",
    },
    {
        uni:'4',
        title:"Sports",
        description: "A Sport Club is a group of students organized and established to promote and develop the interests and skills of members in sport-‐related activities. The Sport Club Program is student initiated, and emphasis is placed on student leadership development, and competiveness",
        img1:"https://i.pinimg.com/736x/72/75/2f/72752f5719a50f923ecc500d8138d343.jpg",
        img2:"",
    }
    ];

const Slide = () => {
    return (
        <div className="slider-body">
    {/* <h1>{content.length} elements autoplay 1s</h1> */}
    <Slider className="slider-wrapper" autoplay={1000}>
      {slides.map((eachslide, index) => (
        <div
          key={index}
          className="slider-content"
          style={{ background: `url('${eachslide.img1}') no-repeat center center` }}
        >
          <div className="inner">
            <h1>{eachslide.title}</h1>
            <p>{eachslide.description}</p>
            {/* iss link ko button ki tarah krna hai */}
          
            <button><a href={"/showAllclub/"+ eachslide.title}>Explore</a></button>
      
            
          </div>
          <section>
            <img src={eachslide.userProfile} alt={eachslide.user} />
            <span>
              Posted by <strong>{eachslide.user}</strong>
            </span>
          </section>
        </div>
      ))}
    </Slider>
    </div>
    )
};

export default Slide;