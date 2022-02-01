import React from "react";
import {useSelector} from "react-redux";

const PrivateComponent = (props) => {
    const {rule, children, placeholder = <></>, ...rest} = props;
    const {userInfo: {rules}} = useSelector(state => state.user);

    if(rules.includes(rule)){
        return React.Children.map(children, child => React.cloneElement(child, {...rest}))
    }
    return placeholder;
}

export default PrivateComponent;