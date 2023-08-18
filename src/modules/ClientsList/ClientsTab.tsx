import { List, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { useState } from "react";

import { Role, UsersList } from "@/__generated__/graphql";
import { GET_ALL_USERS } from "@/graphql/query";
import { DELETE_USER } from "@/graphql/mutations";
import { handlingGraphqlErrors } from "@/utils";
import ParentDrawer from "@/components/ParentDrawer";
import UsersListComponent from "@/components/UsersList";

interface StudentsTabProps {
    isActive: boolean;
}

function ClientsTab({
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
                roles: [Role.Parent],
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
                        roles: [Role.Parent],
                    },
                },
            ],
        },
    );
    const navigate = useNavigate();
    // const openProfileStudent = (userId: number): void => {
    //     navigate(PROFILE_PAGE_ROUTE, {
    //         state: {
    //             userId,
    //             userRole: Role.Parent,
    //         },
    //     })
    //     return
    // };
    return (
        <>
            <UsersListComponent
                isLoading={loading && deleteUserResult.loading}
                users={data?.GetAllUsers.users}
                countRows={data?.GetAllUsers.countRows || 0}
                isOpenDrawer={isOpenDrawer}
                openDrawer={setOpenDrawer}
                drawerRender={(parentId: number) => <ParentDrawer isOpen={isOpenDrawer} setOpen={setOpenDrawer} parentId={parentId} />}
                handleDelete={(userId: number) => deleteUser({ variables: { id: String(userId) } })}
            />
            {/* <List
                className='clients'
                loading={loading || deleteUserResult.loading}
                bordered
                size='large'
                dataSource={data?.GetAllUsers.users}
                pagination={{
                    onChange: onChangePage,
                    total: data?.GetAllUsers.countRows,
                    current: +page,
                    defaultCurrent: 1,
                    defaultPageSize: pageSize,
                    responsive: true,
                }}
                itemLayout='vertical'
                renderItem={(user, index) => (
                    <>
                        <ListItem
                            index={index}
                            renderLabel={() => <>{user.lastname} {user.firstname} {user.middlename}</>}
                            handleClick={() => openParentDrawer(!isOpenDrawer)}
                            // handleClick={() => openProfileStudent(Number(user.id))}
                            handleDelete={() => deleteUser({ variables: { id: String(user.id) } })}
                        />

                    </>
                )}
            /> */}
        </>
    );
}

export default ClientsTab;