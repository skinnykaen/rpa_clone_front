import { Button, Collapse, Row, Tooltip, Typography } from "antd";
import { useState } from "react";
import {
    PlusOutlined,
} from '@ant-design/icons';

import { Roles } from "@/models";
import UnitAdminCollapse from "./UnitAdminCollapse";

interface CourseAccessProps {
    courseId: string;
    userRole: Roles;
}

function CourseAccess({ courseId, userRole }: CourseAccessProps) {
    let defaultActiveKey = '1';

    const createAccessHandle = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
    };

    let collapseItems = [
        {
            label: <Row justify={'space-between'}>
                <Typography.Text>Роббо юниты</Typography.Text>
                <Tooltip title='Добавить'>
                    {/* <UnitAdminCollapse /> */}
                    {/* <Button icon={<PlusOutlined />} onClick={e => createAccessHandle(e)}/> */}
                </Tooltip>
            </Row>,
            key: '1',
            // children: selectedKey === '0'
            //     ? <CurrentCourseAccessRobboUnits courseId={courseId} />
            //     : <RobboUnitCourseAccess courseId={courseId} />,
        },
        {
            label: 'Роббо группы',
            key: '2',
            // children: selectedKey === '0'
            //     ? <CurrentCourseAccessRobboGroups courseId={courseId} />
            //     : <RobboGroupCourseAccess courseId={courseId} />,
        },
        {
            label: 'Юнит админы',
            key: '3',
            // children: 
        },
        {
            label: 'Педагоги',
            key: '4',
            // children: selectedKey === '0'
            //     ? <CurrentCourseAccessTeachers courseId={courseId} />
            //     : <TeacherCourseAccess courseId={courseId} />,
        },
        {
            label: 'Студенты',
            key: '5',
            // children: selectedKey === '0'
            //     ? <CurrentCourseAccessStudent courseId={courseId} />
            //     : <StudentCourseAccess courseId={courseId} />,
        },
    ];

    switch (userRole) {
        case Roles.UnitAdmin:
            collapseItems = collapseItems.filter(tabItem => ['2', '4', '5'].includes(tabItem.key, 0));
            defaultActiveKey = '2';
            break;
        case Roles.Teacher:
            collapseItems = collapseItems.filter(tabItem => ['5'].includes(tabItem.key, 0));
            defaultActiveKey = '5';
            break;
    }

    return (
        <Collapse
            defaultActiveKey={defaultActiveKey}
            items={collapseItems}
        />
    );
}

export default CourseAccess;