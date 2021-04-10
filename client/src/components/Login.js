import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import Message from '../components/Message';
import {login} from '../actions/UserAction';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';


const Login = ({location, history})=>{

  // const history = useHistory();
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");

  const dispatch = useDispatch ();
  const userLogin = useSelector(state=>state.userLogin);
  const {loading,error,userInfo} = userLogin;

  const redirect = location.search? location.search.split('=')[1]:'/explore';

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history,userInfo,redirect])

// for sending the post request to the server host
    const submitHandler =(e)=>{
      e.preventDefault();
      dispatch(login(email,password))
    }

    return(
      <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
              <Form.Label>
                  Email Address
              </Form.Label>
              <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
              ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
              <Form.Label>
                  Password
              </Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
              ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">Sign In</Button>
      </Form>
      <Row className="py-3">
          <Col>
              New Customer?{' '}
              <Link to={redirect?`/signup/${redirect}`:'/signup'}>
                  Register
              </Link>
          </Col>
      </Row>
  </FormContainer>
    )

}
export default Login;