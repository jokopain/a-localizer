import React, {useEffect} from "react";
import {Form, Input, Button, Typography, notification} from "antd";
import css from "../login.module.sass";


const LoginForm = (props) => {
    const {onSubmit: handleSubmit, loading} = props;

    return(
        <div className={css.form}>
            <Typography.Title level={2}>
                A-Localize
            </Typography.Title>
            <Typography.Title level={4}>
                Sign in
            </Typography.Title>
            <Form onFinish={handleSubmit} >
                <Form.Item 
                    label="username" 
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input />
                </Form.Item>
                <Form.Item 
                    label="password" 
                    name={"password"}
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input.Password />
                </Form.Item>
                <Button loading={loading} type="primary" htmlType="submit"> Login </Button>
            </Form>
        </div>
    );
}

export default LoginForm;