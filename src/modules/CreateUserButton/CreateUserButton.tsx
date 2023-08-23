import { useState } from "react";
import { Button, Modal } from "antd";
import { QueryBaseOptions } from "apollo-client";

import CreateUser from "@/components/CreateUserModal";
import { Roles } from "@/models";
import { GET_ALL_USERS } from "@/graphql/query";
import { QueryGetAllUsersArgs, Role } from "@/__generated__/graphql";

interface CreateUserButtonProps {
    userRole: Role;
}

function CreateUserButton({
    userRole,
}: CreateUserButtonProps) {
    const [openCreateUser, setCreateAddUser] = useState(false);
    return (
        <>
            <Button type='primary' onClick={() => setCreateAddUser(true)}>
                Создать
            </Button>
            <Modal
                title={getModalTitle(userRole)}
                centered
                open={openCreateUser}
                onCancel={() => setCreateAddUser(false)}
                footer={[]}
            >
                <CreateUser
                    role={userRole}
                    refetchQueries={[{
                        query: GET_ALL_USERS,
                        variables: {
                            active: true,
                            roles: [userRole] as Role[],
                        },
                    } as QueryBaseOptions<QueryGetAllUsersArgs>]} />
            </Modal>
        </>
    );
}

function getModalTitle(userRole: string): string {
    let modalTitle = 'Создать ';
    switch (userRole) {
        case Roles.Parent:
            modalTitle += 'клиента';
            break;
        case Roles.Student:
            modalTitle += 'ученика';
            break;
        case Roles.Teacher:
            modalTitle += 'педагога';
            break;
        case Roles.UnitAdmin:
            modalTitle += 'юнит админа';
            break;
        default:
            modalTitle += 'пользователя';
    }
    return modalTitle;
}

export default CreateUserButton;