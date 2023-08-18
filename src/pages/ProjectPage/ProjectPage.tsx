import { useParams } from "react-router-dom";

import ProjectPageModule from "@/modules/ProjectPage";

function ProjectPage() {
    const { id } = useParams();
    return (
        <ProjectPageModule id={id || '0'} />
    );
}

export default ProjectPage;