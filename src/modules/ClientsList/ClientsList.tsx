import { Tabs } from "antd";

import ClientsTab from './ClientsTab';

function ClientsList() {
    return (
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
    );
}

export default ClientsList;