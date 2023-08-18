import { Tabs } from "antd";

import { Roles } from "@/models";
import TeachersTab from "@/modules/TeacherTab";
import CreateUserButton from "@/modules/CreateUserButton";

function TeachersPage() {
    return (
        <>
            <CreateUserButton userRole={Roles.Teacher} />
            <Tabs
                defaultActiveKey='1'
                items={[
                    {
                        label: 'Активные',
                        key: '1',
                        children: <TeachersTab isActive={true} />,
                    },
                    {
                        label: 'Не активные',
                        key: '2',
                        children: <TeachersTab isActive={false} />,
                    },
                ]}
            />
        </>
    );
}

export default TeachersPage;