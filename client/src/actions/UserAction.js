import axios from 'axios';
// import history from '../history'

export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: 'USER_LOGIN_REQ',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/login',
        { email, password },
        config
      )
      // console.log(data);
  
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
      })
      localStorage.setItem("jwt",data.token)
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: 'USER_LOGIN_FAIL',
        payload:
        error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
      })
    }
  }

  export const register = (name,email, password, registration_no) => async (dispatch) => {
    try {
      dispatch({
        type: 'USER_REGISTER_REQ',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/signup',
        { name,email, password , registration_no},
        config
      )
  
      dispatch({
        type: 'USER_REGISTER_SUCCESS',
        payload: data,
      })

      // dispatch({
      //   type: 'USER_LOGIN_SUCCESS',
      //   payload: data,
      // })
  
      // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: 'USER_REGISTER_FAIL',
        payload:
        error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
      })
    }
  }

  export const logout=()=>(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({type:'USER_LOGOUT'})
    dispatch({type:'USER_REGISTER_RESET'})
    document.location.href='/login'
  }
