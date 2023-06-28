import { ProjectPageHttp, ProjectPageHttpList } from "@/__generated__/graphql";
import ListItem from "@/components/ListItem";
import { CREATE_PROJECT_PAGE } from "@/graphql/mutations";
import { GET_ALL_PROJECT_PAGES_BY_ACCESS_TOKEN } from "@/graphql/query";
import { WithPaginationProps, withPaginationUrl } from "@/hocs";
import { useMutation, useQuery } from "@apollo/client";
import { Button, List, notification } from "antd";
import { QueryOptions } from "apollo-client";
import { useNavigate } from "react-router-dom";

type ProjectsTabProps = WithPaginationProps
function ProjectsModule({
    onChangePage,
    page,
    pageSize,
}: ProjectsTabProps) {
    const { loading, data } = useQuery<{ GetAllProjectPagesByAccessToken: ProjectPageHttpList }, { page?: number, pageSize?: number }>(
        GET_ALL_PROJECT_PAGES_BY_ACCESS_TOKEN,
        {
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
            variables: {
                page: page,
                pageSize: pageSize,
            }
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
                    variables: {
                        page: page,
                        pageSize: pageSize,
                    }
                } as QueryOptions
            ]
        }
    );
    const navigate = useNavigate();
    const openProjectPage = (id: number): void => {
        navigate(`/project/${id}`)
        return
    };

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
            <List
                className='projects'
                loading={loading}
                bordered
                size='large'
                dataSource={data?.GetAllProjectPagesByAccessToken.projectPages}
                pagination={{
                    onChange: onChangePage,
                    total: data?.GetAllProjectPagesByAccessToken.countRows,
                    current: +page,
                    defaultCurrent: 1,
                    defaultPageSize: pageSize,
                    responsive: true,
                }}
                itemLayout='vertical'
                renderItem={(projectPage, index) => (
                    <ListItem
                        index={index}
                        label={projectPage.title}
                        handleClick={() => openProjectPage(Number(projectPage.id))}
                    />
                )}
            />
        </>

    );
}

const WithPaginationComponent = withPaginationUrl(ProjectsModule, 10);

export default WithPaginationComponent;