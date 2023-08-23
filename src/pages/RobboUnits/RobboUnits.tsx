import { useMutation, useQuery } from "@apollo/client";

import { MutationDeleteRobboUnitArgs, QueryGetAllRobboUnitByAccessTokenArgs, RobboUnitHttpList } from "@/__generated__/graphql";
import CreateRobboUnitButton from "@/components/CreateRobboUnitButton/CreateRobboUnitButton";
import RobboUnitList from "@/components/RobboUnitsList";
import { GET_ALL_ROBBO_UNITS } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { Space, notification } from "antd";
import { DELETE_ROBBO_UNIT } from "@/graphql/mutations";

function RobboUnitsPage() {
    const { loading, data } = useQuery<{ GetAllRobboUnitByAccessToken: RobboUnitHttpList }, QueryGetAllRobboUnitByAccessTokenArgs>(
        GET_ALL_ROBBO_UNITS,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
        },
    );
    const [deleteRobboUnit, deleteRobboUnitResult] = useMutation<{ DeleteRobboUnit: Response }, MutationDeleteRobboUnitArgs>(
        DELETE_ROBBO_UNIT,
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
                    query: GET_ALL_ROBBO_UNITS,
                },
            ],
        },
    );
    return (
        <Space direction={'vertical'} style={{display: 'flex'}}>
            <CreateRobboUnitButton />
            <RobboUnitList
                isLoading={loading || deleteRobboUnitResult.loading}
                robboUnits={data?.GetAllRobboUnitByAccessToken.robboUnits}
                countRows={data?.GetAllRobboUnitByAccessToken.countRows}
                handleDelete={(robboUnitId: number) => deleteRobboUnit({ variables: { id: String(robboUnitId) } })}
            />
        </Space>
    );
}

export default RobboUnitsPage;