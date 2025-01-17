import { Modal, Form, Input } from 'antd';

const LangAddModal = (props) => {
    const {visible, onOk: handleOk, onCancel: handleCancel} = props;
    const [form] = Form.useForm()
    return(
        <Modal title="Add Language" 
            visible={visible} 
            onOk={() => form.submit()} 
            onCancel={handleCancel}
            okButtonProps={{ htmlType: "submit" }}
            >
            <Form form={form} onFinish={(values) => handleOk(values, form)}>
                <Form.Item label={"Name"} name={"name"}>
                    <Input />
                </Form.Item>
                <Form.Item label={"Locale"} name={"locale"}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default LangAddModal;