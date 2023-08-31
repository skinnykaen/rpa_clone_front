import { RobboGroupHttp, RobboUnitHttp } from "@/__generated__/graphql";
import { WithPaginationProps, withPaginationLocal } from "@/hocs";
import { List } from "antd";
import ListItem from "@/components/ListItem";

type RobboGroupListProps = WithPaginationProps & {
    isLoading: boolean;
    robboGroups: RobboGroupHttp[] | undefined;
    countRows?: number;
    handleOnClick?(robboUnitId: number): void;
    handleDelete?(robboUnitId: number): void;
    renderDrawer?: (isOpen: boolean, setOpen: (isOpen: boolean) => void, robboUnitId: number,) => JSX.Element;
}

function RobboGroupList({
    isLoading,
    robboGroups,
    countRows = 0,
    page,
    pageSize,
    handleDelete,
    renderDrawer,
    onChangePage,
    handleOnClick,
}: RobboGroupListProps) {
    return (
        <List
            className='robbo-groups-list'
            loading={isLoading}
            bordered
            size='large'
            dataSource={robboGroups}
            pagination={{
                onChange: onChangePage,
                total: countRows,
                current: +page,
                defaultCurrent: 1,
                defaultPageSize: pageSize,
                responsive: true,
            }}
            itemLayout='vertical'
            renderItem={(robboGroup, index) => (
                <ListItem
                    index={index}
                    itemId={Number(robboGroup.id)}
                    renderLabel={() => <>{robboGroup.robboUnit.name + ' ' + robboGroup.name}</>}
                    renderDrawer={(isOpen, setOpen, itemId) => renderDrawer ? renderDrawer(isOpen, setOpen, Number(robboGroup.id)) : <></>}
                    handleDelete={handleDelete ? () => handleDelete(Number(robboGroup.id)) : undefined}
                    handleClick={handleOnClick ? () => handleOnClick(Number(robboGroup.id)): undefined}
                />
            )}
        />
    );
}

const WithPaginationComponent = withPaginationLocal(RobboGroupList, 10);

export default WithPaginationComponent;