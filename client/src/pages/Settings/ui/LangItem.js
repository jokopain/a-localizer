import React, {useState} from "react";
import { Upload, message, Button, Typography, Input, Divider } from 'antd';
import { UploadOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
import css from "../Import/import.module.sass";

const LangItem = (props) => {
    const {onChange, lang} = props;
    const [fileInfo, setFileInfo] = useState(null)

    const handleChange = (info) => {
        if(info.file.status === "removed"){
            setFileInfo(null)
            onChange(null)
            return 
        }
        setFileInfo({
            ...info.file,
            status: "uploading"
        })
        const fr = new FileReader();
        const n_file = new File([info.file.originFileObj], info.file.originFileObj.name, {type: info.file.originFileObj.type})
        fr.onload = function() {
            onChange(JSON.parse(this.result), info.file.originFileObj.name)
            setFileInfo({
                ...info.file,
                status: "done"
            })
        };
        fr.readAsText(n_file);
    }


    const uploadButton = (
        <div className={css.uploadButton}>
            <InboxOutlined />
            <div className={css.text}>Upload</div>
        </div>
      );
    return(
        <div>
            <Typography.Title level={3}>{lang}</Typography.Title>
            <div className={css.uploadWrap}>
                <Upload 
                    multiple={false}
                    listType="picture"
                    fileList={fileInfo ? [fileInfo] : []}
                    accept={[".json"]} 
                    onChange={handleChange}
                    style={{width: "100%"}}
                    >
                    {fileInfo ? null : uploadButton}
                </Upload>
            </div>
        </div>
    )
}


export default LangItem;