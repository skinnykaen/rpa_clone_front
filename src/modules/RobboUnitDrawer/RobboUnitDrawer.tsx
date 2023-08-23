import RobboUnitData from "@/components/RobboUnitData";
import { Col, Drawer, Row, Tabs, Typography } from "antd";

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
    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Typography.Title level={3}>Роббо юнит</Typography.Title>
            <Row gutter={{ xs: 23, sm: 23, md: 23, lg: 23 }}>
                <RobboUnitData isEditMode={isEditMode} robboUnitId={robboUnitId} />
            </Row>
            <Col xs={23} sm={23} md={23} lg={23} xl={23}>
                <Tabs
                    defaultActiveKey='1'
                    items={[
                        {
                            label: 'Роббо группы',
                            key: '1',
                            children: <></>,
                        },
                        {
                            label: 'Юнит Админы',
                            key: '2',
                            children: <></>,
                        },
                        {
                            label: 'Ученики',
                            key: '3',
                            children: <></>,
                        },
                        {
                            label: 'Курсы',
                            key: '4',
                            children: <></>,
                        },
                    ]}
                />
            </Col>
        </Drawer>
    );
}

export default RobboUnitDrawer;