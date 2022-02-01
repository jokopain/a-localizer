import React, {useState} from "react";

/* AntD */
import { Button, Row, Col, Card } from "antd";

/* Components */
import LangItem from "./ui/LangItem";
import LangAddModal from "./ui/LangAddModel";

/* Redux */
import {useSelector, useDispatch} from "react-redux";
import {createLanguage} from "../../redux/language.slice";

/* Styles */
import css from "./manage.module.sass";

const Language = () => {
    const {items} = useSelector(state => state.language);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        setVisible(false)
        dispatch(createLanguage(values))
    }

    return(
        <div className={css.wrapper}>
            <Button type="primary" onClick={() => setVisible(true)}>
                Add New
            </Button>
            <LangAddModal 
                onOk={handleSubmit}
                onCancel={() => setVisible(false)}
                visible={visible}
            />
            <Row gutter={[8, 8]} style={{width: "100%", marginTop: 10}}>
                {items.map(item => (
                    <Col span={8}>
                        <Card>
                            <LangItem {...item}/>  
                        </Card>  
                    </Col>))}
            </Row>
        </div>
    )
}

export default Language;