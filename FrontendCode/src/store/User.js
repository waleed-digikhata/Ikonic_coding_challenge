import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import history from '../routes/History';
const apiURL = process.env.REACT_APP_API_URL;
const webURL = process.env.REACT_APP_WEB_URL
let config = {
  headers: {
    "Content-Type": "application/json",
    "Accept": 'application/json',
    'Access-Control-Allow-Origin': 'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS',
    withCredentials: true,
  }
}
// Slice
const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
    },
  },
});
export default slice.reducer

// Actions
const { loginSuccess, logoutSuccess } = slice.actions

export const login = (data) => async dispatch => {
  try {
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response.status === 401) {
        alert('Unauthorized. Please login again.')
        localStorage.removeItem('persist:root')
        dispatch(logoutSuccess());
        history.push('/')
      }
      return error;
    });
    axios.get(`${webURL}sanctum/csrf-cookie`)
      .then(async () => {
        const response = await axios.post(`${apiURL}login`, data, config)
        if (response.data && response.data.success) {
          localStorage.setItem('token', response.data.user.token)
          dispatch(loginSuccess(response.data.user));
          history.push('/dashboard')
        } else {
          alert(response.data.message+'. Invalid credentials')
        }
      })
  } catch (e) {
    return console.error(e.message);
  }
}
export const register = (data) => async dispatch => {
  try {
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response.status === 401) {
        alert('Unauthorized. Please login again.')
        localStorage.removeItem('persist:root')
        dispatch(logoutSuccess());
        history.push('/')
      }
      return error;
    });
    axios.get(`${webURL}sanctum/csrf-cookie`)
      .then(async () => {
        const response = await axios.post(`${apiURL}register`, data, config)
        if (response.data && response.data.success) {
          localStorage.setItem('token', response.data.user.token)
          dispatch(loginSuccess(response.data.user));
          history.push('/dashboard')
        } else {
          alert(response.data.message)
        }
      })
  } catch (e) {
    return console.error(e.message);
  }
}
export const logout = (data) => async dispatch => {
  try {
    axios.get(`${webURL}sanctum/csrf-cookie`)
      .then(async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        const response = await axios.post(`${apiURL}logout`, data, config)
        if (response.data && response.data.success) {
          localStorage.removeItem('token')
          localStorage.removeItem('persist:root')
          localStorage.clear()
          dispatch(logoutSuccess());
          history.push('/')
        } else {
          alert(response.data.message)
        }
      })
  } catch (e) {
    return console.error(e.message);
  }
}