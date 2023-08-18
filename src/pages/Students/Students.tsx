import { Tabs } from "antd";

import CreateUserButton from '@/modules/CreateUserButton';
import { Roles } from '@/models';
import StudentsTab from "@/modules/StudentsTab";

function StudentsPage() {
    return (
        <>
            <CreateUserButton userRole={Roles.Student} />
            <Tabs
                defaultActiveKey='1'
                items={[
                    {
                        label: 'Активные',
                        key: '1',
                        children:
                            <StudentsTab isActive={true} />,
                    },
                    {
                        label: 'Не активные',
                        key: '2',
                        children:
                            <StudentsTab isActive={false} />,
                    },
                ]}
            />
        </>
    );
}

export default StudentsPage;