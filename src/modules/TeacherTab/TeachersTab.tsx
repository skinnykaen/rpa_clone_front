import { notification } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { Role, UsersList } from "@/__generated__/graphql";
import UsersListComponent from "@/components/UsersList";
import { DELETE_USER } from "@/graphql/mutations";
import { GET_ALL_USERS } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";

interface TeachersTab {
    isActive: boolean;
}

function TeachersTab({
    isActive,
}: TeachersTab) {
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const { loading, data } = useQuery<{ GetAllUsers: UsersList }, { page?: number, pageSize?: number, active: boolean, roles: Role[] }>(
        GET_ALL_USERS,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                active: isActive,
                roles: [Role.Teacher],
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
                        roles: [Role.Teacher],
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
            isOpenDrawer={isOpenDrawer}
            openDrawer={setOpenDrawer}
            drawerRender={() =>  <></>}
            handleDelete={(userId: number) => deleteUser({ variables: { id: String(userId) } })}
        />
    );
}

export default TeachersTab;