import axios from 'axios';

// export const registerEvent
export const registerEvent = (heading,description,website,start_date,end_date,clubId) => async (dispatch) =>{
    console.log("hi1");
    try {
          dispatch({
            type:'EVENT_REGISTER',
          })

          const config = {
            headers: {
              'Content-Type': 'application/json',
              "Authorization":"Bearer "+ localStorage.getItem("jwt")

            },
          }
    console.log(heading);  
          const {data} = await axios.post ('/api/addEvent',{heading,description,website,start_date,end_date,clubId},config)
          console.log(data);

          dispatch({
            type:'EVENT_REGISTER_SUCCESS',
            payload:data,
          })

          localStorage.setItem('EventInfo',JSON.stringify(data))

      } catch(error){

        dispatch({
          type:'EVENT_REGISTER_FAIL',
          payload:
          error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
        })
      }

    }

    export const getCurrEvents =()=> async(dispatch)=>{
      try{
  
          dispatch({type:'GET_CURR_EVENT_REQ'});
  
          const {data} = await axios.get('/api/events/current');
          // console.log(data);
          dispatch(
            {type:'GET_CURR_EVENT_SUCCESS',
            payload:data})
  
      }catch(error){
  
          dispatch({
              type:'GET_CURR_EVENT_FAIL',
          payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      })
      }
  }

  export const getUpcomingEvents =()=> async(dispatch)=>{
    try{

        dispatch({type:'GET_UPCOMING_EVENT_REQ'});

        const {data} = await axios.get('/api/events/upcoming');
        console.log(data);
        dispatch({type:'GET_UPCOMING_EVENT_SUCCESS',payload:data})

    }catch(error){

        dispatch({
            type:'GET_UPCOMING_EVENT_FAIL',
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
    }
}

  s