import { Button, Modal, Tabs } from "antd";
import { QueryBaseOptions } from "apollo-client";
import { useState } from "react";

import ClientsTab from './ClientsTab';

import { Role } from "@/__generated__/graphql";
import { GET_ALL_USERS } from "@/graphql/query";
import CreateUser from "@/components/CreateUser";

function ClientsList() {
    const [openAddClient, setOpenAddClient] = useState(false);

    return (
        <>
            <Button type='primary' onClick={() => setOpenAddClient(true)}>
                {'Создать'}
            </Button>
            <Modal
                title={'Создать клиента'}
                centered
                open={openAddClient}
                onCancel={() => setOpenAddClient(false)}
                footer={[]}
            >
                <CreateUser
                    role={Role.Parent}
                    refetchQueries={[{
                        query: GET_ALL_USERS,
                        variables: {
                            active: true,
                            roles: [Role.Parent],
                        },
                    } as QueryBaseOptions]} />
            </Modal>
            <Tabs
                defaultActiveKey='1'
                items={[
                    {
                        label: 'Активные',
                        key: '1',
                        children: <ClientsTab isActive={true} />,
                    },
                    {
                        label: 'Не активные',
                        key: '2',
                        children: <ClientsTab isActive={false}/>,
                    },
                ]}
            />
        </>
    );
}

export default ClientsList;