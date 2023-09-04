import { Col, Drawer, Row, Typography } from "antd";

import { useQuery } from "@apollo/client";

import ProfileData from "@/components/ProfileData";
import ProjectPagesList from "@/components/ProjectPagesList";
import { withPaginationLocal } from "@/hocs";
import { ProjectPageHttpList, QueryGetAllProjectPagesByAuthorIdArgs, QueryGetRobboGroupsByUserIdArgs, RobboGroupHttpList, UsersList } from "@/__generated__/graphql";
import { GET_ALL_PROJECT_PAGES_BY_AUTHOR_ID, GET_ROBBO_GROUP_BY_USER_ID } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { useAppSelector } from "@/store";
import { Roles } from "@/models";

interface StudentDrawerProps {
    studentId: number;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function StudentDrawer({ studentId, isOpen, setOpen }: StudentDrawerProps) {
    const { userRole } = useAppSelector(state => state.authReducer);
    const canEdit = userRole == Roles.SuperAdmin || userRole == Roles.UnitAdmin;
    const ProjectPageList = withPaginationLocal(ProjectPagesList, 10);
    const GetAllProjectPages = useQuery<{ GetAllProjectPagesByAuthorId: ProjectPageHttpList }, QueryGetAllProjectPagesByAuthorIdArgs>(
        GET_ALL_PROJECT_PAGES_BY_AUTHOR_ID,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                id: String(studentId),
            },
            skip: !studentId,
        },
    );
    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }}>
                <ProfileData userId={studentId} isEditMode={canEdit}/>
                <Col xs={23} sm={23} md={23} lg={23} xl={23}>
                    <Typography.Title level={3}>Проекты</Typography.Title>
                    <ProjectPageList
                        data={GetAllProjectPages.data?.GetAllProjectPagesByAuthorId}
                        loading={GetAllProjectPages.loading}
                        removal={false}
                    />
                </Col>
            </Row>
        </Drawer>
    );
}

export default StudentDrawer;