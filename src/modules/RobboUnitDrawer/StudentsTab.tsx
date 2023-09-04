import { QueryGetStudentsByRobboUnitIdArgs, UsersList } from "@/__generated__/graphql";
import UsersListComponent from "@/components/UsersList";
import { GET_STUDENTS_BY_ROBBO_UNIT_ID } from "@/graphql/query";
import UnitAdminDrawer from "@/modules/UnitAdminDrawer";
import { handlingGraphqlErrors } from "@/utils";
import { useQuery } from "@apollo/client";

interface StudentsTabProps {
    robboUnitId: number;
}

function StudentsTab({ robboUnitId }: StudentsTabProps) {
    const getStudentsByRobboUnitId = useQuery<{ GetStudentsByRobboUnitId: UsersList }, QueryGetStudentsByRobboUnitIdArgs>(
        GET_STUDENTS_BY_ROBBO_UNIT_ID,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                robboUnitId: String(robboUnitId),
            },
        },
    );
    return (
        <UsersListComponent
            isLoading={getStudentsByRobboUnitId.loading}
            users={getStudentsByRobboUnitId.data?.GetStudentsByRobboUnitId.users}
            countRows={getStudentsByRobboUnitId.data?.GetStudentsByRobboUnitId.countRows || 0}
            renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number) =>
                <UnitAdminDrawer isOpen={isOpen} setOpen={setOpen} unitAdminId={userId} />
            }
        />
    );
}

export default StudentsTab