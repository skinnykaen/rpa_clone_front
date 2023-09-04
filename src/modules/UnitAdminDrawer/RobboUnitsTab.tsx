import { graphql } from "@apollo/client/react/hoc";
import { QueryGetRobboUnitsByUnitAdminArgs, RobboUnitHttpList } from "@/__generated__/graphql";
import { GET_ROBBO_UNITS_BY_UNIT_ADMIN_ID } from "@/graphql/query";

import RobboUnitDrawer from "@/modules/RobboUnitDrawer";
import RobboUnitList from "@/components/RobboUnitsList";
import { useQuery } from "@apollo/client";

interface RobboUnitsTabProps {
    unitAdminId: number;
}

function RobboUnitsTab({unitAdminId}: RobboUnitsTabProps) {
    const RobboUnits = graphql<QueryGetRobboUnitsByUnitAdminArgs, { GetRobboUnitsByUnitAdmin: RobboUnitHttpList }>(GET_ROBBO_UNITS_BY_UNIT_ADMIN_ID)(({data }) => (
        <RobboUnitList
            isLoading={data?.loading || false}
            robboUnits={data?.GetRobboUnitsByUnitAdmin?.robboUnits}
            countRows={data?.GetRobboUnitsByUnitAdmin?.countRows}
            renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, robboUnitId: number) =>
                <RobboUnitDrawer isEditMode={true} isOpen={isOpen} setOpen={setOpen} robboUnitId={robboUnitId} />
            }
        />
    ));
    return (
        <RobboUnits unitAdminId={String(unitAdminId)}/>
    );
}

export default RobboUnitsTab;