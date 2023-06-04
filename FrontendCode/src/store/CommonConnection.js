import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL;

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
    name: 'CommonConnections',
    initialState: {
        data: null,
    },
    reducers: {
        onSuccess: (state, action) => {
            state.data = action.payload;
        },
    },
});
export default slice.reducer

// Actions
const { onSuccess } = slice.actions

export const fetchCommonConnections = (data) => async dispatch => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        const response = await axios.get(`${apiURL}get-common-connections?page=${data.page}&userId=${data.userId}&connectionId=${data.connectionId}`, config)
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