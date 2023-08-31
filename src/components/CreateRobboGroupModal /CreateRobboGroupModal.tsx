import { Button, Form, Input, notification } from "antd";
import { useMutation } from "@apollo/client";

import { MutationCreateRobboGroupArgs, NewRobboGroup, QueryGetAllProjectPagesByAccessTokenArgs, QueryGetRobboGroupsByRobboUnitIdArgs } from "@/__generated__/graphql";
import { CREATE_ROBBO_GROUP } from "@/graphql/mutations";
import { handlingGraphqlErrors } from "@/utils";
import { GET_ALL_ROBBO_GROUPS_BY_ACCESS_TOKEN, GET_ROBBO_GROUPS_BY_ROBBO_UNIT_ID } from "@/graphql/query";
import { QueryOptions } from "apollo-client";

interface CreateRobboGroupModalProps {
    robboUnitId: number;
}

function CreateRobboGroupModal({ robboUnitId }: CreateRobboGroupModalProps) {
    const [form] = Form.useForm();
    const [createRobboGroup, { loading }] = useMutation<{ createRobboGroup: NewRobboGroup }, MutationCreateRobboGroupArgs>(
        CREATE_ROBBO_GROUP,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Роббо группа успешно создана.',
                });
            },
            onError: error => {
                handlingGraphqlErrors(error);
            },
            refetchQueries: [
                {
                    query: GET_ALL_ROBBO_GROUPS_BY_ACCESS_TOKEN,
                }as QueryOptions<QueryGetAllProjectPagesByAccessTokenArgs>,
                {
                    query: GET_ROBBO_GROUPS_BY_ROBBO_UNIT_ID,
                    variables: {
                        robboUnitId: String(robboUnitId),
                    },
                } as QueryOptions<QueryGetRobboGroupsByRobboUnitIdArgs>,
            ],
        },
    );
    const onFinish = (inputs: { name: string}) => {
        createRobboGroup({
            variables: {
                input: {
                    name: inputs.name,
                    robboUnitId: String(robboUnitId),
                },
            },
        });
    };
    return (
        <Form
            form={form}
            onFinish={onFinish}
            name='create-robbo-group'
        >
            <Form.Item
                name={'name'}
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите название роббо группы!',
                    },
                ]}
            >
                <Input
                    placeholder='Название'
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

export default CreateRobboGroupModal;