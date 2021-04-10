import React,{useState,useEffect,useContext} from 'react';
import { useParams } from 'react-router-dom';
import { Link }      from 'react-router-dom';
import { Card, FormGroup }      from 'react-bootstrap';
import { Button ,Row, Col}    from 'react-bootstrap';
import './ShowAllClubScreen.css';

const heading = {
    marginTop :"40px",
    textAlign:"center",
    color : "#8a165f",
    marginBottom : "40px"
}

const ShowAllClubScreen =()=>{

    const [clubs,setClubs] = useState([]);
    const {clubType} = useParams ()



useEffect(()=>{
    console.log(`/api/allClubs/${clubType}`);
   fetch(`/api/allClubs/${clubType}`)
   .then(res=>res.json())
   .then(result =>{
       console.log(result.clubs.length);
        console.log(result);
       setClubs(result.clubs);
   }).catch(err=>{
       console.log(err);
   })
   .catch(err=>{
       console.log(err);
   })

},[]);

return (
    <div >
        <h1 my-2 style= {heading}>{clubType} CLUB</h1>
        <Row className="justify-content-center">
        { clubs?
            clubs.map(club =>{
                return(
                    <div key={club._id} >
                    {/* <Row className="justify-content-center"> */}
                <Col className="order-lg-2" lg="3">
                    
                        {/* <Card className="text-center" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={club.logo} alt={club.name} />
                            <Card.Body>
                                <Card.Title>{club.name}</Card.Title>
                                <Card.Text>
                                           {club.description.substring(0,20)}....
                                </Card.Text>
                                <Link to={'/clubInfo/'+ club._id}><button>More info</button></Link>
                            </Card.Body>
                            </Card> */}

<Card className="_card">
  <Card.Img className="_card-img" variant="top" src={club.logo}  alt={club.name} />
  <Card.Body className="_card-body">
    <Card.Title className="_card-title" style={{
        color: '#3C4858',
        margin: '1.75rem 0 0.875rem',
        marginTop: '.625rem',
        fontFamily: '"Roboto Slab", "Times New Roman", serif',
        fontWeight: '900',
        textDecoration: 'none',
        fontSize: '1.5rem',
        lineHeight: '1.5em'
    }}>{club.name}</Card.Title>
    <Card.Text className="_card-text">
    {club.description.substring(0,20)}....
    </Card.Text>
    <a href={'/clubInfo/'+ club._id} ><Button className="_primary">Visit Profile</Button></a>
  </Card.Body>
</Card>
               
                </Col>
                {/* </Row> */}
                </div>
                )
            })
            :<h2>Loading!...</h2>
        }
        {/* hii */}
        </Row>
    </div>
)
    
}
 export  default ShowAllClubScreen;
