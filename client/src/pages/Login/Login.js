import React, {useEffect} from "react";

/* AntD */
import {notification} from "antd";

/* Components */
import Form from "./components/Form";

/* Redux */
import {login} from "../../redux/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* Styles */
import css from "./login.module.sass";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token, meLoading, loginLoading, loginError} = useSelector(state => state.auth);
    
    useEffect(() => {
        if(token) {
            notification.success({message: "Success"});
            navigate("/dashboard")
        }
    }, [token])

    useEffect(() => {
        if(loginError){
            notification.error({message: "Error on login"});
        }
    }, [loginError])

    const handleSubmit = ({username, password}) => {
        dispatch(login({username, password}))
    }

    return(
        <div className={css.pageWrapper}>
            <Form onSubmit={handleSubmit} loading={loginLoading}/>
        </div>
    )
}

export default Login;