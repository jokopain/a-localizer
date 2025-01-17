import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux";
import store from './redux';
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css"
import {setError} from "./redux/app.slice";
import flatten from "flat";
import './index.css'
import App from './App.tsx'

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

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
        <App/>
    </Provider>
  </BrowserRouter>,
)
