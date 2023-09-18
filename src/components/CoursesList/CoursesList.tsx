import { List, Typography } from "antd";

import { CoursesListHttp } from "@/__generated__/graphql";
import { WithPaginationProps } from "@/hocs";
import ListItem from "@/components/ListItem";

type CoursesListProps = WithPaginationProps & {
    loading?: boolean;
    data?: CoursesListHttp;
    renderDrawer?: (isOpen: boolean, setOpen: (isOpen: boolean) => void, course_id: string,) => JSX.Element;
}

function CoursesList({
    onChangePage,
    page,
    pageSize,
    loading = true,
    data,
    renderDrawer,
}: CoursesListProps) {
    return (
        <List
            className='courses'
            loading={loading}
            bordered
            size='large'
            dataSource={data?.results}
            pagination={{
                onChange: onChangePage,
                total: data?.countRows,
                current: +page,
                defaultCurrent: 1,
                defaultPageSize: pageSize,
                responsive: true,
            }}
            itemLayout='vertical'
            renderItem={(course, index) => (
                <ListItem
                    index={index}
                    itemId={Number(course.course_id)}
                    renderLabel={() => (<Typography.Text>{course.name}</Typography.Text>)}
                    renderDrawer={(isOpen, setOpen, itemId) => renderDrawer ? renderDrawer(isOpen, setOpen, course.course_id) : <></>}
                // handleClick={() => openProjectPage(Number(projectPage.id))}
                // handleDelete={removal ? () => deleteProjectPage({ variables: { id: projectPage.id } }) : undefined}
                />
            )}
        />
    );
}

export default CoursesList;