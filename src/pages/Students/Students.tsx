import StudentsList from "@/modules/Students";
import CreateUserButton from '@/modules/CreateUserButton';
import { Roles } from '@/models';

function StudentsPage() {
    return (
        <>
            <CreateUserButton userRole={Roles.Student} />
            <StudentsList />
        </>
    );
}

export default StudentsPage;