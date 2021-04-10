import React, { useState,useEffect } from 'react'
// import FormContainer from '../components/FormContainer';
// import {Form, Button, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Message from './Message';
import Loader from './Loader';
import {registerEvent} from '../actions/EventAction';
import {
    Card,
    FormGroup,
    Form,
    Container,
    Row,
    Col,
    CardHeader,
    CardBody,
    Input,
  } from "reactstrap";
  import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import './PostForm.css';

const AddEventForm = ({history,clubId,ModalHandler}) => {
    // console.log(clubId);
    const [heading,setHeading]= useState("");
    const[description,setDescription] = useState("");
    const[website,setWebsite]=useState("");
    const[start_date,setStart_date]=useState("");
    const[end_date,setEnd_date]=useState("");


    const dispatch = useDispatch ();
    
    const userLogin = useSelector(state=>state.userLogin);
    const {loading,error,userInfo} = userLogin;

    const eventRegister = useSelector(state=>state.eventRegister);
    const {error:errorEvent,eventInfo} = eventRegister;

    useEffect(()=>{
        if(!userInfo){
            history.push('/')
        }
    },[history]);

    const submitHandler=()=>{
        console.log(heading);
        ModalHandler();
        dispatch(registerEvent(heading,description,website,start_date,end_date,clubId))
    }

    return (
        // <FormContainer>
        //     <h1>Add Event</h1>
        //     <Form onSubmit={(e)=>{
        //         e.preventDefault();
        //         submitHandler()
        //     }}>
        //     <Form.Group controlId='event-heading'>
        //             <Form.Label>
        //                 Event Heading*
        //             </Form.Label>
        //             <Form.Control
        //                 type="text"
        //                 placeholder="Enter Event Heading"
        //                 value={heading}
        //                 onChange={e=>setHeading(e.target.value)}
        //             ></Form.Control>
        //         </Form.Group>
        //         <Form.Group controlId='description'>
        //             <Form.Label>
        //                 Event Description*
        //             </Form.Label>
        //             <Form.Control as="textarea"
        //                 type="text"
        //                 placeholder="Enter Post Description"
        //                 value={description}
        //                 onChange={e=>setDescription(e.target.value)}
        //             ></Form.Control>
        //         </Form.Group>
        //          <Form.Group controlId='website_link'>
        //             <Form.Label>
        //                 Event Website
        //             </Form.Label>
        //             <Form.Control
        //                 type="url"
        //                 placeholder="Enter Event website(if any)"
        //                 value={website}
        //                 onChange={e=>setWebsite(e.target.value)}
        //             ></Form.Control>
        //         </Form.Group> 
        //         {/* dd */}
        //          <Form.Group controlId='start_date'>
        //             <Form.Label>
        //                  Start Date*
        //             </Form.Label>
        //             <Form.Control
        //                 type="Date"
        //                 value={start_date}
        //                 onChange={e=>setStart_date(e.target.value)}
        //             ></Form.Control>
        //         </Form.Group>
        //         <Form.Group controlId='end_date' >
        //             <Form.Label>
        //                  End Date*
        //             </Form.Label>
        //             <Form.Control
        //                 type="Date"
        //                 value={end_date}
        //                 onChange={e=>setEnd_date(e.target.value)}
        //             ></Form.Control>
        //         </Form.Group>
        //         <Button type="submit" variant="primary">Add Event</Button>
        //     </Form>
        // </FormContainer>
        <>
        <Header icon='wpforms' content='Create a Event' />
        <Modal.Content>
            <Form id="my-form"  onSubmit={(e)=>{
            e.preventDefault();
                 submitHandler()
            }}>
                  {/* <h4 className="text-muted mb-4">
                    ADD EVENT
                  </h4> */}
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="event-heading"
                          >
                            Event Heading
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="event-heading"
                            placeholder="Heading"
                            type="text"
                            required
                            value={heading}
                           onChange={e=>setHeading(e.target.value)}
                  
                          />
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row>
                      <Col lg="12">
                          <FormGroup>
                          <label>Add Description</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about event you want to create"
                        rows="4"
                        type="textarea"
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                      />
                          </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                        <Col lg="12">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="event-website" >Event Website(if any)</label>
                                <Input
                                className="form-control-alternative"
                                id="event-website"
                                type="url"
                                value={website}
                                onChange={e=>setWebsite(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-start-date"
                          >
                            Start Date
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-start-date"
                            type="date"
                            required
                            value={start_date}
                            onChange={e=>setStart_date(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-date"
                          >
                            End Date
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-date"
                            type="date"
                            value={end_date}
                           onChange={e=>setEnd_date(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    </div>              
                  </Form> 
                  </Modal.Content>
              <Modal.Actions>
                <Button color='red' onClick={ModalHandler}>
                   <Icon name='remove' /> Close
                </Button>
                <Button type="submit" form="my-form"color='green'>
                  <Icon name='checkmark' /> Add EVENT!!
                </Button>
               </Modal.Actions>
        </>
    )
}

export default AddEventForm
