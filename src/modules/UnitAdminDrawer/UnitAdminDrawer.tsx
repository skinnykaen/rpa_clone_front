import { Drawer, Row, Tabs } from "antd";
import ProfileData from "@/components/ProfileData";
import { useAppSelector } from "@/store";
import { Roles } from "@/models";
import RobboUnitsTab from "./RobboUnitsTab";

interface UnitAdminDrawerProps {
    unitAdminId: number;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function UnitAdminDrawer({ unitAdminId, isOpen, setOpen }: UnitAdminDrawerProps) {
    const { userRole } = useAppSelector(state => state.authReducer);
    const canEdit = userRole == Roles.SuperAdmin;
    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }}>
                <ProfileData userId={unitAdminId} isEditMode={canEdit} />
            </Row>
            <Tabs
                defaultActiveKey='1'
                items={[
                    {
                        label: 'Роббо юниты',
                        key: '1',
                        children: <RobboUnitsTab unitAdminId={unitAdminId}/>,
                    },
                    {
                        label: 'Курсы',
                        key: '2',
                        children: <></>,
                    },
                ]}
            />
        </Drawer>
    );
}

export default UnitAdminDrawer;