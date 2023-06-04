import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/app.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react';
// const { PUBLIC_URL } = process.env;
import { BrowserRouter } from "react-router-dom";
import Spinner from './components/spinner/spinner'
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
