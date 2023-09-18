import { List, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";

import ListItem from "@/components/ListItem";
import { ProjectPageHttp, ProjectPageHttpList } from "@/__generated__/graphql";
import { WithPaginationProps } from "@/hocs";
import { DELETE_PROJECT_PAGE } from "@/graphql/mutations";
import { GET_ALL_PROJECT_PAGES_BY_ACCESS_TOKEN } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { ProjectPageStatus } from "@/models";

type ProjectPagesListProps = WithPaginationProps & {
    loading: boolean;
    data?: ProjectPageHttpList;
    removal: boolean;
}

function ProjectPagesList({
    onChangePage,
    page,
    pageSize,
    loading,
    data,
    removal,
}: ProjectPagesListProps) {
    const navigate = useNavigate();
    const openProjectPage = (id: number): void => {
        navigate(`/project/${id}`);
        return;
    };
    const projectPageLabel = (projectPage: ProjectPageHttp) => {
        let projectPageStatus: ProjectPageStatus = ProjectPageStatus.Private;
        if (projectPage.isBanned) {
            projectPageStatus = ProjectPageStatus.Banned;
        }else if (projectPage.isShared){
            projectPageStatus = ProjectPageStatus.Shared;
        }else {
            projectPageStatus = ProjectPageStatus.Private;
        }
        return (
            <Typography.Text>
                {projectPage.title + "  "}<Typography.Text code color='red'>{projectPageStatus}</Typography.Text>
            </Typography.Text>
        );
    };
    const [deleteProjectPage, deleteProjectPageResult] = useMutation<{ DeleteProjectPage: Response }, { id: string }>(
        DELETE_PROJECT_PAGE,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Страница проекта удалена.',
                });
            },
            refetchQueries: [
                {
                    query: GET_ALL_PROJECT_PAGES_BY_ACCESS_TOKEN,
                },
            ],
        },
    );
    return (
        <List
            className='projects'
            loading={loading || deleteProjectPageResult.loading}
            bordered
            size='large'
            dataSource={data?.projectPages}
            pagination={{
                onChange: onChangePage,
                total: data?.countRows,
                current: +page,
                defaultCurrent: 1,
                defaultPageSize: pageSize,
                responsive: true,
            }}
            itemLayout='vertical'
            renderItem={(projectPage, index) => (
                <ListItem
                    index={index}
                    itemId={Number(projectPage.id)}
                    renderLabel={() => projectPageLabel(projectPage)}
                    handleClick={() => openProjectPage(Number(projectPage.id))}
                    handleDelete={removal ? () => deleteProjectPage({ variables: { id: projectPage.id } }) : undefined}
                />
            )}
        />
    );
}

export default ProjectPagesList;