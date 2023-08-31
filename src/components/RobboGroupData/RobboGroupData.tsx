import { MutationUpdateRobboGroupArgs, QueryGetAllRobboGroupByAccessTokenArgs, QueryGetRobboGroupByIdArgs, RobboGroupHttp } from "@/__generated__/graphql";
import { UPDATE_ROBBO_GROUP } from "@/graphql/mutations";
import { GET_ALL_ROBBO_GROUPS_BY_ACCESS_TOKEN, GET_ROBBO_GROUP_BY_ID } from "@/graphql/query";
import RobboUnitDrawer from "@/modules/RobboUnitDrawer";
import { handlingGraphqlErrors } from "@/utils";
import { useMutation, useQuery } from "@apollo/client";
import { Skeleton, Form, notification, Input, Typography } from "antd";
import { QueryOptions } from "apollo-client";
import { useEffect, useState } from "react";

interface RobboGroupDataProps {
    robboGroupId: number;
    isEditMode: boolean;
}

function RobboGroupData({ isEditMode, robboGroupId }: RobboGroupDataProps) {
    const [form] = Form.useForm();
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [, forceUpdate] = useState({});
    useEffect(() => {
        forceUpdate({});
    }, []);

    const { loading, data } = useQuery<{ GetRobboGroupById: RobboGroupHttp }, QueryGetRobboGroupByIdArgs>(
        GET_ROBBO_GROUP_BY_ID,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                id: String(robboGroupId),
            },
        },
    );
    const [updateRobboGroup, updateRobboGroupResult] = useMutation<{ UpdateRobboGroup: RobboGroupHttp }, MutationUpdateRobboGroupArgs>(
        UPDATE_ROBBO_GROUP,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Роббо групаа обновлена.',
                });
            },
            onError: error => {
                handlingGraphqlErrors(error);
            },
            refetchQueries: [
                {
                    query: GET_ROBBO_GROUP_BY_ID,
                    variables: {
                        id: String(robboGroupId),
                    },
                } as QueryOptions<QueryGetRobboGroupByIdArgs>,
                {
                    query: GET_ALL_ROBBO_GROUPS_BY_ACCESS_TOKEN,
                } as QueryOptions<QueryGetAllRobboGroupByAccessTokenArgs>,
            ],
        },
    );

    return (
        loading || updateRobboGroupResult.loading ? <Skeleton avatar paragraph={{ rows: 1 }} />
            :
            <Form
                form={form}
                disabled={!isEditMode}
                initialValues={{
                    name: data?.GetRobboGroupById.name,
                }}
            >
                <Form.Item
                    name='name'
                >
                    <Input
                        placeholder='Название'
                        size='middle'
                        onBlur={value => {
                            updateRobboGroup({
                                variables: {
                                    input: {
                                        id: String(robboGroupId),
                                        name: value.target.value,
                                    },
                                },
                            });
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name='robbo-unit'
                    label='Роббо юнит'
                >
                    <Typography.Link onClick={() => setOpenDrawer(true)}>
                        {data?.GetRobboGroupById.robboUnit.name} {data?.GetRobboGroupById.robboUnit.city}
                    </Typography.Link>
                    <RobboUnitDrawer isEditMode={true} isOpen={isOpenDrawer} setOpen={setOpenDrawer} robboUnitId={Number(data?.GetRobboGroupById.robboUnit.id)} />
                </Form.Item>
                <Form.Item name={'createdAt'} label={'Создан'}>
                    {data?.GetRobboGroupById.createdAt}
                </Form.Item>
                <Form.Item name={'updatedAt'} label={'Обновлен'}>
                    {data?.GetRobboGroupById.updatedAt}
                </Form.Item>
            </Form >
    );
}

export default RobboGroupData;