import { RobboUnitHttp } from "@/__generated__/graphql";
import { WithPaginationProps, withPaginationLocal } from "@/hocs";
import { List } from "antd";
import ListItem from "../ListItem";

type RobboUnitListProps = WithPaginationProps & {
    isLoading: boolean;
    robboUnits: RobboUnitHttp[] | undefined;
    countRows?: number;
    handleOnClick?(robboUnitId: number): void;
    handleDelete?(robboUnitId: number): void;
    renderDrawer?: (isOpen: boolean, setOpen: (isOpen: boolean) => void, robboUnitId: number,) => JSX.Element;
}

function RobboUnitList({
    isLoading,
    robboUnits,
    countRows = 0,
    page,
    pageSize,
    handleDelete,
    renderDrawer,
    onChangePage,
    handleOnClick,
}: RobboUnitListProps) {
    return (
        <List
            className='robbo-units-list'
            loading={isLoading}
            bordered
            size='large'
            dataSource={robboUnits}
            pagination={{
                onChange: onChangePage,
                total: countRows,
                current: +page,
                defaultCurrent: 1,
                defaultPageSize: pageSize,
                responsive: true,
            }}
            itemLayout='vertical'
            renderItem={(robboUnit, index) => (
                <ListItem
                    index={index}
                    itemId={Number(robboUnit.id)}
                    renderLabel={() => <>{robboUnit.name} {robboUnit.city}</>}
                    renderDrawer={(isOpen, setOpen, itemId) => renderDrawer ? renderDrawer(isOpen, setOpen, Number(robboUnit.id)) : <></>}
                    handleDelete={handleDelete ? () => handleDelete(Number(robboUnit.id)) : undefined}
                    handleClick={handleOnClick ? () => handleOnClick(Number(robboUnit.id)): undefined}
                />
            )}
        />
    );
}

const WithPaginationComponent = withPaginationLocal(RobboUnitList, 10);

export default WithPaginationComponent;