import { Roles } from "@/models";
import CreateUserButton from "@/modules/CreateUserButton";
import UnitAdminsTab from "@/modules/UnitAdminsTab";
import { Tabs } from "antd";

function UnitAdmins() {
    return (
        <>
            <CreateUserButton userRole={Roles.UnitAdmin} />
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