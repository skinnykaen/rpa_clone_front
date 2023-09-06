import { CoursesListHttp } from "@/__generated__/graphql";
import CoursesList from "@/components/CoursesList";
import { GET_COURSES_BY_USER_ID } from "@/graphql/query";
import { withPaginationUrl } from "@/hocs";
import CourseDrawer from "@/modules/CourseDrawer";
import { graphql } from "@apollo/client/react/hoc";

function CoursesPage() {
    const Courses = withPaginationUrl(CoursesList, 10);
    const CoursesWithGraph = graphql<object, { GetCoursesByUser: CoursesListHttp }>(GET_COURSES_BY_USER_ID)(({ data }) => (
        <Courses
            loading={data?.loading}
            data={data?.GetCoursesByUser}
            renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, course_id: string) => 
                <CourseDrawer isOpen={isOpen} setOpen={setOpen} courseId={course_id}/>
            }
        />
    ));
    return (
        <CoursesWithGraph />
    );
}

export default CoursesPage;