import { ProjectPageHttp, ProjectPageHttpList } from "@/__generated__/graphql";
import ProjectPagesList from "@/components/ProjectPagesList";
import { CREATE_PROJECT_PAGE } from "@/graphql/mutations";
import { GET_ALL_PROJECT_PAGES_BY_ACCESS_TOKEN } from "@/graphql/query";
import { withPaginationUrl } from "@/hocs";
import { handlingGraphqlErrors } from "@/utils";
import { useMutation, useQuery } from "@apollo/client";
import { Button, notification } from "antd";
import { QueryOptions } from "apollo-client";

function ProjectsModule() {
    const { loading, data } = useQuery<{ GetAllProjectPagesByAccessToken: ProjectPageHttpList }, { page?: number, pageSize?: number }>(
        GET_ALL_PROJECT_PAGES_BY_ACCESS_TOKEN,
        {
            onError: (error) => {
                handlingGraphqlErrors(error)
            },
        }
    );
    const [createProjectPage, createProjectPageResult] = useMutation<{ CreateProjectPage: ProjectPageHttp }, object>(
        CREATE_PROJECT_PAGE,
        {
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
            refetchQueries: [
                {
                    query: GET_ALL_PROJECT_PAGES_BY_ACCESS_TOKEN,
                } as QueryOptions
            ]
        }
    );
    const ProjectPageList = withPaginationUrl(ProjectPagesList, 10);

    return (
        <>
            <Button
                type='primary'
                loading={createProjectPageResult.loading}
                onClick={() => createProjectPage()}
                style={{ marginBottom: '0.5rem' }}
            >
                {'Создать'}
            </Button>
            <ProjectPageList
                data={data?.GetAllProjectPagesByAccessToken}
                loading={loading}
                removal
            />
        </>

    );
}

export default ProjectsModule;