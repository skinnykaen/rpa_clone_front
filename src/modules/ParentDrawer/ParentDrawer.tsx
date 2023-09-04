import { Col, Drawer, Row, Typography, notification } from "antd";

import { useMutation, useQuery } from "@apollo/client";

import { QueryGetChildrenByParentArgs, Role, UsersList } from "@/__generated__/graphql";
import SearchModal from "@/modules/SearchModal";
import CreateUserButton from "@/modules/CreateUserButton";
import StudentDrawer from "@/modules/StudentDrawer";
import ProfileData from "@/components/ProfileData";
import UsersListComponent from "@/components/UsersList";
import { GET_CHILDREN_BY_PARENT } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { CREATE_PARENT_REL, DELETE_PARENT_REL } from "@/graphql/mutations";
import { QueryOptions } from "apollo-client";
import { graphql } from "@apollo/client/react/hoc";
import { useAppSelector } from "@/store";
import { Roles } from "@/models";

interface ParentDrawerProps {
    parentId: number;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function ParentDrawer({ parentId, isOpen, setOpen }: ParentDrawerProps) {
    const { userRole } = useAppSelector(state => state.authReducer);
    const canEdit = userRole == Roles.SuperAdmin || userRole == Roles.UnitAdmin;
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
    const SearchStudentModal = graphql<{ coreRelId: number }, { CreateParentRel: Response }>(CREATE_PARENT_REL, {
        options: {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Ученик успешно добавлен.',
                });
            },
            refetchQueries: [
                {
                    query: GET_CHILDREN_BY_PARENT,
                    variables: {
                        parentId: String(parentId),
                    },
                } as QueryOptions<QueryGetChildrenByParentArgs>,
            ],
        },
    })(({ mutate, coreRelId }) => {
        return (
            <SearchModal
                buttonText='Добавить'
                searchTarget={'ребенка'}
                onClickHandle={mutate}
                coreRelId={coreRelId}
                roles={[Role.Student]}
            />
        );
    });

    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }}>
                <ProfileData userId={parentId} isEditMode={canEdit}/>
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
                    <SearchStudentModal coreRelId={parentId} />
                </Col>
            </Row>
        </Drawer>
    );
}

export default ParentDrawer;