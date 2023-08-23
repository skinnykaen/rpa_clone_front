import { Tabs } from "antd";
import { Role } from "@/__generated__/graphql";
import CreateUserButton from "@/modules/CreateUserButton";
import UnitAdminsTab from "@/modules/UnitAdminsTab";

function UnitAdmins() {
    return (
        <>
            <CreateUserButton userRole={Role.UnitAdmin} />
            <Tabs
                defaultActiveKey='1'
                items={[
                    {
                        label: 'Активные',
                        key: '1',
                        children: <UnitAdminsTab isActive={true} />,
                    },
                    {
                        label: 'Не активные',
                        key: '2',
                        children: <UnitAdminsTab isActive={false} />,
                    },
                ]}
            />
        </>
    );
}

export default UnitAdmins;