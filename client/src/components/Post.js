import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

const Post = ({post}) => {
  console.log(post);
    return (
        <div className="ui card">
    
    <div className="content" style={{ display: 'flex'}}>
   
    <img className="ui avatar image" src="https://ict4kids.files.wordpress.com/2013/05/mrc-2.png" />
      <div className="header" style={{marginLeft:'5px',marginTop:'4px'}}>Admin added a Post</div>
      <div className="right floated meta" style={{ right:'10px',position:'absolute'}}><Moment fromNow>{post.createdAt}</Moment></div>
      </div>
  <div class="content">
      <div class="header">{post.heading}</div>
      {/* <div class="meta">
        <a>Friends</a>
      </div> */}
      <div class="description">
        {post.description}
      </div>
    </div>
  <div className="image">
    {/* Add the image link in src */}
     <img src={post.photo} alt="No image"/>
  </div>
  {/* <div className="content">
    <span className="right floated">
      <i className="heart outline like icon"></i>
      17 likes
    </span>
    <i className="comment icon"></i>
    3 comments
  </div> */}
  {/* <div className="extra content">
    <div className="ui large transparent left icon input">
      <i className="heart outline icon"></i>
      <input type="text" placeholder="Add Comment..."></input>
    </div>
  </div> */}
</div>

    )
};

export default Post;