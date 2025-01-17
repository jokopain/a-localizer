import React, {useState} from "react";
import { Input, Typography } from 'antd';


const Cell = (props) => {
    const {isEditMode, initialValue, onChange, record, keyName, disabled} = props;

    const handleChange = (e) => {
        const {target: {value}} = e
        onChange(record.id, keyName, value)
    }

    return(
        <>
            {
               isEditMode && !record.removed ? 
                <Input disabled={disabled} value={initialValue} onChange={handleChange} /> 
                :
                <Typography.Text>{record.removed ? <s>{initialValue}</s> : initialValue}</Typography.Text>
            }
        </>
    );
}

export default Cell;