import { useState } from "react";
import { Button, Modal } from "antd";

import CreateRobboGroupModal from "../CreateRobboGroupModal /CreateRobboGroupModal";

interface CreateRobboGroupButtonProps {
    robboUnitId: number;
}

function CreateRobboGroupButton({ robboUnitId }: CreateRobboGroupButtonProps) {
    const [openCreateRobboGroup, setOpenCreateRobboGroup] = useState(false);
    return (
        <>
            <Modal
                title={'Создать роббо группу'}
                centered
                open={openCreateRobboGroup}
                onCancel={() => setOpenCreateRobboGroup(false)}
                footer={[]}
            >
                <CreateRobboGroupModal robboUnitId={robboUnitId} />
            </Modal>
        </>
    );
}

export default CreateRobboGroupButton;