import React from "react";
import './ClubHeader.css';
import { useSelector } from 'react-redux';
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

const url = {
  Social: 'https://images.squarespace-cdn.com/content/v1/51fffd7de4b00bacedcfb167/1390850171331-3JG5JOFWXSDL4D1ZKIO7/ke17ZwdGBToddI8pDm48kDrPwNVXYEunyd5GI-T5dTMUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcjnGyVxz4_7fGUBBocNlg5GFIaMd2sRlNBQxXhqLPHNahoHUF39SckYf9CqjRTAfQ/Secret-Society-Wallpaper-I--b%26w-%281000px%29.jpg',
  Cultural: 'https://wallpaperaccess.com/full/561795.png',
  Technical: 'https://wallpaperaccess.com/full/2454628.png',
  Sports: 'https://wallpaperaccess.com/full/191736.jpg'
}
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
            "url("+url[ClubProfile.clubType]+")",
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
