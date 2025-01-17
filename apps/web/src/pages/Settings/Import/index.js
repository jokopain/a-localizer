import React, {useState} from "react";

/* AntD */
import { message, Button, Spin, Input, Divider, Form, notification } from 'antd';

/* Components */
import LangItem from "../ui/LangItem";

/* Redux */
import { useDispatch } from "react-redux";
import {toggleRefetch} from "../../../redux/namespace.slice";
import {useSelector} from "react-redux"; 

/* Utils */
import flatten from "flat";
import API from "../../../api";

/* Styles */
import css from "./import.module.sass";

const Import = () => {
    const {items} = useSelector(state => state.language);
    const [localeFiles, setLocaleFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reset, setReset] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

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

    const clear = () => {
        form.resetFields()
        setLocaleFiles([])
        setReset(!reset)
    }

    const handleSubmit = async (values) => {
        const { namespace, slug } = values;
        if(localeFiles.length !== items.length){
            return notification.error({
                message: "Please add file to all locales"
            })
        }
        try {
            setLoading(true)
            await API.Import({
                namespace, slug,
                imports: localeFiles
            })
            message.success("Successfully Imported");
            dispatch(toggleRefetch(true));
        } catch (error) {
            console.log(error);
            message.error("Error on Import");
        }
        setLoading(false)
        clear()
    }

    return(
        <div className={css.wrapper}>
            <Spin spinning={loading} tip="Importing...">
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
                    items.map(item => <LangItem key={item.name} reset={reset} lang={item.name} onChange={handleChange(item.locale)}/>)
                }
                <Divider />
                <Button type="primary" onClick={() => form.submit()}>Import</Button>
            </Spin>
        </div>
    );
}

export default Import;