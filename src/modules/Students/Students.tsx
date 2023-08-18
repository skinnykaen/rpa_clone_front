import { Tabs } from 'antd';

import StudentsTab from "./StudentsTab";



function StudentsList() {
    return (
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
    );
}

export default StudentsList;