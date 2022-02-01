import React, {useState} from "react";
import { Descriptions, Button, Form, Input } from 'antd';

import {updateLanguage} from "../../../redux/language.slice";
import { useDispatch } from "react-redux";

import css from "../manage.module.sass";

/* Utils */
import {isAllowed} from "../../../index";

const LangItem = (props) => {
    const {name, locale} = props;
    const [editMode, setEditMode] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleCancel = () => {
        setEditMode(false)
        form.resetFields()
    }

    const handleSubmit = (values) => {
        dispatch(updateLanguage({
            locale: locale,
            data: values
        }))
        setEditMode(false)
    }

    return(
            <Form form={form} onFinish={handleSubmit} initialValues={{name, locale}}>
                <Descriptions 
                    title={name} 
                    bordered 
                    column={1} 
                    extra={!editMode ? 
                        <Button type="primary" onClick={() => setEditMode(true)}>Edit</Button>
                        :
                        <div className={css.tools}>
                            <Button type="primary" htmlType="submit">Save</Button>
                            <Button danger onClick={handleCancel}>Cancel</Button>
                        </div>
                    }
                    >
                        <Descriptions.Item label="Name">
                            <Form.Item name={"name"}>
                                {editMode ? <Input /> :  name }
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="Locale">
                            <Form.Item name={"locale"}>
                                {editMode ? <Input disabled={!isAllowed("language:edit_locale")}/> : locale}
                            </Form.Item>
                        </Descriptions.Item>
                </Descriptions>
            </Form>
    );
}


export default LangItem;