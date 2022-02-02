import React, {useState} from "react";
import { Descriptions, Button, Form, Input } from 'antd';

import {updateNamespaces} from "../../../redux/namespace.slice";
import { useDispatch } from "react-redux";

/* Utils */
import {isAllowed} from "../../../index";

import css from "../manage.module.sass";

const NamespaceItem = (props) => {
    const {name, slug, id, onExport: handleExport} = props;
    const [editMode, setEditMode] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleCancel = () => {
        setEditMode(false)
        form.resetFields()
    }

    const handleSubmit = (values) => {
        dispatch(updateNamespaces({
            slug: slug,
            data: {...values, id}
        }))
        setEditMode(false)
    }

    return(
            <Form form={form} onFinish={handleSubmit} initialValues={{name, slug}}>
                <Descriptions 
                    title={name} 
                    bordered 
                    column={1} 
                    extra={!editMode ? 
                        <div className={css.tools} key={"one"}>
                            <Button type="primary" onClick={() => handleExport(slug)}>Export</Button>
                            <Button type="primary" htmlType="button" onClick={() => setEditMode(true)}>Edit</Button>
                        </div>
                        :
                        <div className={css.tools} key={"two"}>
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
                        <Descriptions.Item label="Slug">
                            <Form.Item name={"slug"}>
                                {editMode ? <Input disabled={!isAllowed("namespace:edit_slug")}/> : slug}
                            </Form.Item>
                        </Descriptions.Item>
                </Descriptions>
            </Form>
    );
}


export default NamespaceItem;