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
    name: 'Suggestions',
    initialState: {
        data: null,
    },
    reducers: {
        onSuccess: (state, action) => {
            state.data = action.payload;
        }
    },
});
export default slice.reducer

// Actions
const { onSuccess } = slice.actions

export const fetchSuggestions = (data) => async dispatch => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        const response = await axios.get(`${apiURL}get-suggestions?page=`+data.page, config)
        if (response.data && response.data.success) {
             dispatch(onSuccess(response.data.data));
             return response.data.data
        } else {
            alert(response.data.message)
        }
    } catch (e) {
        return console.error(e.message);
    }
}

export const sendRequests = (data,getSuggestions) => async dispatch => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      axios.get(`${webURL}sanctum/csrf-cookie`)
        .then(async () => {
          const response = await axios.post(`${apiURL}send-request`, data, config)
          if(response.data && response.data.success){
            getSuggestions(1)
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