import { Form, Switch } from "antd";

function SettingsModule() {
    const [form] = Form.useForm();
    return (
        <Form form={form}>
            <Form.Item name='active' label={'Активация по коду'}>
                    <Switch defaultChecked={true}
                        onChange={() =>
                            // setActiveHandle({
                            //     variables: {
                            //         studentId: profile.id,
                            //         active: !profile.active,
                            //     },
                            // })
                            console.log('s')
                        }
                    />
                </Form.Item>
        </Form>
    );
}

export default SettingsModule;