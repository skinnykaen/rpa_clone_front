import ProjectPageModule from "@/modules/ProjectPage";
import { useParams } from "react-router-dom";

function ProjectPage() {
    const { id } = useParams()
    return (
        <ProjectPageModule id={id || '0'} />
    );
}

export default ProjectPage