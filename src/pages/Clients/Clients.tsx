import { Tabs } from "antd";

import CreateUserButton from "@/modules/CreateUserButton";
import ClientsTab from "@/modules/ClientsList";
import { Role } from "@/__generated__/graphql";

function ClientsPage() {
    return (
        <>
            <CreateUserButton userRole={Role.Parent} />
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
                        children: <ClientsTab isActive={false} />,
                    },
                ]}
            />
        </>
    );
}

export default ClientsPage;