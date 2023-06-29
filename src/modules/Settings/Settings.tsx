import { Response } from "@/__generated__/graphql";
import { SET_ACTIVATION_BY_LINK } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { Form, Switch, notification } from "antd";

function SettingsModule() {
    const [form] = Form.useForm();
    const [setActivationByLink, { loading }] = useMutation<{ ConfirmActivation: Response }, { activationByLink: boolean }>(
        SET_ACTIVATION_BY_LINK,
        {
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Активация по ссылке была изменена.',
                })
            }
        }
    );
    return (
        <Form form={form}>
            <Form.Item name='active' label={'Активация по коду'}>
                <Switch
                    defaultChecked={true}
                    loading={loading}
                    onChange={(value: boolean) =>
                        setActivationByLink({
                            variables: {
                                activationByLink: value
                            },
                        })
                    }
                />
            </Form.Item>
        </Form>
    );
}

export default SettingsModule;