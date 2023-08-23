import { useState } from "react";
import { Button, Modal } from "antd";

import CreateRobboUnit from "@/components/CreateRobboUnitModal";

function CreateRobboUnitButton() {
    const [openCreateRobboUnit, setOpenCreateRobboUnit] = useState(false);
    return (
        <>
            <Button type='primary' onClick={() => setOpenCreateRobboUnit(true)}>
                Создать
            </Button>
            <Modal
                title={'Создать роббо юнит'}
                centered
                open={openCreateRobboUnit}
                onCancel={() => setOpenCreateRobboUnit(false)}
                footer={[]}
            >
               <CreateRobboUnit />
            </Modal>
        </>
    );
}

export default CreateRobboUnitButton;