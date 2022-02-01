import { Modal, Form, Input, Button, Select, Spin, message } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {updateUser, createUser} from "../../../../redux/users.slice";

const UserEditModel = (props) => {
    const dispatch = useDispatch();
    const {visible, onCancel: handelCancel, onOk: handleOk, formData} = props;
    const {loading} = useSelector(state => state.users);
    const isAdd = !formData?.id
    const handleSubmit = (values) => {
        const data = {...values};
        if(isAdd && !data.password) {
            return message.error("Password is required")
        } else if (!isAdd && (!data.password || data.password === "")) {
            delete data.password
        }
        if(formData.id){
            dispatch(updateUser({id: formData.id, data}))
        } else {
            dispatch(createUser(data))
        }
    }

    return(
        <Modal 
            title={`${isAdd ? "Add" : "Edit"} User`}
            visible={visible} 
            cancelButtonProps={{
                style: {
                    display: "none"
                }
            }}
            onOk={handleOk}
            onCancel={handelCancel}
            destroyOnClose={true}
            // forceRender={true}
            >
            <Spin spinning={loading} tip="Saving...">
                <Form onFinish={handleSubmit} initialValues={formData}>
                    <Form.Item label={"Username"} name={"username"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"First Name"} name={"firstName"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Last Name"} name={"lastName"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Role"} name={"role"}>
                        <Select>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="translator">Translator</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={"Password"} name={"password"}>
                        <Input.Password />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Save</Button>
                </Form>
            </Spin>
        </Modal>
    );
}

export default UserEditModel;