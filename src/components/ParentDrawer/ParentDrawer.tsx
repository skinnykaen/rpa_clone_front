import { Col, Drawer, Row, Typography } from "antd";

import { useQuery } from "@apollo/client";

import ProfileData from "@/components/ProfileData";
import ProjectPagesList from "@/components/ProjectPagesList";
import { withPaginationLocal } from "@/hocs";
import { ProjectPageHttpList } from "@/__generated__/graphql";
import { GET_ALL_PROJECT_PAGES_BY_AUTHOR_ID } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";

interface ParentDrawerProps {
    parentId: number;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function ParentDrawer({ parentId, isOpen, setOpen }: ParentDrawerProps) {
    const ProjectPageList = withPaginationLocal(ProjectPagesList, 10);
    const GetAllProjectPages = useQuery<{ GetAllProjectPagesByAuthorId: ProjectPageHttpList }, { id: string, page?: number, pageSize?: number }>(
        GET_ALL_PROJECT_PAGES_BY_AUTHOR_ID,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                id: String(parentId),
            },
            skip: !parentId,
        },
    );
    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }}>
                <ProfileData userId={parentId} />
            </Row>
        </Drawer>
    );
}

export default ParentDrawer;