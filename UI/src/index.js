import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignIn from './SignIn';
import { Check } from '@material-ui/icons';
import Checkout from './Checkout';
import AppBarmenu from './AppBarmenu';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>,document.getElementById('root')
     //<Checkout />
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
