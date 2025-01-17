import React, {useEffect, useState} from "react";

/* AntD */
import {Spin, Typography} from "antd"

/* Utils */
import SyntaxHighlighter from 'react-syntax-highlighter';
import nextconfig from "./next.config"

/* API */
import API from "../../../api";

/* Styles */
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import css from "./api.module.sass";

const APIPage = () => {
    const [loading, setLoading] = useState(false);
    const [keys, setKeys] = useState([])

    const fetchAPIKeys = async () => {
        setLoading(true)
        const response = await API.APIKeys.find();
        setKeys(response);
        setLoading(false)
    }

    useEffect(() => {
        fetchAPIKeys()
    }, [])

    return(
        <div className={css.wrapper}>
            <Typography.Title>
                Your API Keys:
            </Typography.Title>
            {
                loading ? <Spin/> : 
                keys.map(key => (
                    <SyntaxHighlighter key={key.api_key} language="javascript" style={docco}>
                        {key.api_key}
                    </SyntaxHighlighter>
                ))
            }
            <Typography.Title>
                Install on Next.JS
            </Typography.Title>
            <Typography.Text color="secondary">
                ./next-i18next.config.js
            </Typography.Text>
            <SyntaxHighlighter language="javascript" style={docco}>
                {nextconfig}   
            </SyntaxHighlighter>
        </div>
    )
}

export default APIPage;