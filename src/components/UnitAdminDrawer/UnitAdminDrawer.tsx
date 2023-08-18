import { Drawer, Row } from "antd";
import ProfileData from "../ProfileData";

interface UnitAdminDrawerProps {
    unitAdminId: number;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function UnitAdminDrawer({unitAdminId, isOpen, setOpen}: UnitAdminDrawerProps) {
    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }}>
                <ProfileData userId={unitAdminId} />
            </Row>
        </Drawer>
    );
}

export default UnitAdminDrawer;