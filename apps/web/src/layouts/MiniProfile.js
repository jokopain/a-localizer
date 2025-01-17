import React, { useState } from "react";
import { Menu, Dropdown, Button } from 'antd';
import { SettingOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import UserEditModel from "./UserEditModal";
import {Link} from "react-router-dom";

const MiniProfile = (props) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open)
    }

    const menu = (
        <Menu>
          <Menu.Item icon={<UserOutlined />} button onClick={toggleOpen}>
            Profile
          </Menu.Item>
          <Menu.Item icon={<LogoutOutlined />}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      );
    return(
        <>
            <UserEditModel visible={open} onCancel={toggleOpen} onOk={toggleOpen}/>
            <Dropdown overlay={menu}>
                <Button 
                    type="primary"
                    icon={<SettingOutlined />}
                />
            </Dropdown>
        </>
    )

}

export default MiniProfile;