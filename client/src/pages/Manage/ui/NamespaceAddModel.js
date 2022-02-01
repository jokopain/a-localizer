import { Modal, Form, Input } from 'antd';

const NamespaceAddModel = (props) => {
    const {visible, onOk: handleOk, onCancel: handleCancel} = props;
    const [form] = Form.useForm()
    return(
        <Modal title="Add Namespace" 
            visible={visible} 
            onOk={() => form.submit()} 
            onCancel={handleCancel}
            okButtonProps={{ htmlType: "submit" }}
            >
            <Form form={form} onFinish={handleOk}>
                <Form.Item label={"Name"} name={"name"}>
                    <Input />
                </Form.Item>
                <Form.Item label={"Slug"} name={"slug"}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default NamespaceAddModel;