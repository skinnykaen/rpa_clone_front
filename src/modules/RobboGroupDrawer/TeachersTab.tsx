import { MutationDeleteRobboGroupRelArgs, QueryGetStudentsByRobboGroupIdArgs, QueryGetTeachersByRobboGroupIdArgs, Role, UsersList } from "@/__generated__/graphql";
import { CREATE_ROBBO_GROUP_REL, DELETE_ROBBO_GROUP_REL } from "@/graphql/mutations";
import { GET_STUDENTS_BY_ROBBO_GROUP_ID, GET_TEACHERS_BY_ROBBO_GROUP_ID } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { graphql } from "@apollo/client/react/hoc";
import { Space, notification } from "antd";
import { QueryOptions } from "apollo-client";
import SearchModal from "@/modules/SearchModal";
import UsersListComponent from "@/components/UsersList";
import { useMutation, useQuery } from "@apollo/client";
import StudentDrawer from "@/modules/StudentDrawer";

interface TeachersTabProps { 
    robboGroupId: number;
}

function TeachersTab({robboGroupId}:TeachersTabProps) {

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
                buttonText='Назначить'
                searchTarget={'педагога'}
                onClickHandle={mutate}
                coreRelId={coreRelId}
                roles={[Role.Teacher]}
            />
        );
    });

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
        <Space direction={'vertical'} style={{ display: 'flex' }}>
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
        </Space>
    );
}

export default TeachersTab;