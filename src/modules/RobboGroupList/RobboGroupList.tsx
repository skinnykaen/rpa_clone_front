import { MutationDeleteRobboGroupArgs, QueryGetAllRobboGroupByAccessTokenArgs, RobboGroupHttp } from "@/__generated__/graphql";
import RobboGroupsList from "@/components/RobboGroupsList";
import { DELETE_ROBBO_GROUP } from "@/graphql/mutations";
import { GET_ALL_ROBBO_GROUPS_BY_ACCESS_TOKEN } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { useMutation } from "@apollo/client";
import { notification } from "antd";
import { QueryOptions } from "apollo-client";
import RobboGroupDrawer from "@/modules/RobboGroupDrawer";

interface RobboGroupListModuleProps {
    robboUnitId?: number;
    data: RobboGroupHttp[] | undefined;
    countRows?: number;
    loading?: boolean;
}

function RobboGroupListModule({ robboUnitId = 0, data, countRows = 0, loading = true }: RobboGroupListModuleProps) {
    const [deleteRobboGroup, deleteRobboGroupResult] = useMutation<{ DeleteRobboUnit: Response }, MutationDeleteRobboGroupArgs>(
        DELETE_ROBBO_GROUP,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Роббо юнит удален.',
                });
            },
            refetchQueries: [
                {
                    query: GET_ALL_ROBBO_GROUPS_BY_ACCESS_TOKEN,
                } as QueryOptions<QueryGetAllRobboGroupByAccessTokenArgs>,
            ],
        },
    );
    return (
        <RobboGroupsList
            isLoading={loading || deleteRobboGroupResult.loading}
            robboGroups={data}
            countRows={countRows}
            renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, robboGroupId: number) =>
                <RobboGroupDrawer isEditMode={true} isOpen={isOpen} setOpen={setOpen} robboGroupId={robboGroupId} />
            }
            handleDelete={(robboGroupId: number) => deleteRobboGroup({ variables: { id: String(robboGroupId) } })}
        />
    );
}

export default RobboGroupListModule;