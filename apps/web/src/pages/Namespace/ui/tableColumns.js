import {  Button } from 'antd';
import {PlusOutlined, DeleteOutlined, ReloadOutlined} from "@ant-design/icons";
import Cell from './Cell';
import { isAllowed } from '../../..';


const DEF_COLUMN = ({isEditMode, onValueChange}) => ( {
    title: "Key",
    dataIndex: "keyName",
    key: "key",
    width: 300,
    fixed: "left",
    render: (value, record) => {
        return <Cell 
                isEditMode={isEditMode}
                keyName={"keyName"}
                initialValue={value}
                disabled={!isAllowed("string:edit_key")}
                record={record}
                onChange={onValueChange}
            />
    }
})


export const columns = (isEditMode, onValueChange, languages, onAdd = () => {}, onRemove, onRestore) => {
    const columns = [DEF_COLUMN({isEditMode, onValueChange})];

    for (const lang of languages) {
        columns.push({
            title: `${lang.name}`,
            dataIndex: `${lang.locale}:text`,
            key: `${lang.locale}:text`,
            width: 500,
            render: (value, record) => {
                return <Cell 
                        isEditMode={isEditMode}
                        keyName={`${lang.locale}:text`}
                        initialValue={value}
                        record={record}
                        onChange={onValueChange}
                    />
            }
        })
    }

    if(isEditMode && isAllowed("string:add") && isAllowed("string:remove")){
        columns.unshift({
            title: () => <Button type='primary' onClick={onAdd} icon={<PlusOutlined />}/>,
            dataIndex: "add",
            key: "add",
            width: 48,
            fixed: "left",
            render: (value, record) => {
                const handleRemove = () => {
                    if(record.removed){
                        onRestore(record)
                    } else {
                        onRemove(record)
                    }
                }
                return record.removed ?
                    <Button type='primary' onClick={handleRemove} icon={<ReloadOutlined />}/>
                    :
                    <Button danger onClick={handleRemove} icon={<DeleteOutlined />}/>
            }
        })
    }

    return columns
}