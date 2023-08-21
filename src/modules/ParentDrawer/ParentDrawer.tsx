import { Col, Drawer, Row, Space, Typography } from "antd";

import { useQuery } from "@apollo/client";

import ProfileData from "@/components/ProfileData";
import { Role, UsersList } from "@/__generated__/graphql";
import { GET_CHILDREN_BY_PARENT } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import UsersListComponent from "@/components/UsersList";
import StudentDrawer from "@/modules/StudentDrawer";
import CreateUserButton from "@/modules/CreateUserButton";
import { Roles } from "@/models";

interface ParentDrawerProps {
    parentId: number;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function ParentDrawer({ parentId, isOpen, setOpen }: ParentDrawerProps) {
    const { loading, data } = useQuery<{ GetChildrenByParent: UsersList }, { parentId: string }>(
        GET_CHILDREN_BY_PARENT,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                parentId: String(parentId),
            },
        },
    );
    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }}>
                <ProfileData userId={parentId} />
                    <Col xs={23} sm={23} md={23} lg={23} xl={23}>
                        <Typography.Title level={3}>Дети</Typography.Title>
                        <UsersListComponent
                            isLoading={loading}
                            users={data?.GetChildrenByParent.users}
                            countRows={data?.GetChildrenByParent.countRows || 0}
                            renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number) =>
                                <StudentDrawer isOpen={isOpen} setOpen={setOpen} studentId={userId} />
                            }
                        />
                    </Col>
                    <Col xs={23} sm={23} md={23} lg={23} xl={23} style={{marginTop: '1rem'}}>
                        <CreateUserButton userRole={Roles.Student} />
                    </Col>
            </Row>
        </Drawer>
    );
}

export default ParentDrawer;