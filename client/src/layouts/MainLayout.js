import React, {useEffect} from "react";

/* AntD */
import { Layout, Menu, Typography, Button, Spin } from 'antd';
import {SettingOutlined, TranslationOutlined, ImportOutlined, ExportOutlined, AppstoreOutlined, UserOutlined, ApiOutlined, DashboardOutlined} from "@ant-design/icons";

/* Redux */
import { useSelector, useDispatch } from "react-redux";
import {findNamespaces} from "../redux/namespace.slice"
import {findLanguage} from "../redux/language.slice";

/* Components */
import PrivateComponent from "../components/PrivateComponent";
import MiniProfile from "./MiniProfile";

/* Utils */
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

/* Assets */
import logo from "../assets/images/logo.svg";

/* Styles */
import css from "./layouts.module.sass";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const MainLayout = ({children, user}) => {
    const params = useParams();
    const {items: namespaces, loading: namespacesLoading, refetch: refetchNamespace} = useSelector(state => state.namespace);
    const {refetch: refetchLang} = useSelector(state => state.language);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findLanguage())
        dispatch(findNamespaces())
    }, [])

    useEffect(() => {
        if(refetchLang){
            dispatch(findLanguage())
        }
    }, [refetchLang])

    useEffect(() => {
        if(refetchNamespace){
            dispatch(findNamespaces())
        }
    }, [refetchNamespace])

    return(
        <Layout className={css.mainLayout}>
            <Sider>
                <div className={css.logo} onClick={() => navigate("/")}>
                    <img src={logo} height={50} alt="logo"/>
                    <Typography.Title level={2} style={{marginLeft: "-10px"}}>
                        ocalizer
                    </Typography.Title>    
                </div>
                {
                    namespacesLoading ? <Spin /> :
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultOpenKeys={["manage", "namespace", "settings"]}
                            defaultSelectedKeys={params.namespace  ? [params.namespace] : []}
                        >
                        <Menu.Item key={"dashboard"} icon={<DashboardOutlined />}>
                            <Link to={`/dashboard`} >Dashboard</Link>    
                        </Menu.Item>
                        <PrivateComponent rule={"pages:manage"}>
                            <SubMenu key={"manage"} icon={<AppstoreOutlined />} title={"Manage"}>
                                <PrivateComponent rule={"pages:manage_language"}>
                                    <Menu.Item key={"language"}>
                                        <Link to={`/manage/language`} >Language</Link>
                                    </Menu.Item>
                                </PrivateComponent>
                                <PrivateComponent rule={"pages:manage_namespace"}>
                                    <Menu.Item key={"namespace"}>
                                        <Link to={`/manage/namespace`} >Namespace</Link>
                                    </Menu.Item>
                                </PrivateComponent>
                            </SubMenu >
                        </PrivateComponent>
                        <PrivateComponent rule={"pages:namespaces"}>
                            <SubMenu key={"namespace"} icon={<TranslationOutlined />} title={"Namespaces"}>
                                {namespaces.map(item => (
                                    <Menu.Item key={item.slug}>
                                        <Link to={`/namespace/${item.slug}`} >{item.name}</Link>
                                    </Menu.Item>
                                ))}
                            </SubMenu >
                        </PrivateComponent>
                        <PrivateComponent rule={"pages:settings"}>
                            <SubMenu key={"settings"} icon={<SettingOutlined />} title={"Settings"}>
                                <PrivateComponent rule={"pages:settings_import"}>  
                                    <Menu.Item key={"import"} icon={<ImportOutlined />}>
                                        <Link to={`/settings/import`} >Import</Link>
                                    </Menu.Item>
                                </PrivateComponent>
                                <PrivateComponent rule="users:view">
                                    <Menu.Item key={"users"} icon={<UserOutlined />}>
                                        <Link to={`/settings/users`} >Users</Link>
                                    </Menu.Item>
                                </PrivateComponent>
                                <PrivateComponent rule={"pages:settings_apiKey"}> 
                                    <Menu.Item key={"api"} icon={<ApiOutlined />}>
                                        <Link to={`/settings/api`} >API</Link>
                                    </Menu.Item>
                                </PrivateComponent>
                            </SubMenu>
                        </PrivateComponent>
                    

                    </Menu>
                }
            </Sider>
            <Layout>
                <Header className={css.header}>
                    <Typography.Text>
                        {`${user.firstName} ${user.lastName}`}
                    </Typography.Text>
                    <MiniProfile />
                    
                </Header>
                <Content className={css.content}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default MainLayout;