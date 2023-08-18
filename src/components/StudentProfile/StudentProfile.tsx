import { Col, Row, Typography } from "antd";

import { useQuery } from "@apollo/client";

import ProfileData from "@/components/ProfileData";
import ProjectPagesList from "@/components/ProjectPagesList";
import { WithPaginationProps, withPaginationLocal } from "@/hocs";
import { ProjectPageHttpList } from "@/__generated__/graphql";
import { GET_ALL_PROJECT_PAGES_BY_AUTHOR_ID } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";

interface StudentProfileProps {
    id: number;
}

function StudentProfile({ id }: StudentProfileProps) {
    const ProjectPageList: (hocProps: Omit<{
        loading: boolean;
        data?: ProjectPageHttpList;
        removal: boolean;
    }, keyof WithPaginationProps>) => JSX.Element = withPaginationLocal(ProjectPagesList, 10);

    const GetAllProjectPages = useQuery<{ GetAllProjectPagesByAuthorId: ProjectPageHttpList }, { id: string, page?: number, pageSize?: number }>(
        GET_ALL_PROJECT_PAGES_BY_AUTHOR_ID,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                id: String(id),
            },
            skip: !id,
        },
    );
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 8, lg: 8 }}>
            <ProfileData userId={id} />
            <Col xs={23} sm={23} md={23} lg={12} xl={12}>
                <Typography.Title level={3}>Проекты</Typography.Title>
                <ProjectPageList
                    data={GetAllProjectPages.data?.GetAllProjectPagesByAuthorId}
                    loading={GetAllProjectPages.loading}
                    removal={false}
                />
            </Col>
        </Row>
    );
}

export default StudentProfile;