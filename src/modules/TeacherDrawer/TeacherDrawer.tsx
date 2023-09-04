import { Drawer, Row, Tabs } from "antd";
import ProfileData from "@/components/ProfileData";
import UsersListComponent from "@/components/UsersList";
import StudentDrawer from "../StudentDrawer";
import { useQuery } from "@apollo/client";
import { GET_ROBBO_GROUP_BY_USER_ID, GET_STUDENTS_BY_TEACHERS_ID } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { QueryGetRobboGroupsByUserIdArgs, QueryGetStudentsByTeacherIdArgs, RobboGroupHttpList, UsersList } from "@/__generated__/graphql";
import RobboGroupsList from "@/components/RobboGroupsList";
import RobboGroupDrawer from "../RobboGroupDrawer";
import { useAppSelector } from "@/store";
import { Roles } from "@/models";

interface TeachersDrawerProps {
    teacherId: number;
    isOpen: boolean;
    setOpen(isOpen: boolean): void;
}

function TeachersDrawer({ teacherId, isOpen, setOpen }: TeachersDrawerProps) {
    const { userRole } = useAppSelector(state => state.authReducer);
    const canEdit = userRole == Roles.SuperAdmin || userRole == Roles.UnitAdmin;
    const getStudentsResult = useQuery<{ GetStudentsByTeacherId: UsersList }, QueryGetStudentsByTeacherIdArgs>(
        GET_STUDENTS_BY_TEACHERS_ID,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                teacherId: String(teacherId),
            },
        },
    );
    const GetRobboGroupByUserId = useQuery<{ GetRobboGroupsByUserId: RobboGroupHttpList }, QueryGetRobboGroupsByUserIdArgs>(
        GET_ROBBO_GROUP_BY_USER_ID,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                userId: String(teacherId),
            },
            skip: !teacherId,
        },
    );
    return (
        <Drawer width={640} placement='right' closable={true} onClose={() => setOpen(false)} open={isOpen}>
            <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }}>
                <ProfileData userId={teacherId} isEditMode={canEdit}/>
            </Row>
            <Tabs
                defaultActiveKey='1'
                items={[
                    {
                        label: 'Ученики',
                        key: '1',
                        children: <>
                            <UsersListComponent
                                isLoading={getStudentsResult.loading}
                                users={getStudentsResult.data?.GetStudentsByTeacherId.users}
                                countRows={getStudentsResult.data?.GetStudentsByTeacherId.countRows || 0}
                                renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number) =>
                                    <StudentDrawer isOpen={isOpen} setOpen={setOpen} studentId={userId} />
                                }
                            />
                        </>,
                    },
                    {
                        label: 'Группы',
                        key: '2',
                        children: <>
                            <RobboGroupsList
                                isLoading={GetRobboGroupByUserId.loading}
                                robboGroups={GetRobboGroupByUserId.data?.GetRobboGroupsByUserId.robboGroups}
                                countRows={GetRobboGroupByUserId.data?.GetRobboGroupsByUserId.countRows}
                                renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, robboGroupId: number) =>
                                    <RobboGroupDrawer isEditMode={true} isOpen={isOpen} setOpen={setOpen} robboGroupId={robboGroupId} />
                                }
                            />
                        </>,
                    },
                    {
                        label: 'Курсы',
                        key: '3',
                        children: <></>,
                    },
                ]}
            />
        </Drawer>
    );
}

export default TeachersDrawer;