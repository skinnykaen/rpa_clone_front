import { Drawer, Row } from "antd";

import ProfileData from "@/components/ProfileData";

interface ParentDrawerProps {
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
    parentId: number;
}

function ParentDrawer({
    isOpen,
    setOpen,
    parentId,
}: ParentDrawerProps) {
    return (
        <Drawer width={640} placement='right' closable={false} onClose={() => setOpen(false)} open={isOpen}>
            <Row gutter={{ xs: 8, sm: 16, md: 8, lg: 8 }}>
                <ProfileData userId={parentId} />
            </Row>
        </Drawer>
    );
}

export default ParentDrawer;