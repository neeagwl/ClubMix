import axios from 'axios';

export const getLatestPosts =()=> async(dispatch)=>{
    try{

        dispatch({type:'GET_LATEST_POST_REQ'});

        const {data} = await axios.get('/api/posts/latest');
        console.log(data);
        dispatch({type:'GET_LATEST_POST_SUCCESS',payload:data})

    }catch(error){

        dispatch({
            type:'GET_LATEST_POST_FAIL',
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
    }
}
// export const registerPost
export const registerPost = (title,description,photo,clubId) => async (dispatch) =>{
      try {
          dispatch({
            type:'POST_REGISTER',
          })

          const config = {
            headers: {
              'Content-Type': 'application/json',
              "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
          }
          const {data} = await axios.post ('/api/addPost',{title,description,photo,clubId},config)


          dispatch({
            type:'POST_REGISTER_SUCCESS',
            payload:data,
          })

          localStorage.setItem('postInfo',JSON.stringify(data))

      } catch(error){

        dispatch({
          type:'POST_REGISTER_FAIL',
          payload:
          error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
        })
      }

    }
