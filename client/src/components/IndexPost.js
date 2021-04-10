// import React,{useState,useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {Container, Row, Col, Jumbotron, Image, ListGroup} from 'react-bootstrap';
// import {getLatestPosts} from '../actions/PostAction';
// import Message from './Message';
// import Loader from './Loader';

// const IndexPost = () => {

//     const dispatch = useDispatch ();
//     const latestPostList = useSelector(state=>state.latestPostList);
//     const {loading,error,latestPosts} = latestPostList;

//     // const upcomingEventsList = useSelector(state=>state.upcomingEventsList);
//     // const {loading,error,upcomingEvents} = upcomingEventsList;
  
//       useEffect(() => {
//         dispatch(getLatestPosts())
//       }, [])

//     const jumbotron ={

//         marginTop:"2.5rem",
//         marginLeft:"2rem",
//         padding :"0",
//     }

//     const image ={
//         marginTop :"10px",
//         height :"250px",
//         width:"250px",

//     }

//     const icon = {
//         fontSize:"29px"
//     }
    
//     const rightDiv = {
//         background:"#dde9f0",
//         marginRight :"2rem"
//     }

//     return loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant='danger'>{error}</Message>
//       ) : (
//         <div>
//             <Row >
//                 <Col sm={12} md={7}>
//                 {loading ? (<Loader/>):
//                 error ? (<Message variant='danger'>{error}</Message>):
//                  (
//                     <Jumbotron style={jumbotron} className="px-4">
//                         <h3 style={{textAlign:"left"}}>All Posts</h3>
//                         <ListGroup variant="flush">
//                             {latestPosts.map((post)=>(
//                                 <ListGroup.Item key={post._id}>
//                                     <Row>
//                                         <Col>
//                                             <h4 style={{color:"#2437a3"}}>{post.heading}</h4>  //Also Show club name
//                                         </Col>
//                                         <Col style={{textAlign:"right", }}>
//                                            <p>{post.createdAt}</p>
//                                         </Col>
//                                     </Row>
//                                     {post.photo && (
//                                         <Row>
//                                             <Col>
//                                                <p>{post.description}</p>
//                                             </Col>
//                                             <Col>
//                                                 <Image style= {image} src={post.photo} rounded />
//                                             </Col>
//                                         </Row>
//                                     )}
//                                     <p>{post.like}<i class="fa fa-thumbs-up " style={icon}></i></p>
//                                 </ListGroup.Item>
//                             ))}
//                         </ListGroup>
//                     </Jumbotron>
//                 )}
//                 </Col>
//                 <Col>
//                         <div style={rightDiv}>
//                             <div>
//                             <h3 style={{marginLeft:"1rem"}}>Upcoming Events!</h3>
//                             </div>
//                             <ListGroup>
//                                     <ListGroup.Item >
//                                         <Row>
//                                             <Col>
//                                                 <h4>EVENT TITLE</h4>
//                                             </Col>
//                                             <Col style={{textAlign:"right", }}>
//                                                 <p>CLUB NAME</p>
//                                             </Col>
//                                         </Row>
//                                         <h6 ><stong>25 JULY 2021- 27 JULY 2021</stong></h6>
//                                         <p>Ut enim ad minim veniam, quis nostrud
//                                              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        
//                                     </ListGroup.Item>
//                             </ListGroup>
//                         </div>
    
//                 </Col>
//             </Row>
//         </div>
//       )
// }

// export default IndexPost

import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Row, Col, Jumbotron, Image, ListGroup, Button} from 'react-bootstrap';
import {getLatestPosts} from '../actions/PostAction';
import Message from './Message';
import Loader from './Loader';
import Moment from 'react-moment';
import 'moment-timezone';

const IndexPost = () => {

    const [latestPosts,SetLatestPosts] = useState([]);
    const [upcomingEvents,setUpcomingEvents] = useState([]); 
    
    const userLogin = useSelector(state=>state.userLogin);
    const {loading,error,userInfo} = userLogin;
  console.log(userInfo);
      useEffect(() => {
            fetch('/api/posts/latest')
            .then(res => res.json())
            .then(posts =>{
                // console.log(posts);
                SetLatestPosts(posts.posts);
            })
            fetch('/api/events/upcoming')
            .then(res => res.json())
            .then(events =>{
                // console.log(events);
                setUpcomingEvents(events.events);
            })
      }, [])


        const likePost = (id) => {
            fetch('/api/like',{
                method:"put",
                headers:{
                    "Content-Type" :"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("jwt")
                },
                body:JSON.stringify({postId:id})
            }).then(res => res.json()).then(result =>{
                const newlatestPosts = latestPosts.map(post =>{
                    if(post._id == result._id){
                        return result
                    }else{
                        return post
                    }
                })
             SetLatestPosts(newlatestPosts);
            }).catch(err =>{
                console.log(err);
            })
        }

        const unlikePost = (id) => {
            fetch('/api/unlike',{
                method:"put",
                headers:{
                    "Content-Type" :"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("jwt")
                },
                body:JSON.stringify({postId:id})
            }).then(res => res.json()).then(result =>{
                const newlatestPosts = latestPosts.map(post =>{
                    if(post._id == result._id){
                        return result
                    }else{
                        return post
                    }
                })
             SetLatestPosts(newlatestPosts);
            }).catch(err =>{
                console.log(err);
            })
        }


    const jumbotron ={
        background:"#dde9f0",
        marginTop:"2.5rem",
        marginLeft:"2rem",
        padding :"0",
    }

    const image ={
        marginTop :"10px",
        height :"250px",
        width:"250px",

    }

    const icon = {
        fontSize:"29px"
    }
    
    const rightDiv = {
        background:"#dde9f0",
        marginRight :"2rem",
        marginTop:"1rem"
    }

    return (
        <div>
            <Row >
                <Col sm={12} md={7}>
                    <Jumbotron style={jumbotron} className="px-4">
                        <Button style={{textAlign:"left", width:"100%"}} variant="outline-info" ><h5>All Posts</h5></Button>
                        <ListGroup variant="flush">
                            {latestPosts && latestPosts.map((post)=>{
                                return (
                                <ListGroup.Item key={post._id}>
                                    <Row>
                                        <Col>
                                            <h6 style={{color:"black"}}>{post.heading}</h6>
                                            {/* <h4>{post.postedBy._id}</h4> */}
                                             {/* //Also Show club name */}
                                             <a href={`/clubInfo/${post.postedBy._id}` } >{post.postedBy.name}</a>
                                        </Col>
                                        <Col style={{textAlign:"right", }}>
                                           <p><Moment fromNow>{post.createdAt}</Moment></p>
                                        </Col>
                                    </Row>
                                {/* {post.photo && ( */}
                                        <Row>
                                            <Col>
                                               <p>{post.description}</p>
                                            </Col>
                                            <Col>
                                                <Image style= {image} src={post.photo} rounded />
                                            </Col>
                                        </Row>
                                    {/* )} */}

                                      {
                                          post.likes.includes(userInfo.user._id)
                                          ?<i class="fa fa-thumbs-down "  onClick={()=>{unlikePost(post._id)}} style={icon}></i>
                                          :<i class="fa fa-thumbs-up "  onClick={()=>{likePost(post._id)}} style={icon}></i>
                                      }     

                                    <p>Likes: {post.likes.length}</p>
                                </ListGroup.Item>
                                )
                            }
                            )}
                        </ListGroup>
                    </Jumbotron>
                
                </Col>
                <Col>
                        <div style={rightDiv}>
                            <div>
                            <Button style={{ width:"100%"}} variant="outline-info" ><h5>Upcoming Events!</h5></Button>
                            </div>
                            <ListGroup>
                                { upcomingEvents && upcomingEvents.map(event=>{
                                    return (
                                    <ListGroup.Item >
                                        <Row>
                                            <Col>
                                                <h5>{event.Title}</h5>
                                            </Col>
                                            <Col style={{textAlign:"right", }}>
                                             {/* <a href={`/clubInfo/${event.postedBy._id}` } >{event.postedBy.name}</a> */}
                                            <p><a href={`/clubInfo/${event.postedBy._id}`} >{event.postedBy.name}</a></p>
                                                {/* <p>CLUB NAME</p> */}
                                            </Col>
                                        </Row>
                                        <h6 ><stong><Moment format="DD/MM/YYYY">{event.Start_date}</Moment>- 
                                                    <Moment format="DD/MM/YYYY">{event.End_date}</Moment>
                                        </stong></h6>
                                        <p>{event.description}</p>
                                    </ListGroup.Item>
                                    )
                                })
                                 }
                            </ListGroup>
                        </div>
    
                </Col>
            </Row>
        </div>
      )
}

export default IndexPost
