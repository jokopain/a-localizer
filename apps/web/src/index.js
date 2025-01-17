import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from './redux';
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css"
import {setError} from "./redux/app.slice";
import flatten from "flat";

export const isAllowed = (rule) => {
  const {userInfo: {rules}} = store.getState().user;
  return rules.includes(rule);
}

export const onValidationError = (error) => {
  const error_notification = {
    message: "Validation Error",
    description: "",
  }
  const flatten_errors = flatten(error.data)
  const errors = []
  for (const key in flatten_errors) {
    errors.push(<li>{key.split(".")[0]}: {flatten_errors[key]}</li>)
  }

  error_notification.description = (
    <ul>
      {errors}
    </ul>
  )

  store.dispatch(setError(error_notification))
}


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
        <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
