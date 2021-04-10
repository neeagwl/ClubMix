import axios from 'axios';
// import { push } from "connected-react-router";



export const registerClub = (name,description,website_link,insta_link,facebook_link,twitter_link
    ,clubType,date_of_establishment,contact_number,club_email,logo)=> async(dispatch)=>{
      try {
          dispatch({
            type:'CLUB_REGISTER',
          })

          const config = {
            headers: {
              'Content-Type': 'application/json',
              "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
          }
          const {data} = await axios.post ('/api/addClub',{name,description,website_link,insta_link,facebook_link,twitter_link
            ,clubType,date_of_establishment,contact_number,club_email,logo},config)


          dispatch({
            type:'CLUB_REGISTER_SUCCESS',
            payload:data,
          })

          localStorage.setItem('clubInfo',JSON.stringify(data))

      } catch(error){

        dispatch({
          type:'CLUB_REGISTER_FAIL',
          payload:
          error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
        })
      }

    }