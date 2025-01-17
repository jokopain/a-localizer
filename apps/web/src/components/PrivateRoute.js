import React from "react";
import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";

const PrivateRoute = (props) => {
    const {rule, children} = props;
    const {userInfo: {rules = []} = {}, loading} = useSelector(state => state.user);
    if(loading) return null;
    if(rules.includes(rule)) return <>{children}</>
    return <Navigate to="/"/>
}

export default PrivateRoute;