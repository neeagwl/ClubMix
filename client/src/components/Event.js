import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

const Event = ({event}) => {
   return (
    <div className="ui card">
    <div className="content" style={{ display: 'flex'}}>
    <img className="ui avatar image" src="https://ict4kids.files.wordpress.com/2013/05/mrc-2.png" />
      <div className="header" style={{marginLeft:'5px',marginTop:'4px'}}>Admin added an event</div>
    </div>
    <div className="content">
      <h4 className="ui sub header">{event.Title}</h4>
      
      <div className="ui small feed">
          <div className="event">
      <div className="content">
            <div className="description">{event.description}</div>
        </div>
        </div>
        <div className="event">
          <div className="content">
            <div className="summary">
               <a>Start Date :</a> <Moment format="DD/MM/YYYY">{event.Start_date}</Moment>
            </div>
          </div>
        </div>
       
        <div className="event">
          <div className="content">
            <div className="summary">
               <a>End Date :</a> <Moment format="DD/MM/YYYY">{event.End_date}</Moment>
            </div>
          </div>
        </div>
        {/* <div class="event">
          <div class="content">
            <div class="summary">
               <a>Helen Troy</a> added two pictures
            </div>
          </div>
        </div> */}
      </div>
    </div>
    <div className="extra content">
      <button className="ui button">Interested</button>
    </div>
  </div>
   )
};

export default Event;