import React, {useState} from "react";
import { Upload, message, Button, Typography, Input, Divider, Form, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useSelector} from "react-redux"; 
import flatten from "flat";
import LangItem from "../ui/LangItem";
import API from "../../../api";

import css from "./import.module.sass";

const Import = () => {
    const {items} = useSelector(state => state.language);
    const [localeFiles, setLocaleFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleChange = (locale) => (file, file_name) => {
        if(file){
            if(!localeFiles.length) {
                form.setFieldsValue({slug: file_name.replace(".json", "")})
            }
            if(!localeFiles.find(l => l.locale === locale)){
                setLocaleFiles([...localeFiles, {
                    locale,
                    data: flatten(file)
                }])
            }
        } else {
            setLocaleFiles(localeFiles.filter(l => l.locale !== locale))
        }
        
    }

    const handleSubmit = async (values) => {
        const { namespace, slug } = values;
        console.log(localeFiles);
        if(localeFiles.length !== items.length){
            return notification.error({
                message: "Please add file to all locales"
            })
        }
        setLoading(true)
        const response = await API.Import({
            namespace, slug,
            imports: localeFiles
        })
        setLoading(false)

    }

    return(
        <div className={css.wrapper}>
            <Form 
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                form={form} 
                style={{width: 300}} 
                onFinish={handleSubmit}>
                <Form.Item name={"namespace"} label="Namespace">
                    <Input />
                </Form.Item>
                <Form.Item name={"slug"} label="Slug">
                    <Input />
                </Form.Item>
            </Form>
            <Divider />
            {
                items.map(item => <LangItem lang={item.name} onChange={handleChange(item.locale)}/>)
            }
            <Divider />
            <Button type="primary" onClick={() => form.submit()}>Import</Button>
        </div>
    );
}

export default Import;