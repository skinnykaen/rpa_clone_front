import { graphql } from "@apollo/client/react/hoc";
import { Space, notification } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { QueryOptions } from "apollo-client";

import { CREATE_ROBBO_GROUP_REL, DELETE_ROBBO_GROUP_REL } from "@/graphql/mutations";
import { GET_STUDENTS_BY_ROBBO_GROUP_ID, GET_TEACHERS_BY_ROBBO_GROUP_ID } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { MutationDeleteRobboGroupRelArgs, QueryGetStudentsByRobboGroupIdArgs, QueryGetTeachersByRobboGroupIdArgs, Role, UsersList } from "@/__generated__/graphql";
import SearchModal from "@/modules/SearchModal";
import UsersListComponent from "@/components/UsersList";
import StudentDrawer from "@/modules/StudentDrawer";
import { Roles } from "@/models";

interface StudentsTabProps {
    clientRole: Roles;
    robboGroupId: number;
}

function StudentsTab({ clientRole, robboGroupId }: StudentsTabProps) {
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
            {clientRole == Roles.Teacher ? <></> : <SearchStudentModal coreRelId={robboGroupId} />}
            <UsersListComponent
                isLoading={getStudentsResult.loading || deleteRobboGroupRelResult.loading}
                users={getStudentsResult.data?.GetStudentsByRobboGroupId.users}
                countRows={getStudentsResult.data?.GetStudentsByRobboGroupId.countRows || 0}
                renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number) =>
                    <StudentDrawer isOpen={isOpen} setOpen={setOpen} studentId={userId} />
                }
                handleDelete={(userId: number) => deleteRobboGroupRel({ variables: { userId: String(userId), robboGroupId: String(robboGroupId) } })}
            />
        </Space>
    );
}

export default StudentsTab;