import { Drawer, Row } from "antd";
import ProfileData from "../ProfileData";

interface TeachersDrawerProps {
    teacherId: number;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function TeachersDrawer({teacherId, isOpen, setOpen}: TeachersDrawerProps) {
    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }}>
                <ProfileData userId={teacherId} />
            </Row>
        </Drawer>
    );
}

export default TeachersDrawer;