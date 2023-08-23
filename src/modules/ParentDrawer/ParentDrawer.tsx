import { Col, Drawer, Row, Typography, notification } from "antd";

import { useMutation, useQuery } from "@apollo/client";

import { Role, UsersList } from "@/__generated__/graphql";
import SearchModal from "@/modules/SearchModal";
import CreateUserButton from "@/modules/CreateUserButton";
import StudentDrawer from "@/modules/StudentDrawer";
import ProfileData from "@/components/ProfileData";
import UsersListComponent from "@/components/UsersList";
import { GET_CHILDREN_BY_PARENT } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { CREATE_PARENT_REL, DELETE_PARENT_REL } from "@/graphql/mutations";
import { QueryOptions } from "apollo-client";

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
    const [deleteParentRel, deleteParentRelResult] = useMutation<{ DeleteParentRel: Response }, { parentId: string, childId: string }>(
        DELETE_PARENT_REL,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Связь успешно удалена.',
                });
            },
            refetchQueries: [
                {
                    query: GET_CHILDREN_BY_PARENT,
                    variables: {
                        parentId: String(parentId),
                    },
                } as QueryOptions<{ parentId: string }>,
            ],
        },
    );
    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }}>
                <ProfileData userId={parentId} />
                <Col xs={23} sm={23} md={23} lg={23} xl={23}>
                    <Typography.Title level={3}>Дети</Typography.Title>
                    <UsersListComponent
                        isLoading={loading || deleteParentRelResult.loading}
                        users={data?.GetChildrenByParent.users}
                        countRows={data?.GetChildrenByParent.countRows || 0}
                        renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number) =>
                            <StudentDrawer isOpen={isOpen} setOpen={setOpen} studentId={userId} />
                        }
                        handleDelete={(userId: number) => deleteParentRel({ variables: { parentId: String(parentId), childId: String(userId) } })}
                    />
                </Col>
                <Col xs={23} sm={23} md={4} lg={4} xl={4} style={{ marginTop: '1rem' }}>
                    <CreateUserButton userRole={Role.Student} />
                </Col>
                <Col xs={23} sm={23} md={4} lg={4} xl={4} style={{ marginTop: '1rem' }}>
                    <SearchModal buttonText='Добавить' searchTarget={'ребенка'}/>
                </Col>
            </Row>
        </Drawer>
    );
}

export default ParentDrawer;