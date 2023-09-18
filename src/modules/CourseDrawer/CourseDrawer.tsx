import { CourseHttp, QueryGetCourseByIdArgs } from "@/__generated__/graphql";
import CourseData from "@/components/CourseData";
import { GET_COURSE_BY_ID } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { useQuery } from "@apollo/client";
import { Drawer} from "antd";

interface CourseDrawerProps {
    courseId: string;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function CourseDrawer({
    courseId,
    isOpen,
    setOpen,
}: CourseDrawerProps) {
    const { loading, data } = useQuery<{ GetCourseById: CourseHttp }, QueryGetCourseByIdArgs>(
        GET_COURSE_BY_ID,
        {
            onError: error => handlingGraphqlErrors(error),
            variables: {
                id: String(courseId),
            },
        },
    );
    return (
        <Drawer
            width={640}
            placement='right'
            closable={true}
            onClose={() => setOpen(false)}
            open={isOpen}
            title='Курс'
        >
            <CourseData loading={loading} data={data?.GetCourseById} />
        </Drawer>
    );
}

export default CourseDrawer;