import { Tabs } from "antd";

import CreateUserButton from '@/modules/CreateUserButton';
import StudentsTab from "@/modules/StudentsTab";
import { Role } from "@/__generated__/graphql";

function StudentsPage() {
    return (
        <>
            <CreateUserButton userRole={Role.Student} />
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