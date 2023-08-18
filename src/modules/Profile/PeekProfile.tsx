
import { Roles } from "@/models";
import StudentProfile from "@/components/StudentProfile/StudentProfile";

interface PeekProfile {
    peekUserId: number;
    peekUserRole: Roles;
}

function PeekProfile({
    peekUserId,
    peekUserRole,
}: PeekProfile) {
    let PeekProfile = () => <></>;
    switch (peekUserRole) {
        case Roles.Student: {
            PeekProfile = () => <StudentProfile id={peekUserId} />;
            break;
        }
        case Roles.Parent: {
            PeekProfile = () => <StudentProfile id={peekUserId} />;
            break;
        }
    }
    return (
        <>  
            <PeekProfile />
        </>
    );
}

export default PeekProfile;