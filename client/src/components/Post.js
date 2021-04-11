import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import './Post.css';

const Post = ({post}) => {
  // console.log(post);

const [postdata,setPostData] = useState();
useEffect(()=>{
  setPostData(post);
},[])
  const makeComment = (text,postId) =>{
    fetch('/api/comment',{
      method:"put",
      headers:{
       "Content-Type":"application/json",
       "Authorization":"Bearer "+localStorage.getItem("jwt")
   },
   body:JSON.stringify({
       postId:postId,
       text:text
   })
   }).then(res => res.json())
   .then(result =>{
     console.log(result);
     setPostData(result);
   }).catch(err=>{
     console.log(err);
   })
   }
    return (
        <div className="ui card">
    
    <div className="content" style={{ display: 'flex'}}>
   
    <img className="ui avatar image" src="https://ict4kids.files.wordpress.com/2013/05/mrc-2.png" />
      <div className="header post-header" style={{marginLeft:'10px',marginTop:'7px',}}>Admin added a Post</div>
      <div className="right floated" style={{ right:'10px',position:'absolute'}}><Moment fromNow>{post.createdAt}</Moment></div>
      </div>
  <div class="content card-cont">
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
   <div className="content">
    <span className="right floated">
      <i className="heart outline like icon"></i>
      <p>Likes: {post.likes.length}</p>
    </span>
    <i className="comment icon"></i>
    <p>Comments: {post.comments.length}</p>
  </div>
  <div>
  {
     postdata && postdata.comments.map(record =>{
        return (
          <h6 key = {record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span>{record.text}</h6>
        )
      })
    }
  </div>
  <div className="extra content">
    <div className="ui large transparent left icon input">
      {/* <i className="heart outline icon"></i> */}
      <form onSubmit = {(e)=>{ 
        e.preventDefault();
        makeComment(e.target[0].value,post._id)
      }}>
      <input type="text" placeholder="Add Comment..."></input>
       </form>
      </div>
  </div> 
</div>

    )
};

export default Post;