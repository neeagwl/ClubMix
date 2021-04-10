import React from "react";
import './ClubHeader.css';
import { useSelector } from 'react-redux';
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";


function ClubHeader({ClubProfile}) {
  // console.log(ClubProfile);
  const userLogin = useSelector(state=>state.userLogin);
  const {loading, error,userInfo} = userLogin;
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="blur d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">{ClubProfile.name} CLUB</h1>
              <p className="text-white mt-0 mb-5 margin-left">
             {ClubProfile.description}
              </p>
              { ClubProfile && userInfo && ClubProfile.clubAdmin.id !== userInfo._id &&
              <Button className="margin-left"
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Edit profile
              </Button>
              }
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ClubHeader;
