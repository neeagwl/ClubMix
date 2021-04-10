import React, { useState,useEffect } from 'react'
import FormContainer from '../components/FormContainer';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {Link,useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Message from './Message';
import Loader from './Loader';
import {registerEvent} from '../actions/EventAction';


const AddEventForm = ({clubId}) => {
    // console.log(clubId);
    const history = useHistory();
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

    // useEffect(()=>{
    //     if(!userInfo){
    //         history.push('/')
    //     }
    // },[history]);

    const submitHandler=()=>{
        console.log(heading);
        dispatch(registerEvent(heading,description,website,start_date,end_date,clubId))
    }

    return (
        <FormContainer>
            <h1>Add Event</h1>
            <Form onSubmit={(e)=>{
                e.preventDefault();
                submitHandler()
            }}>
            <Form.Group controlId='event-heading'>
                    <Form.Label>
                        Event Heading*
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Event Heading"
                        value={heading}
                        onChange={e=>setHeading(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>
                        Event Description*
                    </Form.Label>
                    <Form.Control as="textarea"
                        type="text"
                        placeholder="Enter Post Description"
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                 <Form.Group controlId='website_link'>
                    <Form.Label>
                        Event Website
                    </Form.Label>
                    <Form.Control
                        type="url"
                        placeholder="Enter Event website(if any)"
                        value={website}
                        onChange={e=>setWebsite(e.target.value)}
                    ></Form.Control>
                </Form.Group> 
                {/* dd */}
                 <Form.Group controlId='start_date'>
                    <Form.Label>
                         Start Date*
                    </Form.Label>
                    <Form.Control
                        type="Date"
                        value={start_date}
                        onChange={e=>setStart_date(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='end_date' >
                    <Form.Label>
                         End Date*
                    </Form.Label>
                    <Form.Control
                        type="Date"
                        value={end_date}
                        onChange={e=>setEnd_date(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Add Event</Button>
            </Form>
        </FormContainer>
    )
}

export default AddEventForm
