import React ,{useEffect}from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { withRouter,Link } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {logout} from '../actions/UserAction';

const Header = ({history}) => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state=>state.userLogin);
    const {userInfo} = userLogin;



    const logoutHandler =()=>{
        dispatch(logout());
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                    <Navbar.Brand>ClubMix</Navbar.Brand>
                    </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to='/explore'>
                            <Nav.Link>Explore</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/index'>
                            <Nav.Link >Index Page</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/about'>
                            <Nav.Link>About Us</Nav.Link>
                        </LinkContainer>
                     
                        {userInfo && <LinkContainer to='/addClub'>
                            <Nav.Link><i className="fas fa-user"></i>AddClub</Nav.Link>
                            </LinkContainer>
                        }
                        {userInfo && <LinkContainer to=''>
                            <Nav.Link><i className="fas fa-bell fa-lg "></i></Nav.Link>
                            </LinkContainer>
                        }
                        {userInfo?(
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    LogOut
                                </NavDropdown.Item>
                            </NavDropdown>
                            ):(
                                <Nav>
                            <LinkContainer to='/login'>
                            <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/signup'>
                            <Nav.Link><i className="fas fa-user"></i>Register</Nav.Link>
                            </LinkContainer>
                            </Nav>
                            )
                        }
                    
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
