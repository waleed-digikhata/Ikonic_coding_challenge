import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
// import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import { composeWithDevTools } from "redux-devtools-extension";
import Auth from './User'
import NetworkCounts from './NetworkCount'
import Suggestions from './Suggestion'
import Requests from './Request'
import Connections from './Connection'
import CommonConnections from './CommonConnection'

const rootPersistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
  Auth,
  NetworkCounts,
  Suggestions,
  Requests,
  Connections,
  CommonConnections
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

// const reducer = combineReducers({
//   // here we will be adding reducers
//   auth:persistReducer(rootPersistConfig, auth),
//   networkCount :persistReducer(rootPersistConfig, networkCount)
// })
// const persistedReducer = persistReducer(userPersistConfig, auth)

export const store = configureStore({
  reducer:persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
},
  composeWithDevTools()
)

export const persistor = persistStore(store)
// export default store;