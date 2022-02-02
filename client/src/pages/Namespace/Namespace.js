import React, {useEffect, useState,} from "react";

/* ANTd */
import { Table, Button, notification, Input } from 'antd';
import {EditOutlined, SaveOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";

/* Redux */
import {
    findTranslations, 
    saveAll, 
    createTranslation,
    updateTranslation,
    removeTranslation,
    restoreTranslation,
    setCurrentPage,
    resetChanges,
    toggleEditMode,
    setPageSize
} from "../../redux/translations.slice";
import {useDispatch, useSelector} from "react-redux";

/* Utils */
import { useParams } from "react-router-dom";
import {v4 as uuid} from "uuid";

/* Components */
import {columns} from "./ui/tableColumns";
import Header from "./ui/Header"
import ToolBar from "../../components/ToolBar";

/* Styles */
import css from "./edit.module.sass";

const Namespace = () => {
    const params = useParams()
    const {
            items, 
            total, 
            loading, 
            currentPage, 
            touched,
            editMode,
            refetch,
            pageSize
        } = useSelector(state => state.translations);
    const {items: languages} = useSelector(state => state.language);
    const {items: namespaces} = useSelector(state => state.namespace);
    const dispatch = useDispatch()

    const [searchMode, setSearchMode] = useState(false);

    useEffect(() => {
        dispatch(findTranslations({
            namespace: params.namespace,
            offset: 0,
            limit: pageSize
        }))
        dispatch(setCurrentPage(1))
    }, [params.namespace, params.locale])

    useEffect(() => {
        dispatch(findTranslations({
            namespace: params.namespace,
            language: params.locale,
            offset: (currentPage * pageSize) - pageSize,
            limit: pageSize
        }))
    }, [currentPage, pageSize])

    useEffect(() => {
        if(refetch){
            dispatch(findTranslations({
                namespace: params.namespace,
                language: params.locale,
                offset: (currentPage * pageSize) - pageSize,
                limit: pageSize
            }))
        }
    }, [refetch])

    const handleEditMode = () => {
        if(touched){
            return notification.error({
                message: "You have unsaved changes on this page",
                description: "Please save them or cancel"
            })
        }
        dispatch(toggleEditMode(!editMode))
    }

    const handleCancel = () => {
        dispatch(toggleEditMode(false))
        dispatch(resetChanges())
    }

    const handleSearch = (e) => {
        const {target: {value}} = e;
        if(currentPage !== 1){
            dispatch(setCurrentPage(1))
        }

        if(value){
            if(!searchMode) setSearchMode(true)
            dispatch(findTranslations({
                namespace: params.namespace,
                language: params.locale,
                offset: 0,
                limit: pageSize,
                search: value
            }))
        } else {
            setSearchMode(false)
            dispatch(findTranslations({
                namespace: params.namespace,
                language: params.locale,
                offset: 0,
                limit: pageSize,
            }))
        }
    }

    const handleSave = () => {
        const formatted_items = items.map(item => ({...item, key: item.keyName}))
        dispatch(saveAll({
            create: formatted_items.filter( item => item.created),
            update: formatted_items.filter( item => item.updated && !item.created && !item.removed),
            remove: formatted_items.filter( item => item.removed)
        }))
    }

    const onValueChange = (id, key, value) => {
        const to_change = items.find(v => v.id === id);
        dispatch(updateTranslation({
            ...to_change,
            [key]: value
        }))   
    }

    const handleAdd = () => {
        const to_add = {
            keyName: "",
            id: uuid(),
            new: true,
            key: uuid(),
            namespace: params.namespace
        }

        for (const {locale} of languages) {
            to_add[`${locale}:text`] = ""
        }
        dispatch(createTranslation(to_add))
    }


    const handleRemove = (record) => {
        dispatch(removeTranslation(record))
    }

    const handleRestore = (record) => {
        dispatch(restoreTranslation(record))
    }


    const pagination = {
        pageSize: pageSize,
        currentPage: currentPage, 
        position: [ "bottomLeft" ],
        onShowSizeChange: (_, size) => {
            dispatch(setPageSize(size))
        },
        total: total || 0,
        disabled: touched || searchMode ? true : false,
        onChange: (page) => {
            dispatch(setCurrentPage(page))
        }
    }
    return(
        <div className={css.wrapper}>
            <Header 
                total={total}
                slug={params.namespace}
                title={namespaces.find(item => item.slug === params.namespace)?.name}
                />
            <ToolBar>
                <Button 
                    type="primary" 
                    onClick={handleEditMode} 
                    icon={<EditOutlined />}
                    > 
                    Edit 
                </Button>
                <Button 
                    type="primary" 
                    disabled={!editMode ? true : !touched} 
                    onClick={handleSave} 
                    icon={<SaveOutlined />}
                    > 
                    Save 
                </Button>
                <Button 
                    danger 
                    icon={<CloseOutlined />} 
                    disabled={!editMode ? true : !touched} 
                    onClick={handleCancel}
                    > 
                    Cancel 
                </Button>
                <Input 
                    allowClear 
                    prefix={<SearchOutlined />} 
                    type={"search"} 
                    placeholder="Search key" 
                    onChange={handleSearch}
                />
            </ToolBar>
            <Table 
                scroll={{ x: 1300 }}
                loading={loading}
                columns={columns(editMode, onValueChange, languages, handleAdd, handleRemove, handleRestore)} 
                dataSource={items.slice(0, pageSize)} 
                pagination={pagination}
            />    
        </div>
    );
}

export default Namespace;