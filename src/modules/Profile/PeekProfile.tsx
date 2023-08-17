
import { Roles } from "@/models";
import StudentProfile from "./StudentProfile";

interface PeekProfile {
    peekUserId: number;
    peekUserRole: Roles;
}

function PeekProfile({
    peekUserId,
    peekUserRole,
}: PeekProfile) {
    let PeekProfile = () => <></>
    switch (peekUserRole) {
        case Roles.Student: {
            PeekProfile = () => <StudentProfile id={peekUserId} />
        }
    }
    return (
        <>  
            <PeekProfile />
        </>
    )
}

export default PeekProfile;