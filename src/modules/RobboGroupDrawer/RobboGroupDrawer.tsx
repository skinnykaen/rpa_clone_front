import { MutationDeleteRobboGroupRelArgs, QueryGetStudentsByRobboGroupIdArgs, QueryGetTeachersByRobboGroupIdArgs, Role, UsersList } from "@/__generated__/graphql";
import RobboGroupData from "@/components/RobboGroupData";
import { CREATE_ROBBO_GROUP_REL, DELETE_ROBBO_GROUP_REL } from "@/graphql/mutations";
import { GET_STUDENTS_BY_ROBBO_GROUP_ID, GET_TEACHERS_BY_ROBBO_GROUP_ID } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { graphql } from "@apollo/client/react/hoc";
import { Col, Drawer, Space, Tabs, Typography, notification } from "antd";
import { QueryOptions } from "apollo-client";
import SearchModal from "@/modules/SearchModal";
import UsersListComponent from "@/components/UsersList";
import { useMutation, useQuery } from "@apollo/client";
import StudentDrawer from "../StudentDrawer";

interface RobboGroupDrawerProps {
    isEditMode: boolean;
    robboGroupId: number;
    robboUnitId?: number;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function RobboGroupDrawer({
    isEditMode,
    robboGroupId,
    robboUnitId,
    isOpen,
    setOpen,
}: RobboGroupDrawerProps) {
    const getStudentsResult = useQuery<{ GetStudentsByRobboGroupId: UsersList }, QueryGetStudentsByRobboGroupIdArgs>(
        GET_STUDENTS_BY_ROBBO_GROUP_ID,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                robboGroupId: String(robboGroupId),
            },
        },
    );
    const getTeachersResult = useQuery<{ GetTeachersByRobboGroupId: UsersList }, QueryGetTeachersByRobboGroupIdArgs>(
        GET_TEACHERS_BY_ROBBO_GROUP_ID,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                robboGroupId: String(robboGroupId),
            },
        },
    );
    const SearchStudentModal = graphql<{ coreRelId: number }, { CreateRobboGroupRel: Response }>(CREATE_ROBBO_GROUP_REL, {
        options: {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Ученик успешно добавлен.',
                });
            },
            refetchQueries: [
                {
                    query: GET_STUDENTS_BY_ROBBO_GROUP_ID,
                    variables: {
                        robboGroupId: String(robboGroupId),
                    },
                } as QueryOptions<QueryGetStudentsByRobboGroupIdArgs>,
            ],
        },
    })(({ mutate, coreRelId }) => {
        return (
            <SearchModal
                buttonText='Добавить'
                searchTarget={'ученика'}
                onClickHandle={mutate}
                coreRelId={coreRelId}
                roles={[Role.Student]}
            />
        );
    });
    const SearchTeacherModal = graphql<{ coreRelId: number }, { CreateRobboGroupRel: Response }>(CREATE_ROBBO_GROUP_REL, {
        options: {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Педагог успешно добавлен.',
                });
            },
            refetchQueries: [
                {
                    query: GET_TEACHERS_BY_ROBBO_GROUP_ID,
                    variables: {
                        robboGroupId: String(robboGroupId),
                    },
                } as QueryOptions<QueryGetTeachersByRobboGroupIdArgs>,
            ],
        },
    })(({ mutate, coreRelId }) => {
        return (
            <SearchModal
                buttonText='Добавить'
                searchTarget={'педагога'}
                onClickHandle={mutate}
                coreRelId={coreRelId}
                roles={[Role.Teacher]}
            />
        );
    });
    const [deleteRobboGroupRel, deleteRobboGroupRelResult] = useMutation<{ DeleteRobboGroupRel: Response }, MutationDeleteRobboGroupRelArgs>(
        DELETE_ROBBO_GROUP_REL,
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
                    query: GET_STUDENTS_BY_ROBBO_GROUP_ID,
                    variables: {
                        robboGroupId: String(robboGroupId),
                    },
                } as QueryOptions<QueryGetStudentsByRobboGroupIdArgs>,
                {
                    query: GET_TEACHERS_BY_ROBBO_GROUP_ID,
                    variables: {
                        robboGroupId: String(robboGroupId),
                    },
                } as QueryOptions<QueryGetTeachersByRobboGroupIdArgs>,
            ],
        },
    );
    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Typography.Title level={3}>Роббо группа</Typography.Title>
            <RobboGroupData isEditMode={isEditMode} robboGroupId={robboGroupId} />
            <Col xs={23} sm={23} md={23} lg={23} xl={23}>
                <Tabs
                    defaultActiveKey='1'
                    items={[
                        {
                            label: 'Ученики',
                            key: '1',
                            children: <Space direction={'vertical'} style={{ display: 'flex' }}>
                            <SearchStudentModal coreRelId={robboGroupId} />
                            <UsersListComponent
                                isLoading={getStudentsResult.loading || deleteRobboGroupRelResult.loading}
                                users={getStudentsResult.data?.GetStudentsByRobboGroupId.users}
                                countRows={getStudentsResult.data?.GetStudentsByRobboGroupId.countRows || 0}
                                renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number) =>
                                    <StudentDrawer isOpen={isOpen} setOpen={setOpen} studentId={userId} />
                                }
                                handleDelete={(userId: number) => deleteRobboGroupRel({ variables: { userId: String(userId), robboGroupId: String(robboGroupId) } })}
                            />
                        </Space>,
                        },
                        {
                            label: 'Педагоги',
                            key: '2',
                            children: <Space direction={'vertical'} style={{ display: 'flex' }}>
                            <SearchTeacherModal coreRelId={robboGroupId} />
                            <UsersListComponent
                                isLoading={getTeachersResult.loading || deleteRobboGroupRelResult.loading}
                                users={getTeachersResult.data?.GetTeachersByRobboGroupId.users}
                                countRows={getTeachersResult.data?.GetTeachersByRobboGroupId.countRows || 0}
                                renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number) =>
                                    <StudentDrawer isOpen={isOpen} setOpen={setOpen} studentId={userId} />
                                }
                                handleDelete={(userId: number) => deleteRobboGroupRel({ variables: { userId: String(userId), robboGroupId: String(robboGroupId) } })}
                            />
                        </Space>,
                        },
                        {
                            label: 'Курсы',
                            key: '3',
                            children: <></>,
                        },
                    ]}
                />
            </Col>
        </Drawer>
    );
}

export default RobboGroupDrawer;