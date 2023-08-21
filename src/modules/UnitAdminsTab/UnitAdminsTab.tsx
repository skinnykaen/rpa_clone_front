import { notification } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { Role, UsersList } from "@/__generated__/graphql";
import UsersListComponent from "@/components/UsersList";
import { DELETE_USER } from "@/graphql/mutations";
import { GET_ALL_USERS } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import UnitAdminDrawer from "@/modules/UnitAdminDrawer";

interface TeachersTab {
    isActive: boolean;
}

function UnitAdminsTab({
    isActive,
}: TeachersTab) {
    const { loading, data } = useQuery<{ GetAllUsers: UsersList }, { page?: number, pageSize?: number, active: boolean, roles: Role[] }>(
        GET_ALL_USERS,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                active: isActive,
                roles: [Role.UnitAdmin],
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
                        roles: [Role.UnitAdmin],
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
                <UnitAdminDrawer isOpen={isOpen} setOpen={setOpen} unitAdminId={userId} />
            }
            handleDelete={(userId: number) => deleteUser({ variables: { id: String(userId) } })}
        />
    );
}

export default UnitAdminsTab;