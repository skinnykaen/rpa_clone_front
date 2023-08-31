import { Button, Col, Drawer, Row, Space, Tabs, Typography, notification } from "antd";
import { graphql } from "@apollo/client/react/hoc";

import CreateRobboGroupButton from "@/components/CreateRobboGroupButton";
import RobboUnitData from "@/components/RobboUnitData";
import { GET_ROBBO_GROUPS_BY_ROBBO_UNIT_ID, GET_STUDENTS_BY_ROBBO_UNIT_ID, GET_UNIT_ADMINS_BY_ROBBO_UNIT_ID } from "@/graphql/query";
import RobboGroupListModule from "@/modules/RobboGroupList";
import { MutationDeleteRobboUnitRelArgs, QueryGetStudentsByRobboUnitIdArgs, QueryGetUnitAdminByRobboUnitIdArgs, RobboGroupHttpList, Role, UsersList } from "@/__generated__/graphql";
import { handlingGraphqlErrors } from "@/utils";
import SearchModal from "@/modules/SearchModal";
import { CREATE_ROBBO_UNIT_REL, DELETE_ROBBO_UNIT_REL } from "@/graphql/mutations";
import { QueryOptions } from "apollo-client";
import { useMutation, useQuery } from "@apollo/client";
import UsersListComponent from "@/components/UsersList";
import UnitAdminDrawer from "../UnitAdminDrawer";

interface RobboUnitDrawerProps {
    isEditMode: boolean;
    robboUnitId: number;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function RobboUnitDrawer({
    robboUnitId,
    isOpen,
    setOpen,
    isEditMode,
}: RobboUnitDrawerProps) {
    const RobboGroupsTab = graphql<{ robboUnitId: number }, { GetRobboGroupsByRobboUnitId: RobboGroupHttpList }>(GET_ROBBO_GROUPS_BY_ROBBO_UNIT_ID)(({ robboUnitId, data }) => (
        <RobboGroupListModule
            robboUnitId={robboUnitId}
            data={data?.GetRobboGroupsByRobboUnitId?.robboGroups}
            countRows={data?.GetRobboGroupsByRobboUnitId?.countRows}
            loading={data?.loading}
        />
    ));
    const { loading, data } = useQuery<{ GetUnitAdminByRobboUnitId: UsersList }, QueryGetUnitAdminByRobboUnitIdArgs>(
        GET_UNIT_ADMINS_BY_ROBBO_UNIT_ID,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                robboUnitId: String(robboUnitId),
            },
        },
    );
    const getStudentsByRobboUnitId = useQuery<{ GetStudentsByRobboUnitId: UsersList }, QueryGetStudentsByRobboUnitIdArgs>(
        GET_STUDENTS_BY_ROBBO_UNIT_ID,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                robboUnitId: String(robboUnitId),
            },
        },
    );
    const [deleteUnitAdminRel, deleteUnitAdminRelResult] = useMutation<{ DeleteUnitAdminRel: Response }, MutationDeleteRobboUnitRelArgs>(
        DELETE_ROBBO_UNIT_REL,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Связь успешно удалена.',
                });
            },
            refetchQueries: [
                {
                    query: GET_UNIT_ADMINS_BY_ROBBO_UNIT_ID,
                    variables: {
                        robboUnitId: String(robboUnitId),
                    },
                } as QueryOptions<QueryGetUnitAdminByRobboUnitIdArgs>,
            ],
        },
    );
    const SearchUnitAdminModal = graphql<{ targetRelId: number }, { CreateParentRel: Response }>(CREATE_ROBBO_UNIT_REL, {
        options: {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Юнит админ успешно назначен.',
                });
            },
            refetchQueries: [
                {
                    query: GET_UNIT_ADMINS_BY_ROBBO_UNIT_ID,
                    variables: {
                        robboUnitId: String(robboUnitId),
                    },
                } as QueryOptions<QueryGetUnitAdminByRobboUnitIdArgs>,
            ],
        },
    })(({ mutate, targetRelId }) => {
        return (
            <SearchModal
                buttonText='Назначить'
                searchTarget={'юнит админа'}
                onClickHandle={mutate}
                targetRelId={targetRelId}
                roles={[Role.UnitAdmin]}
            />
        );
    });
    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Typography.Title level={3}>Роббо юнит</Typography.Title>
            <Row gutter={{ xs: 23, sm: 23, md: 23, lg: 23 }}>
                <RobboUnitData isEditMode={isEditMode} robboUnitId={robboUnitId} />
            </Row>
            <Col xs={23} sm={23} md={23} lg={23} xl={23}>
                <Tabs
                    defaultActiveKey='1'
                    items={[
                        {
                            label: 'Роббо группы',
                            key: '1',
                            children: <Space direction={'vertical'} style={{ display: 'flex' }}>
                                <CreateRobboGroupButton robboUnitId={robboUnitId} />
                                <RobboGroupsTab robboUnitId={robboUnitId} />
                            </Space>,
                        },
                        {
                            label: 'Юнит Админы',
                            key: '2',
                            children: <Space direction={'vertical'} style={{ display: 'flex' }}>
                                <SearchUnitAdminModal targetRelId={robboUnitId} />
                                <UsersListComponent
                                    isLoading={loading || deleteUnitAdminRelResult.loading}
                                    users={data?.GetUnitAdminByRobboUnitId.users}
                                    countRows={data?.GetUnitAdminByRobboUnitId.countRows || 0}
                                    renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number) =>
                                        <UnitAdminDrawer isOpen={isOpen} setOpen={setOpen} unitAdminId={userId} />
                                    }
                                    handleDelete={(userId: number) => deleteUnitAdminRel({ variables: { unitAdminId: String(userId), robboUnitId: String(robboUnitId) } })}
                                />
                            </Space>,
                        },
                        {
                            label: 'Ученики',
                            key: '3',
                            children: <UsersListComponent
                                isLoading={getStudentsByRobboUnitId.loading}
                                users={getStudentsByRobboUnitId.data?.GetStudentsByRobboUnitId.users}
                                countRows={getStudentsByRobboUnitId.data?.GetStudentsByRobboUnitId.countRows || 0}
                                renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number) =>
                                    <UnitAdminDrawer isOpen={isOpen} setOpen={setOpen} unitAdminId={userId} />
                                }
                            />,
                        },
                        {
                            label: 'Курсы',
                            key: '4',
                            children: <></>,
                        },
                    ]}
                />
            </Col>
        </Drawer>
    );
}

export default RobboUnitDrawer;