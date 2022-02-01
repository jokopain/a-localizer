import React, {useEffect, useState} from "react";

import JSZip from "jszip"

import {Progress, Card, Typography, Button} from "antd";
import { saveAs } from 'file-saver';
import {changeExportStatus} from "../../../redux/namespace.slice";
import { useDispatch } from "react-redux";

import css from "../manage.module.sass"

const ExportProgress = (props) => {
    const {status = "", percent = 0, exportData, onClose: handleClose} = props
    const dispatch = useDispatch();
    const [file, setFile] = useState(null)

    useEffect(() => {
        if(exportData){
            dispatch(changeExportStatus({
                text: "Generating ZIP",
                percent: 80
            }))

                    
            const zip = new JSZip();

            for (const key in exportData.locales) {
                zip.file(`${exportData.slug}_${key}.json`, JSON.stringify(exportData.locales[key], null, 2))
            }

            dispatch(changeExportStatus({
                text: `Generating ZIP`,
                percent: 90
            }))
            zip.generateAsync({type:"blob"}).then((f) => {
                setFile(f)
                dispatch(changeExportStatus({
                    text: "Done",
                    percent: 100
                }))
            })

        }
    }, [exportData])

    const handleDownload = async () => {
        
        saveAs(file, `${exportData.slug}.zip`)
        
    }

    return(
        <div className={css.exportProgress}>
            <Card className={css.inner}>
                <div className={css.header}>
                    <Typography.Title level={3} type="secondary">
                        Status:
                    </Typography.Title>
                    <Typography.Title level={3}>
                        {status}
                    </Typography.Title>
                </div>
                <Progress percent={percent} status="active"/>
                {file && <Button.Group>
                    <Button type="primary" onClick={handleDownload}>Download</Button>
                    <Button type="primary" onClick={handleClose}>Close</Button>
                </Button.Group>}
            </Card>
        </div>
    );
}

export default ExportProgress;