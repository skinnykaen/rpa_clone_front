import { Space, notification } from "antd";
import { QueryOptions } from "apollo-client";
import { useMutation, useQuery } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import { handlingGraphqlErrors } from "@/utils";
import { GET_UNIT_ADMINS_BY_ROBBO_UNIT_ID } from "@/graphql/query";
import { MutationDeleteRobboUnitRelArgs, QueryGetUnitAdminByRobboUnitIdArgs, Role, UsersList } from "@/__generated__/graphql";
import SearchModal from "@/modules/SearchModal";
import UsersListComponent from "@/components/UsersList";
import { CREATE_ROBBO_UNIT_REL, DELETE_ROBBO_UNIT_REL } from "@/graphql/mutations";
import UnitAdminDrawer from "@/modules/UnitAdminDrawer";

interface UnitAdminsTabProps {
    robboUnitId: number;
}

function UnitAdminsTab({robboUnitId}: UnitAdminsTabProps) {
    const SearchUnitAdminModal = graphql<{ targetRelId: number }, { CreateParentRel: Response }>(CREATE_ROBBO_UNIT_REL, {
        options: {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Юнит админ успешно назначен.',
                });
            },
            refetchQueries: [
                {
                    query: GET_UNIT_ADMINS_BY_ROBBO_UNIT_ID,
                    variables: {
                        robboUnitId: String(robboUnitId),
                    },
                } as QueryOptions<QueryGetUnitAdminByRobboUnitIdArgs>,
            ],
        },
    })(({ mutate, targetRelId }) => {
        return (
            <SearchModal
                buttonText='Назначить'
                searchTarget={'юнит админа'}
                onClickHandle={mutate}
                targetRelId={targetRelId}
                roles={[Role.UnitAdmin]}
            />
        );
    });

    const { loading, data } = useQuery<{ GetUnitAdminByRobboUnitId: UsersList }, QueryGetUnitAdminByRobboUnitIdArgs>(
        GET_UNIT_ADMINS_BY_ROBBO_UNIT_ID,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                robboUnitId: String(robboUnitId),
            },
        },
    );

    const [deleteUnitAdminRel, deleteUnitAdminRelResult] = useMutation<{ DeleteUnitAdminRel: Response }, MutationDeleteRobboUnitRelArgs>(
        DELETE_ROBBO_UNIT_REL,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Связь успешно удалена.',
                });
            },
            refetchQueries: [
                {
                    query: GET_UNIT_ADMINS_BY_ROBBO_UNIT_ID,
                    variables: {
                        robboUnitId: String(robboUnitId),
                    },
                } as QueryOptions<QueryGetUnitAdminByRobboUnitIdArgs>,
            ],
        },
    );

    return (
        <Space direction={'vertical'} style={{ display: 'flex' }}>
            <SearchUnitAdminModal targetRelId={robboUnitId} />
            <UsersListComponent
                isLoading={loading || deleteUnitAdminRelResult.loading}
                users={data?.GetUnitAdminByRobboUnitId.users}
                countRows={data?.GetUnitAdminByRobboUnitId.countRows || 0}
                renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number) =>
                    <UnitAdminDrawer isOpen={isOpen} setOpen={setOpen} unitAdminId={userId} />
                }
                handleDelete={(userId: number) => deleteUnitAdminRel({ variables: { unitAdminId: String(userId), robboUnitId: String(robboUnitId) } })}
            />
        </Space>
    )
}

export default UnitAdminsTab;