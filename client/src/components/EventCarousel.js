import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Carousel, Image, Row, Col} from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import {getCurrEvents} from '../actions/EventAction';
import Moment from 'react-moment';
import 'moment-timezone';


const EventCarousel = () => {

    const dispatch = useDispatch();

    const currEventList = useSelector(state => state.currEventList);
    const {loading, error, events} = currEventList;
    console.log(events);
    useEffect(() => {
      dispatch(getCurrEvents())
      }, [])
   
    return (
        <Carousel pause='hover' className='bg-dark' style={{height:"auto", position:"relative",justifyContent:"center"}}>
          {events && events.map((event) => {
            return (
            <Carousel.Item>
              {/* <Link to='/event'> */}
                <Carousel.Caption className='carousel-caption' style={{position:"static",maxWidth:"800px",margin:"auto"}}>
                  <h2 style={{color:"white",fontSize:"35px"}} >
                    {event.Title}
                  </h2>
                  <p  class="carousel-caption" style={{fontSize:"18px",position:"static",color:"whitesmoke", opacity:"1",marginBottom:"0px"}}>
                  {event.description}
                </p>
                <p class="carousel-caption" style={{position:"static",color:"whitesmoke", opacity:"1",marginBottom:"0px",paddingBottom:"0px"}}><b>START DATE :</b> <Moment format="DD/MM/YYYY">{event.Start_date}</Moment></p>
                <p class="carousel-caption" style={{position:"static",color:"whitesmoke", opacity:"1",marginTop:"0px"}}><b>END DATE :</b> <Moment format="DD/MM/YYYY">{event.End_date}</Moment></p>
                <p class="carousel-caption" style={{position:"static",color:"whitesmoke", opacity:"1",marginTop:"0px",fontWeight:"900",marginBottom:"40px"}}>
                This event is brought to you by     
               <b> <Link to={`/clubInfo/${event.postedBy._id}`} style={{color:"white"}}>
                      { event.postedBy.name.toUpperCase()}
                  </Link>
                  </b>
                </p>
                </Carousel.Caption>
              {/* </Link> */}
            </Carousel.Item>
            )
          })
        }
        </Carousel>
      )
      
}

export default EventCarousel
// import React, {useEffect, useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {Link} from 'react-router-dom';
// import {Carousel, Image, Row, Col} from 'react-bootstrap';
// import Loader from './Loader';
// import Message from './Message';
// import {getCurrEvents} from '../actions/EventAction';


// const EventCarousel = () => {

//   const [currentEvents,setCurrentEvents] = useState([]);  

//     // console.log(events);
//     useEffect(() => {
//        fetch('/api/events/current')
//        .then(res => res.json())
//        .then(events =>{
//          console.log(events);
//          setCurrentEvents(events.events);
//        })
//       }, [])
   
//       const hover_ = {
//         height:"auto", position:"relative"
//       }
//       const caption_ = {
//         position:"static",maxWidth:"800px"
//       }
//       const h2_ = {
//         color:"white",fontSize:"35px"
//       }
//       const p1 = {
//         fontSize:"25px",position:"static",color:"whitesmoke", opacity:"1",marginBottom:"0px"
//       }
//       const p2 ={
//         position:"static",color:"whitesmoke", opacity:"1",marginBottom:"0px",paddingBottom:"0px"
//       }
//       const p3={
//         position:"static",color:"whitesmoke", opacity:"1",marginTop:"0px"
//       }
//       const p4 ={
//         position:"static",color:"whitesmoke", opacity:"1",marginTop:"0px",fontWeight:"900",marginBottom:"40px"
//       }
//       const link_ ={
//         color:"white"
//       }
//     return (
//       <div>
//         <Carousel pause='hover' className='bg-dark' style={hover_}>
//           {currentEvents ?
//           currentEvents.map((event) => {
//             return (
//             <Carousel.Item>
//               {/* <Link to='/event'> */}
//                 <Carousel.Caption className='carousel-caption' style={caption_}>
//                   <h2 style={h2_} >
//                     {event.Title}
//                   </h2>
//                   <p  class="carousel-caption" style={p1}>
//                   {event.description}
//                 </p>
//                 <p class="carousel-caption" style={p2}><b>START DATE :</b> {event.Start_date}</p>
//                 <p class="carousel-caption" style={p3}><b>END DATE :</b> {event.End_date}</p>
//                 <p class="carousel-caption" style={p4}>
//                  <p>This event is brought to you by</p>    
//                 {/* <Link to='/clubInfo/:clubId' style={link_}> */}
//                      {/* {event.postedBy} */}
//                  {/* </Link> */}
//                 </p>
//                 </Carousel.Caption>
//               {/* </Link> */}
//             </Carousel.Item>
//             )
//           }):<h2>Loading..</h2>
//         }
//         </Carousel>
//       </div>

//       )
      
// }

// export default EventCarousel

