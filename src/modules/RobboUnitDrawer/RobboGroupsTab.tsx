import { Space } from "antd";
import { graphql } from "@apollo/client/react/hoc";

import CreateRobboGroupButton from "@/components/CreateRobboGroupButton";
import RobboGroupListModule from "@/modules/RobboGroupList";
import { RobboGroupHttpList } from "@/__generated__/graphql";
import { GET_ROBBO_GROUPS_BY_ROBBO_UNIT_ID } from "@/graphql/query";

interface RobboGroupsTabProps {
    robboUnitId: number;
}

function RobboGroupsTab({robboUnitId}: RobboGroupsTabProps) {
    const RobboGroupsTab = graphql<{ robboUnitId: number }, { GetRobboGroupsByRobboUnitId: RobboGroupHttpList }>(GET_ROBBO_GROUPS_BY_ROBBO_UNIT_ID)(({ robboUnitId, data }) => (
        <RobboGroupListModule
            robboUnitId={robboUnitId}
            data={data?.GetRobboGroupsByRobboUnitId?.robboGroups}
            countRows={data?.GetRobboGroupsByRobboUnitId?.countRows}
            loading={data?.loading}
        />
    ));
    return (
        <Space direction={'vertical'} style={{ display: 'flex' }}>
            <CreateRobboGroupButton robboUnitId={robboUnitId} />
            <RobboGroupsTab robboUnitId={robboUnitId} />
        </Space>
    )
}

export default RobboGroupsTab;