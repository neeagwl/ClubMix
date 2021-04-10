import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from './Message';
import Loader from './Loader';
import {registerClub} from '../actions/ClubAction';
import FormContainer from './FormContainer';

const AddClub = ({location,history}) => {
    const [name, setName] = useState('');
    const [description,setDescription] = useState('');
    const [website_link, setWebsite_link] = useState('');
    const [insta_link, setInsta_link] = useState('');
    const [facebook_link, setFacebook_link] = useState('');
    const [twitter_link, setTwitter_link] = useState('');
    const [logo, setLogo] = useState("");
    const [url, setUrl] = useState(undefined);
    const [clubType, setClubType] = useState('');
    const [date_of_establishment,setDate_of_establishment] = useState('');
    const [contact_number,setContact_number] = useState('');
    const [club_email, setClub_email] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch ();

    const userLogin = useSelector(state=>state.userLogin);
    const {loading,error,userInfo} = userLogin;

    const clubRegister = useSelector(state=>state.clubRegister);
    const {error: errorClubRegister, clubInfo} = clubRegister;

    const redirect = location.search? location.search.split('=')[1]:'/';

    useEffect(() => {
        if(!userInfo){
            history.push(redirect)
        }
        if(url)
        {
            submitHandler();
        }
        if(clubInfo){
            history.push('/');
        }
    }, [history,userInfo,url,clubInfo,redirect])

    const submitHandler =()=>{
                dispatch(registerClub(name,description,website_link,
                    insta_link,facebook_link,twitter_link
                    ,clubType,date_of_establishment,
                    contact_number,club_email,logo
                ))
    }

    const uploadPic= async ()=>{
        const data = new FormData();
        data.append("file",logo);
        data.append("upload_preset","insta-clone");
        data.append("cloud_name","dhr7wlz2k");
        fetch("	https://api.cloudinary.com/v1_1/dhr7wlz2k/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).then(data=>{
            setLogo(data.url);
            setUrl(data.url);
        }).catch(err=>{
            console.log(err);
        });
    }
    const PostData = ()=>{
        console.log("hiii");
        if(logo)
        {
            uploadPic();
        }
        else{
            submitHandler();
        }

    }
// //////////////////
    return (
        <FormContainer>
            <h1>AddClub</h1>
            {errorClubRegister && <Message variant='danger'>{errorClubRegister}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={(e)=>{
                e.preventDefault();
                PostData()}}>
            <Form.Group controlId='name'>
                    <Form.Label>
                        Club Name*
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Club name"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>
                        Club Description*
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Club Description"
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='clubType'>
                    <Form.Label>
                        Club Type*
                    </Form.Label>
                    <Form.Control as='select'
                        value={clubType}
                        onChange={e=>setClubType(e.target.value)}>
                            <option value=''>Select...</option>
                            <option value ='Social'>Social</option>
                            <option value ='Technical'>Technical</option>
                            <option value ='Sports'>Sports</option>
                            <option value ='Cultural'>Cultural</option>
                    </Form.Control>
                </Form.Group>
                 <Form.Group controlId='website_link'>
                    <Form.Label>
                        Club Website
                    </Form.Label>
                    <Form.Control
                        type="url"
                        placeholder="Enter Club website(if any)"
                        value={website_link}
                        onChange={e=>setWebsite_link(e.target.value)}
                    ></Form.Control>
                </Form.Group> 
                <Form.Group controlId='insta_link'>
                    <Form.Label>
                        Club Insta handle
                    </Form.Label>
                    <Form.Control
                        type="url"
                        placeholder="Enter Club Insta handle(if any)"
                        value={insta_link}
                        onChange={e=>setInsta_link(e.target.value)}
                    ></Form.Control>
                </Form.Group>  <Form.Group controlId='facebook_link'>
                    <Form.Label>
                        Club facebook handle
                    </Form.Label>
                    <Form.Control
                        type="url"
                        placeholder="Enter Club facebook handle(if any)"
                        value={facebook_link}
                        onChange={e=>setFacebook_link(e.target.value)}
                    ></Form.Control>
                </Form.Group>  <Form.Group controlId='twitter_link'>
                    <Form.Label>
                        Club Twitter handle
                    </Form.Label>
                    <Form.Control
                        type="url"
                        placeholder="Enter Club twitter handle(if any)"
                        value={twitter_link}
                        onChange={e=>setTwitter_link(e.target.value)}
                    ></Form.Control>
                </Form.Group> 
                {/* dd */}
                 <Form.Group controlId='date_of_establishment'>
                    <Form.Label>
                         Date of Establishment of Club
                    </Form.Label>
                    <Form.Control
                        type="Date"
                        value={date_of_establishment}
                        onChange={e=>setDate_of_establishment(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                 <Form.Group controlId='contact_number'>
                    <Form.Label>
                        Club Contact No.
                    </Form.Label>
                    <Form.Control
                        type="Number"
                        placeholder="Enter Club Contact Info"
                        value={contact_number}
                        onChange={e=>setContact_number(e.target.value)}
                    ></Form.Control>
                </Form.Group> 
                <Form.Group controlId='club_email'>
                    <Form.Label>
                        Club Email
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Club Email(if any)"
                        value={club_email}
                        onChange={e=>setClub_email(e.target.value)}
                    ></Form.Control>
                </Form.Group>  
                <Form.Group controlId='logo'>
                    <Form.Label>
                        Club Logo
                    </Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e)=>setLogo(e.target.files[0])}
                    ></Form.Control>
                </Form.Group>  

                <Button type="submit" variant="primary">Add Club</Button>
            </Form>
            <Row className="py-3">
                <Col>
                   Change your Mind?{' '}
                    <Link to='/'>
                        Home
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default AddClub
