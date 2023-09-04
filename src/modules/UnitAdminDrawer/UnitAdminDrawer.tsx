import { Drawer, Row } from "antd";
import ProfileData from "@/components/ProfileData";
import { useAppSelector } from "@/store";
import { Roles } from "@/models";

interface UnitAdminDrawerProps {
    unitAdminId: number;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function UnitAdminDrawer({unitAdminId, isOpen, setOpen}: UnitAdminDrawerProps) {
    const { userRole } = useAppSelector(state => state.authReducer);
    const canEdit = userRole == Roles.SuperAdmin;
    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }}>
                <ProfileData userId={unitAdminId} isEditMode={canEdit}/>
            </Row>
        </Drawer>
    );
}

export default UnitAdminDrawer;