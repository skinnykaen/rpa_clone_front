import { Button, Modal, Tabs } from 'antd';
import { useState } from 'react';
import { QueryBaseOptions } from 'apollo-client';

import StudentsTab from "./StudentsTab";

import CreateUser from '@/components/CreateUser';
import { Role } from '@/__generated__/graphql';
import { GET_ALL_USERS } from '@/graphql/query';

function StudentsList() {
    const [openAddStudent, setOpenAddStudent] = useState(false);
    return (
        <>
            <Button type='primary' onClick={() => setOpenAddStudent(true)}>
                {'Создать'}
            </Button>
            <Modal
                title={'Создать ученика'}
                centered
                open={openAddStudent}
                onCancel={() => setOpenAddStudent(false)}
                footer={[]}
            >
                <CreateUser role={Role.Student} refetchQueries={[{
                    query: GET_ALL_USERS,
                    variables: {
                        active: true,
                        roles: [Role.Student],
                    },
                } as QueryBaseOptions]}/>
            </Modal>
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

export default StudentsList;