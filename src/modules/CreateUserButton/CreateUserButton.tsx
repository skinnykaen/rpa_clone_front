import { useState } from "react";
import { Button, Modal } from "antd";
import { QueryBaseOptions } from "apollo-client";

import CreateUser from "@/components/CreateUserModal";
import { Roles } from "@/models";
import { GET_ALL_USERS } from "@/graphql/query";

interface CreateUserButtonProps {
    userRole: Roles;
}

function CreateUserButton({
    userRole,
}: CreateUserButtonProps) {
    const [openAddClient, setOpenAddClient] = useState(false);
    return (
        <>
            <Button type='primary' onClick={() => setOpenAddClient(true)}>
                Создать
            </Button>
            <Modal
                title={getModalTitle(userRole)}
                centered
                open={openAddClient}
                onCancel={() => setOpenAddClient(false)}
                footer={[]}
            >
                <CreateUser
                    role={userRole}
                    refetchQueries={[{
                        query: GET_ALL_USERS,
                        variables: {
                            active: true,
                            roles: [userRole],
                        },
                    } as QueryBaseOptions]} />
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