import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from './../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({type: USER_LOGIN_REQUEST})

    const res = await axios.post(`/api/v1/users/login`, {email, password})
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

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}

export const register = (name, email, password, passwordConfirm) => async (dispatch) => {
  try {
    dispatch({type: USER_REGISTER_REQUEST})

    const userInput = {
      name, email, password, passwordConfirm
    }

    const res = axios.post('/api/v1/users', userInput)
    const {user} = (await res).data.data

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: user
    })
    //sign user in after successful registration
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user
    })
    localStorage.setItem('userInfo', JSON.stringify(user))
  } catch (error) {
    dispatch({ 
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}