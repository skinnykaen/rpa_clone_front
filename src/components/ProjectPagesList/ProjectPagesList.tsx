import { List } from "antd";
import { useNavigate } from "react-router-dom";

import ListItem from "@/components/ListItem";
import { ProjectPageHttpList } from "@/__generated__/graphql";
import { WithPaginationProps } from "@/hocs";

type ProjectPagesListProps = WithPaginationProps & {
    loading: boolean;
    data?: ProjectPageHttpList;
}

function ProjectPagesList({
    loading,
    data,
    onChangePage,
    page,
    pageSize,
}: ProjectPagesListProps) {
    const navigate = useNavigate();
    const openProjectPage = (id: number): void => {
        navigate(`/project/${id}`)
        return
    };
    return (
        <List
            className='projects'
            loading={loading}
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
                    label={projectPage.title}
                    handleClick={() => openProjectPage(Number(projectPage.id))}
                />
            )}
        />
    );
}

export default ProjectPagesList;