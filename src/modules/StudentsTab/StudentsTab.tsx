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
            renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number) =>
                <StudentDrawer isOpen={isOpen} setOpen={setOpen} studentId={userId} />
            }
            handleDelete={(userId: number) => deleteUser({ variables: { id: String(userId) } })}
        />
    );
}

export default StudentsTab;