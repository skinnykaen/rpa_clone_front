import { Tabs } from "antd";

import CreateUserButton from "@/modules/CreateUserButton";
import { Roles } from "@/models";
import ClientsTab from "@/modules/ClientsList";

function ClientsPage() {
    return (
        <>
            <CreateUserButton userRole={Roles.Parent} />
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