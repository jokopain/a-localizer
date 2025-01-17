import React, { useEffect, useState } from "react";

/* AntD */
import { Table, Button, Input } from 'antd';
import { SearchOutlined } from "@ant-design/icons";

/* Components */
import UserEditModel from "./ui/UserEditModal";
import ToolBar from "../../../components/ToolBar";

/* Redux */
import {findUsers, createUser, updateUser, setCurrentPage} from "../../../redux/users.slice";
import {useDispatch, useSelector} from "react-redux";

/* Styles */
import css from "./users.module.sass";


const Users = () => {
    const {items, total, currentPage, loading, pageSize, refetch} = useSelector(state => state.users);
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState(null);
    const [searchMode, setSearchMode] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findUsers({
            offset: (currentPage * pageSize) - pageSize,
            limit: pageSize
        }))
    }, [currentPage])

    useEffect(() => {
        if(refetch){
            dispatch(findUsers({
                offset: (currentPage * pageSize) - pageSize,
                limit: pageSize
            }))
            setFormData(null)
            setVisible(false)
        }
    }, [refetch])

    const pagination = {
        pageSize: pageSize,
        currentPage: currentPage, 
        position: [ "bottomLeft" ],
        total: total || 0,
        // disabled: touched || searchMode ? true : false,
        onChange: (page) => {
            dispatch(setCurrentPage(page))
        }
    }


    const handleEdit = (record) => {
        setFormData(record)
        setVisible(true)
    }
    
    const handleRemove = (record) => {

    }

    const handleAdd = () => {
        setFormData({
            username: "",
            firstName: "",
            lastName: "",
            role: "translator"
        })
        setVisible(true)
    }

    const handleSearch = (e) => {
        const {target: {value}} = e;
        if(currentPage !== 1){
            dispatch(setCurrentPage(1))
        }

        if(value){
            if(!searchMode) setSearchMode(true)
            dispatch(findUsers({
                offset: 0,
                limit: pageSize,
                search: {in: ["username", "firstName", "lastName", "role"], str: value}
            }))
        } else {
            setSearchMode(false)
            dispatch(findUsers({
                offset: 0,
                limit: pageSize,
            }))
        }
    }
    
    const columns = [
        {
            title: `username`,
            dataIndex: `username`,
            key: `username`,
            width: 500,
        },
        {
            title: `First Name`,
            dataIndex: `firstName`,
            key: `firstName`,
            width: 500,
        },
        {
            title: `Last Name`,
            dataIndex: `lastName`,
            key: `lastName`,
            width: 500,
        },
        {
            title: `Role`,
            dataIndex: `role`,
            key: `role`,
            width: 500,
        },
        {
            title: `Action`,
            dataIndex: `action`,
            key: `id`,
            width: 500,
            render: (_, record) => {
                return (
                    <div className={css.tools}>
                        <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
                        {/* <Button danger onClick={() => handleRemove(record)}>Remove</Button> */}
                    </div>
                )
            }
        },
    ]

    return(
        <div className={css.wrapper}>
            <UserEditModel 
                visible={visible} 
                onOk={() => setVisible(false)} 
                onCancel={() => setVisible(false)} 
                formData={formData}
                />
            <ToolBar>
                <Button type="primary" onClick={handleAdd}>Add User</Button>
                <Input 
                    allowClear 
                    prefix={<SearchOutlined />} 
                    type={"search"} 
                    placeholder="Search..." 
                    onChange={handleSearch}
                />
            </ToolBar>
            <Table 
                scroll={{ x: 1300 }}
                loading={loading}
                columns={columns} 
                dataSource={items.slice(0, pageSize)} 
                pagination={pagination}
            />   
        </div>
    )
}

export default Users;