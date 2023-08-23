import { MutationUpdateRobboUnitArgs, QueryGetAllRobboUnitByAccessTokenArgs, QueryGetRobboUnitByIdArgs, RobboUnitHttp } from "@/__generated__/graphql";
import { UPDATE_ROBBO_UNIT } from "@/graphql/mutations";
import { GET_ALL_ROBBO_UNITS, GET_ROBBO_UNIT_BY_ID } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Skeleton, notification } from "antd";
import { QueryOptions } from "apollo-client";
import { useEffect, useState } from "react";

interface RobboUnitDataProps {
    robboUnitId: number;
    isEditMode: boolean;
}


function RobboUnitData({
    robboUnitId,
    isEditMode,
}: RobboUnitDataProps) {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    useEffect(() => {
        forceUpdate({});
    }, []);

    const { loading, data } = useQuery<{ GetRobboUnitById: RobboUnitHttp }, QueryGetRobboUnitByIdArgs>(
        GET_ROBBO_UNIT_BY_ID,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                id: String(robboUnitId),
            },
        },
    );
    const [updateRobboUnit, updateRobboUnitResult] = useMutation<{ UpdateRobboUnit: RobboUnitHttp }, MutationUpdateRobboUnitArgs>(
        UPDATE_ROBBO_UNIT,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Роббо юнит обновлен.',
                });
            },
            onError: error => {
                handlingGraphqlErrors(error);
            },
            refetchQueries: [
                {
                    query: GET_ROBBO_UNIT_BY_ID,
                    variables: {
                        id: String(robboUnitId),
                    },
                } as QueryOptions<QueryGetRobboUnitByIdArgs>,
                {
                    query: GET_ALL_ROBBO_UNITS,
                } as QueryOptions<QueryGetAllRobboUnitByAccessTokenArgs>,
            ],
        },
    );
    return (
        loading ? <Skeleton avatar paragraph={{ rows: 2 }} />
            :
            <Form
                form={form}
                disabled={!isEditMode}
                initialValues={{
                    name: data?.GetRobboUnitById.name,
                    city: data?.GetRobboUnitById.city,
                }}
            >
                <Form.Item
                    name='name'
                >
                    <Input
                        placeholder='Название'
                        size='middle'
                        onBlur={value => {
                            updateRobboUnit({
                                variables: {
                                    input: {
                                        id: String(robboUnitId),
                                        name: value.target.value,
                                        city: data?.GetRobboUnitById.city || '',
                                    },
                                },
                            });
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name='city'
                >
                    <Input
                        placeholder='Город'
                        size='middle'
                        onBlur={value => {
                            updateRobboUnit({
                                variables: {
                                    input: {
                                        id: String(robboUnitId),
                                        name: data?.GetRobboUnitById.name || '',
                                        city: value.target.value,
                                    },
                                },
                            });
                        }}
                    />
                </Form.Item>
            </Form >
    );

}

export default RobboUnitData;