import { Response, Settings } from "@/__generated__/graphql";
import { SET_ACTIVATION_BY_LINK } from "@/graphql/mutations";
import { GET_SETTINGS } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Switch, notification } from "antd";
import { QueryOptions } from 'apollo-client';

function SettingsModule() {
    const [form] = Form.useForm();
    const getSettings = useQuery<{ GetSettings: Settings }>(
        GET_SETTINGS,
        {
            onError: (error) => {
                handlingGraphqlErrors(error)
            },
        }
    );
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
            },
            refetchQueries: [{
                query: GET_SETTINGS,
            } as QueryOptions<object>]
        }
    );
    return (
        <Form form={form}>
            <Form.Item name='active' label={'Активация по коду'}>
                <Switch
                    checked={getSettings.data?.GetSettings.activationByLink}
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