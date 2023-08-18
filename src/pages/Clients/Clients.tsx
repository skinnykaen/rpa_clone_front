import ClientsList from "@/modules/ClientsList/ClientsList";
import CreateUserButton from "@/modules/CreateUserButton";
import { Roles } from "@/models";

function ClientsPage() {
    return (
        <>
            <CreateUserButton userRole={Roles.Parent} />
            <ClientsList />
        </>
    );
}

export default ClientsPage;