import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchNetworkCounts } from "../store/NetworkCount"
const apiURL = process.env.REACT_APP_API_URL;
const webURL = process.env.REACT_APP_WEB_URL;
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
    name: 'Connections',
    initialState: {
        data: null,
    },
    reducers: {
        onConnectionSuccess: (state, action) => {
            state.data = action.payload;
        },
    },
});
export default slice.reducer

// Actions
const { onConnectionSuccess } = slice.actions

export const fetchConnections = (data) => async dispatch => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        const response = await axios.get(`${apiURL}get-connections?page=${data.page}`, config)
        if (response.data && response.data.success) {
             dispatch(onConnectionSuccess(response.data.data));
             return response.data.data
        } else {
            alert(response.data.message)
        }
    } catch (e) {
        return console.error(e.message);
    }
}

export const deleteUserConnection = (data,getConnections) => async dispatch => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      axios.get(`${webURL}sanctum/csrf-cookie`)
        .then(async () => {
          const response = await axios.post(`${apiURL}destroy`, data, config)
          if(response.data && response.data.success){
            getConnections(1,true)
            dispatch(fetchNetworkCounts(data.token));
            return response.data
          }else{
             alert(response.data.msg)
          }
        })
  
      // 
    } catch (e) {
      return console.error(e.message);
    }
}