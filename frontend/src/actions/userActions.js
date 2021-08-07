import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from './../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({type: USER_LOGIN_REQUEST})
    const res = await axios.post(`/api/v1/users/login`, {email, password});

    const {user} = res.data.data
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user
    })

    localStorage.setItem('userInfo', JSON.stringify(user))
  } catch (error) {
    dispatch({ 
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}