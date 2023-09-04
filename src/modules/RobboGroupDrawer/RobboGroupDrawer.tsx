import RobboGroupData from "@/components/RobboGroupData";
import { Col, Drawer, Tabs, Typography } from "antd";
import StudentsTab from "./StudentsTab";
import TeachersTab from "./TeachersTab";
import { useAppSelector } from "@/store";
import { Roles } from "@/models";

interface RobboGroupDrawerProps {
    isEditMode: boolean;
    robboGroupId: number;
    robboUnitId?: number;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function RobboGroupDrawer({
    isEditMode,
    robboGroupId,
    robboUnitId,
    isOpen,
    setOpen,
}: RobboGroupDrawerProps) {
    let items;
    const { userRole } = useAppSelector(state => state.authReducer);
    switch (userRole) {
        case Roles.SuperAdmin:
            items = [
                {
                    label: 'Ученики',
                    key: '1',
                    children: <StudentsTab robboGroupId={robboGroupId} clientRole={userRole}/>,
                },
                {
                    label: 'Педагоги',
                    key: '2',
                    children: <TeachersTab robboGroupId={robboGroupId} />,
                },
                {
                    label: 'Курсы',
                    key: '3',
                    children: <></>,
                },
            ];
            break;
        case Roles.UnitAdmin:
            items = [
                {
                    label: 'Ученики',
                    key: '1',
                    children: <StudentsTab robboGroupId={robboGroupId} clientRole={userRole}/>,
                },
                {
                    label: 'Педагоги',
                    key: '2',
                    children: <TeachersTab robboGroupId={robboGroupId} />,
                },
                {
                    label: 'Курсы',
                    key: '3',
                    children: <></>,
                },
            ]
            break;
        case Roles.Teacher:
            items = [
                {
                    label: 'Ученики',
                    key: '1',
                    children: <StudentsTab robboGroupId={robboGroupId} clientRole={userRole}/>,
                },
                {
                    label: 'Курсы',
                    key: '3',
                    children: <></>,
                },
            ]
            break;
    }
    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Typography.Title level={3}>Роббо группа</Typography.Title>
            <RobboGroupData isEditMode={isEditMode} robboGroupId={robboGroupId} />
            <Col xs={23} sm={23} md={23} lg={23} xl={23}>
                <Tabs
                    defaultActiveKey='1'
                    items={items}
                />
            </Col>
        </Drawer>
    );
}

export default RobboGroupDrawer;