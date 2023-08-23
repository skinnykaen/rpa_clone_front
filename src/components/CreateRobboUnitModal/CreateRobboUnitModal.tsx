import { Button, Form, Input, notification } from "antd";
import { useMutation } from "@apollo/client";

import { MutationCreateRobboUnitArgs, NewRobboUnit } from "@/__generated__/graphql";
import { CREATE_ROBBO_UNIT } from "@/graphql/mutations";
import { handlingGraphqlErrors } from "@/utils";
import { GET_ALL_ROBBO_UNITS } from "@/graphql/query";

function CreateRobboUnit() {
    const [form] = Form.useForm();
    const [createRobboUnit, { loading }] = useMutation<{ CreateRobboUnit: NewRobboUnit }, MutationCreateRobboUnitArgs>(
        CREATE_ROBBO_UNIT,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Роббо юнит успешно создан.',
                });
            },
            onError: error => {
                handlingGraphqlErrors(error);
            },
            refetchQueries: [
                {
                    query: GET_ALL_ROBBO_UNITS,
                },
            ],
        },
    );
    const onFinish = (inputs: { name: string, city: string }) => {
        createRobboUnit({
            variables: {
                input: {
                    name: inputs.name,
                    city: inputs.city,
                },
            },
        });
    };
    return (
        <Form
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                name='name'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите название роббо юнита!',
                    },
                ]}
            >
                <Input
                    placeholder='Название'
                    size='middle'
                />
            </Form.Item>
            <Form.Item
                name='city'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите город роббо юнита!',
                    },
                ]}
            >
                <Input
                    placeholder='Город'
                    size='middle'
                />
            </Form.Item>
            <Form.Item shouldUpdate>
                {
                    () => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={loading}
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Создать
                        </Button>
                    )
                }
            </Form.Item>
        </Form>
    );
}

export default CreateRobboUnit;