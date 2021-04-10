import React,{useState,useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Message from './Message';
import Loader from './Loader';
import {registerPost} from '../actions/PostAction';
import FormContainer from './FormContainer';


const AddPostForm = ({location,clubId}) => {

    const history = useHistory();

    const[title,setTitle] = useState("");
    const[description,setDescription] = useState("");
    const[photo,setPhoto] = useState("");
    const[url,setUrl] = useState(undefined);


    const dispatch = useDispatch ();

    const userLogin = useSelector(state=>state.userLogin);
    const {loading,error, userInfo} = userLogin;

    const postRegister = useSelector(state=>state.postRegister);
    const {error:errorPost, postInfo} = postRegister;

    const redirect = '/';

    useEffect(()=>{
        if(!userInfo){
            history.push(redirect)
        }
        if(url)
        {
            submitHandler();
        }
        // if(postInfo)
        // {
        //     history.push('/');
        // }
    },[url,userInfo, history]);

    const submitHandler =()=>{
        console.log(title,description,photo);
        dispatch(registerPost(title,description,photo,clubId))
     }

    const uploadPhoto= async ()=>{
        const data = new FormData();
        data.append("file",photo);
        data.append("upload_preset","insta-clone");
        data.append("cloud_name","dhr7wlz2k");
        fetch("	https://api.cloudinary.com/v1_1/dhr7wlz2k/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).then(data=>{
            setPhoto(data.url);
            setUrl(data.url);
        }).catch(err=>{
            console.log(err);
        });
    }

    const PostData = ()=>{
        if(photo)
        {
            uploadPhoto();
        }
        else{
            submitHandler();
        }

    }


    return (
        <FormContainer>
            <h1>Add Post</h1>
            <Form  onSubmit={(e)=>{
                e.preventDefault();
                PostData()
            }}>
            <Form.Group controlId='post-title'>
                    <Form.Label>
                        Post Title*
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Post Title"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>
                        Post Description*
                    </Form.Label>
                    <Form.Control as="textarea"
                        type="text"
                        placeholder="Enter Post Description"
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='photo'>
                    <Form.Label>
                        Upload Photo
                    </Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e)=>setPhoto(e.target.files[0])}
                    ></Form.Control>
                </Form.Group>  
                <Button type="submit" variant="primary">Add Post</Button>
            </Form>
        </FormContainer>
    )
}

export default AddPostForm
