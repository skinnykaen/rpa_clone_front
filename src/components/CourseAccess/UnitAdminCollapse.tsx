import { graphql } from "@apollo/client/react/hoc";
import { notification } from "antd";
import { handlingGraphqlErrors } from "@/utils";
import { CREATE_ROBBO_UNIT_REL } from "@/graphql/mutations";
import { GET_UNIT_ADMINS_BY_ROBBO_UNIT_ID } from "@/graphql/query";
import SearchModal from "@/modules/SearchModal";
import { Role } from "@/__generated__/graphql";

function UnitAdminCollapse() {
    const SearchUnitAdminModal = graphql<{ targetRelId: number }, { CreateParentRel: Response }>(CREATE_ROBBO_UNIT_REL, {
        options: {
            onError: error => handlingGraphqlErrors(error),
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
                        robboUnitId: "1",
                    },
                },
            ],
        },
    })(({ mutate, targetRelId }) => {
        return (
            <SearchModal
                buttonText='Добавить'
                searchTarget={'юнит админа'}
                onClickHandle={mutate}
                targetRelId={targetRelId}
                roles={[Role.UnitAdmin]}
            />
        );
    });

    return <SearchUnitAdminModal targetRelId={1} />;
}

export default UnitAdminCollapse;