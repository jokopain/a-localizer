import { Statistic, Card, Row, Col } from 'antd';
import {TranslationOutlined, UserOutlined, KeyOutlined, ProfileOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";

import css from "./dashboard.module.sass"

const Dashboard = () => {
    const {statistics} = useSelector(state => state.app)
    return(
        <div className={css.wrapper}>
            
            <Row gutter={[8, 8]}>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Locales"
                            value={statistics?.locales || 0}
                            prefix={<TranslationOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Namespaces"
                            value={statistics.namespaces}
                            prefix={<ProfileOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[8, 8]} style={{marginTop: 8}}>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Keys"
                            value={statistics.keys}
                            prefix={<KeyOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Users"
                            value={statistics.users}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard;