import React, {useState} from "react";

/* AntD */
import { Button, Row, Col, Card, Empty } from "antd";

/* Components */
import NamespaceAddModel from "./ui/NamespaceAddModel";
import NamespaceItem from "./ui/NamespaceItem";
import ExportProgress from "./ui/ExportProgress";

/* Redux */
import {useSelector, useDispatch} from "react-redux";
import {createNamespaces, exportOneNamespace, changeExportStatus} from "../../redux/namespace.slice";

/* Styles */
import css from "./manage.module.sass";

const Namespace = () => {
    const {items, exportStatus, exportData} = useSelector(state => state.namespace);
    const [visible, setVisible] = useState(false);
    const [showProgress, setShowProgress] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (values, form) => {
        setVisible(false)
        dispatch(createNamespaces(values))
        form.resetFields()
    }

    const handleExport = (slug) => {
        setShowProgress(true)
        dispatch(exportOneNamespace({slug}))
    }

    return(
        <div className={css.wrapper}>
            {showProgress && <ExportProgress 
                status={exportStatus.text} 
                percent={exportStatus.percent} 
                exportData={exportData}
                onClose={() => setShowProgress(false)}
                />}
            <Row gutter={[8, 8]} style={{width: "100%", marginTop: 10}}>
                <Col>
                    <Button type="primary" onClick={() => setVisible(true)}>
                        Add New
                    </Button>
                </Col>
                {/* <Col>
                    <Button type="primary" onClick={() => setVisible(true)}>
                       Export All
                    </Button>
                </Col> */}
            </Row>
            <NamespaceAddModel 
                onOk={handleSubmit}
                onCancel={() => setVisible(false)}
                visible={visible}
            />
            <Row gutter={[8, 8]} style={{width: "100%", marginTop: 10}}>
                {items.length ? items.map(item => (
                    <Col span={8}>
                        <Card>
                            <NamespaceItem {...item} onExport={handleExport}/>  
                        </Card>  
                    </Col>))
                    :
                    <Empty />
                }
            </Row>
        </div>
    )
}

export default Namespace;