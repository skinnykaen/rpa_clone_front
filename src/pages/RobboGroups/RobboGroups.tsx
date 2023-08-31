import { graphql } from "@apollo/client/react/hoc";

import { GET_ALL_ROBBO_GROUPS_BY_ACCESS_TOKEN } from "@/graphql/query";
import RobboGroupListModule from "@/modules/RobboGroupList";
import { RobboGroupHttpList } from "@/__generated__/graphql";

function RobboGroupsPage() {
    const RobboGroups = graphql<object, { GetAllRobboGroupByAccessToken: RobboGroupHttpList }>(GET_ALL_ROBBO_GROUPS_BY_ACCESS_TOKEN)(({ data }) => (
        <RobboGroupListModule
            data={data?.GetAllRobboGroupByAccessToken?.robboGroups}
            countRows={data?.GetAllRobboGroupByAccessToken?.countRows}
            loading={data?.loading}
        />
    ));
    return (
       <RobboGroups />
    );
}

export default RobboGroupsPage;