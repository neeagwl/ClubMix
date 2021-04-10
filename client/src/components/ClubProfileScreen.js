import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './ClubProfile.css'
// reactstrap components
import {
  Button,
  Card,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
} from "reactstrap";
import { Header, Icon, Modal } from 'semantic-ui-react';
import ClubHeader   from "./ClubHeader";
import AddEventForm from './AddEventForm';
import AddPostForm  from './AddPostForm';
import Message      from '../components/Message';
import Loader       from '../components/Loader';
import Post         from '../components/Post';
import Event        from '../components/Event';

function ClubProfile() {
         const [ClubProfile,setClubProfile] = useState(null);
         const [PostandEvent,setPostandEvent] = useState([]);
         const [UserSubscribe, setUserSubscribe] = useState(false);
         const [flag, setFlag] = useState(false);
         const {clubId} = useParams ()
         const [open, setOpen] = useState(false);
         const [open2, setOpen2] = useState(false);

         const userLogin = useSelector(state=>state.userLogin);
         const {loading, error,userInfo} = userLogin;
        
         const ModalHandler = () => {
           setOpen(false);
           setOpen2(false);
         }
         useEffect(()=>{
              fetch(`/api/clubInfo/${clubId}`)
              .then(res => res.json())
              .then(club =>{
                console.log(club);
                setClubProfile(club.club);
              })
              .catch(err=> {
                console.log(err)
              })
            .catch(err =>{
              console.log(err)
              })

              console.log(userInfo);
              fetch(`/api/allClubPostandEvent/${clubId}`)
              .then(res=>res.json())
              .then(PostsandEvents=>{
                setPostandEvent(PostsandEvents.PostsandEvents);
                
              })
              .catch(err=> {
                console.log(err)
              })
            .catch(err =>{
              console.log(err)
              })
            

              if(userInfo){
                fetch(`/api/isUserSubscribe/${clubId}/${userInfo.user._id}`)
                .then(res=>res.json())
                .then(UserSubscribe => {
                  console.log(UserSubscribe);
                  setUserSubscribe(UserSubscribe.UserSubscribe);
                })
                .catch(err=> {
                  console.log(err)
                })
              .catch(err =>{
                console.log(err)
                })
              }
            },[])

         const subscribeHandler =(e)=>{
          e.preventDefault();
          fetch(`/api/UserSubscribe/${clubId}/${userInfo.user._id}`)
          .then(res=>res.json())
          .then(UserSubscribe => {
            console.log(UserSubscribe)
            setUserSubscribe(true);
          })
          .catch(err=> {
            console.log(err)
          })
          .catch(err =>{
          console.log(err)
          })
  } 
  
   const unsubscribeHandler = (e)=>{
    e.preventDefault();
    fetch(`/api/UserUnsubscribe/${clubId}/${userInfo.user._id}`)
    .then(res=>res.json())
    .then(UserSubscribe => {
      setUserSubscribe(false);
    })
    .catch(err=> {
        console.log(err)
      })
    .catch(err =>{
      console.log(err)
      })
  
 }

  return (
    <>
    {error && <Message variant='danger'>{error}</Message>}
    {loading && <Loader/>}
      { ClubProfile && <ClubHeader ClubProfile={ClubProfile} /> }
    { ClubProfile ?
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={ClubProfile.logo}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  { ClubProfile && userInfo && ClubProfile.clubAdmin.id !== userInfo._id &&
                  <div>
                     {UserSubscribe ? 
                      <Button
                      className="mr-4"
                      color="primary"
                      href="#pablo"
                      onClick={unsubscribeHandler}
                      size="sm"
                      style={{opacity:"0.7"}}
                    >
                    UnSubscribe
                    </Button> :
                            <Button
                            className="mr-4"
                            color="danger"
                            href="#pablo"
                            onClick={subscribeHandler}
                            size="sm"
                          >
                          Subscribe
                          </Button>
            }
                  </div>

                  }
                    
                  {/* <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button> */}
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        {/* events ka counts likhna hai */}
                        <span className="heading">{ClubProfile.event_count}</span>
                        <span className="description">Events</span>
                      </div>
                      <div>
                        {/* posts ka counts likhna hai */}
                        <span className="heading">{ClubProfile.post_count}</span>
                        <span className="description">Posts</span>
                      </div>
                      <div>
                        {/* subscribers ka count likhna hai */}
                        <span className="heading">{ClubProfile.subscribedBy.length}</span>
                        <span className="description">Subscribers</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    Club Name
                    <span className="font-weight-light"> {ClubProfile.name}</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    ALLAHABAD
                  </div>
                    {ClubProfile.date_of_establishment && (
                      <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {ClubProfile.date_of_establishment.substring(0,10)}
                      </div>)
                    }
                  <div>
                    <i className="ni education_hat mr-2" />
                    MNNIT ALLAHABAD
                  </div>
                  <div className="text-left">
                    {
                      ClubProfile.facebook_link && (
                        <div>
                          <a href={ClubProfile.facebook_link} ><i class="fa fa-facebook"></i>{ClubProfile.facebook_link}</a>
                        </div>
                      )
                    }
                    {
                      ClubProfile.twitter_link && (
                        <div>
                        <a href={ClubProfile.twitter_link} ><i class="fa fa-twitter"></i>{ClubProfile.twitter_link}</a>
                        </div>
                      )
                    }
                    {
                      ClubProfile.insta_link && (
                        <div>
                        <a href={ClubProfile.insta_link} ><i class="fa fa-instagram"></i>{ClubProfile.insta_link}</a>
                        </div>
                      )
                    }
                  {/* linkedin link datatbase mein bhi add krna hoga */}
                  {/* <div>
                  <a href="#" ><i class="fa fa-linkedin"></i>{ClubProfile.linkedIn_link}</a>
                  </div> */}
                  </div>
                  <hr className="my-4" />
                  <p>
                   {ClubProfile.description.substring}
                  </p>
                  {/* iska hisab samjh ni aaya */}
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">View Posts and Events</h3>
                  </Col>
                  {/* {ClubProfile && userInfo && ClubProfile.clubAdmin.id === userInfo._id && */}
                  <Col className="text-right" xs="4">
                  <Modal
                      closeIcon
                      open={open}
                      trigger={<Button className="margin-right"
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                    ADD EVENT
                  </Button>}                     
                     onClose={() => setOpen(false)}
                     onOpen={() => setOpen(true)}
                    >
                    <AddEventForm clubId={ClubProfile._id} ModalHandler={ModalHandler}/>
                    </Modal>
                                  
                    <Modal
                      closeIcon
                      open={open2}
                      trigger={<Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >ADD POST
                      </Button>}                     
                     onClose={() => setOpen2(false)}
                     onOpen={() => setOpen2(true)}
                    >
                     <AddPostForm clubId={ClubProfile._id}  ModalHandler={ModalHandler}/>
                    </Modal>
                  </Col>
                  {/* } */}
                  {/* {ClubProfile && userInfo && ClubProfile.clubAdmin.id === userInfo._id &&
                      <Col className="text-right" xs="4">
                      <Button className="margin-right"
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          ADD EVENT
                        </Button>
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          ADD POST
                        </Button>
                      </Col>
                  } */}
                 
                </Row>
              </CardHeader>
                  
                
            <CardBody>
              { PostandEvent.map(PostandEvent=>{
        
        if(PostandEvent.data_type == "Event")
        return  <Event  event={PostandEvent} />
        else if(PostandEvent.data_type == "Post")
        return <Post  post={PostandEvent} />
 })
}
</CardBody>
            </Card>
            
          </Col>
        </Row>
      </Container>
     :<h2>Loading!...</h2>}
     
 

    </>
  );
}

export default ClubProfile;
