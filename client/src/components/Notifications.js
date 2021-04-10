import React, { useEffect, useState } from 'react'
import { Card, Feed } from 'semantic-ui-react'
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';


const Notifications = () => {
    const [notifs,setNotifs] = useState([]);

    const userLogin = useSelector(state=>state.userLogin);
    const {userInfo} = userLogin;

    useEffect(()=>{
        fetch(`/api/notifs/${userInfo.user._id}`)
        .then(res => res.json())
        .then(notifs =>{
          console.log(notifs.notifs);
          setNotifs(notifs.notifs);
        })
        .catch(err => {
          console.log(err)
        })
        .catch(err=>{
          console.log(err)
        })

    },[])

return (
  <Card>
    <Card.Content>
      <Card.Header>Notifications</Card.Header>
    </Card.Content>

{ notifs ?
         <Card.Content className="notif-card">
            {notifs.map( (notif) => {
                console.log(notif);
                return (
                    <div key={notif._id} class="notif">
                             <LinkContainer to={'/clubInfo/'+notif.Club_id}>
                            <Nav.Link >
                  <Feed>
                <Feed.Event>
                <Feed.Label className="feed-img" image={notif.img} />
                <Feed.Content> 
                  <Feed.Date className="feed-date" content={<Moment fromNow>{notif.createdAt}</Moment>} />
                  <Feed.Summary>
                   {notif.text} 
                   {/* For more details Check here <a href={'/clubInfo/'+notif.Club_id}></a> */}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              </Feed>
              </Nav.Link>
                        </LinkContainer>
                        <hr className="my-3" />
              </div>
           
                )
            })
            }
     
        </Card.Content>


:
<Card.Content>
<Feed>
  <Feed.Event>
    <Feed.Content>
      <Feed.Summary>
       There are no notifications to show yet.
      </Feed.Summary>
    </Feed.Content>
  </Feed.Event>
  </Feed>
  </Card.Content>
}
    {/* <Card.Content>
      <Feed>
        <Feed.Event>
          <Feed.Label image='https://ict4kids.files.wordpress.com/2013/05/mrc-2.png' />
          <Feed.Content>
            <Feed.Date content='1 day ago' />
            <Feed.Summary>
              You added <a>Jenny Hess</a> to your <a>coworker</a> group.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        <br />
        <Feed.Event>
          <Feed.Label image='https://ict4kids.files.wordpress.com/2013/05/mrc-2.png' />
          <Feed.Content>
            <Feed.Date content='3 days ago' />
            <Feed.Summary>
              You added <a>Molly Malone</a> as a friend.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image='https://ict4kids.files.wordpress.com/2013/05/mrc-2.png' />
          <Feed.Content>
            <Feed.Date content='4 days ago' />
            <Feed.Summary>
              You added <a>Elliot Baker</a> to your <a>musicians</a> group.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Card.Content> */}
  </Card>
);
}
export default Notifications;