import { useMutation, useQuery } from "@apollo/client";
import { Col, Drawer, Row, Tabs, Typography } from "antd";

import RobboUnitData from "@/components/RobboUnitData";
import { GET_STUDENTS_BY_ROBBO_UNIT_ID } from "@/graphql/query";
import { QueryGetStudentsByRobboUnitIdArgs, UsersList } from "@/__generated__/graphql";
import { handlingGraphqlErrors } from "@/utils";
import UsersListComponent from "@/components/UsersList";
import UnitAdminDrawer from "@/modules/UnitAdminDrawer";
import { useAppSelector } from "@/store";
import RobboGroupsTab from "./RobboGroupsTab";
import UnitAdminsTab from "./UnitAdminsTab";
import { Roles } from "@/models";
import StudentsTab from "./StudentsTab";

interface RobboUnitDrawerProps {
    isEditMode: boolean;
    robboUnitId: number;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function RobboUnitDrawer({
    robboUnitId,
    isOpen,
    setOpen,
    isEditMode,
}: RobboUnitDrawerProps) {
    const { userRole } = useAppSelector(state => state.authReducer);
    let items;
    switch (userRole) {
        case Roles.SuperAdmin:
            items = [
                {
                    label: 'Роббо группы',
                    key: '1',
                    children: <RobboGroupsTab robboUnitId={robboUnitId} />,
                },
                {
                    label: 'Юнит Админы',
                    key: '2',
                    children: <UnitAdminsTab robboUnitId={robboUnitId} />,
                },
                {
                    label: 'Ученики',
                    key: '3',
                    children: <StudentsTab robboUnitId={robboUnitId}/>
                },
                {
                    label: 'Курсы',
                    key: '4',
                    children: <></>,
                },
            ];
            break;
        case Roles.UnitAdmin:
            items = [
                {
                    label: 'Роббо группы',
                    key: '1',
                    children: <RobboGroupsTab robboUnitId={robboUnitId} />,
                },
                {
                    label: 'Ученики',
                    key: '3',
                    children: <StudentsTab robboUnitId={robboUnitId}/>,
                },
                {
                    label: 'Курсы',
                    key: '4',
                    children: <></>,
                },
            ];
    }

    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Typography.Title level={3}>Роббо юнит</Typography.Title>
            <Row gutter={{ xs: 23, sm: 23, md: 23, lg: 23 }}>
                <RobboUnitData isEditMode={isEditMode} robboUnitId={robboUnitId} />
            </Row>
            <Col xs={23} sm={23} md={23} lg={23} xl={23}>
                <Tabs
                    defaultActiveKey='1'
                    items={items}
                />
            </Col>
        </Drawer>
    );
}

export default RobboUnitDrawer;