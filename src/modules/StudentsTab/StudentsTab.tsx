import { useState } from "react";
import { notification } from "antd";
import { useMutation, useQuery } from "@apollo/client";

import { Role, UsersList } from "@/__generated__/graphql";
import { GET_ALL_USERS } from "@/graphql/query";
import { DELETE_USER } from "@/graphql/mutations";
import { handlingGraphqlErrors } from "@/utils";
import UsersListComponent from "@/components/UsersList";
import StudentDrawer from "@/components/StudentDrawer";

interface StudentsTabProps {
    isActive: boolean;
}

function StudentsTab({
    isActive,
}: StudentsTabProps) {
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const { loading, data } = useQuery<{ GetAllUsers: UsersList }, { page?: number, pageSize?: number, active: boolean, roles: Role[] }>(
        GET_ALL_USERS,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                active: isActive,
                roles: [Role.Student],
            },
        },
    );
    const [deleteUser, deleteUserResult] = useMutation<{ DeleteUser: Response }, { id: string }>(
        DELETE_USER,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Пользователь удален.',
                });
            },
            refetchQueries: [
                {
                    query: GET_ALL_USERS,
                    variables: {
                        active: isActive,
                        roles: [Role.Student],
                    },
                },
            ],
        },
    );

    return (
        <UsersListComponent
            isLoading={loading && deleteUserResult.loading}
            users={data?.GetAllUsers.users}
            countRows={data?.GetAllUsers.countRows || 0}
            // isOpenDrawer={isOpenDrawer}
            // openDrawer={setOpenDrawer}
            drawerRender={(studentId: number, isOpenDrawer: boolean, setOpen:(isOpen: boolean)=> void) =>
                <StudentDrawer isOpen={isOpenDrawer} setOpen={setOpen} studentId={studentId} />
            }
            handleDelete={(userId: number) => deleteUser({ variables: { id: String(userId) } })}
        />
    );
}

export default StudentsTab;