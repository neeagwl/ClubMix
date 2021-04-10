import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import EventCarousel from './EventCarousel';
import IndexPost from './IndexPost';

const IndexScreen = () => {
    return (
        <div style={{marginTop:"20px"}}>
            <EventCarousel/>
            <Button style={{margin:"auto"}}>See What's Happening...</Button>
            <IndexPost/>
        </div>
    )
}

export default IndexScreen
