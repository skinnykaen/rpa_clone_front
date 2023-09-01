import { useState } from "react";
import { Button, Modal } from "antd";
import CreateRobboGroupModal from "@/components/CreateRobboGroupModal";

interface CreateRobboGroupButtonProps {
    robboUnitId: number;
}

function CreateRobboGroupButton({ robboUnitId }: CreateRobboGroupButtonProps) {
    const [openCreateRobboGroup, setOpenCreateRobboGroup] = useState(false);
    return (
        <>
            <Button type='primary' onClick={() => setOpenCreateRobboGroup(true)}>
                Создать
            </Button>
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