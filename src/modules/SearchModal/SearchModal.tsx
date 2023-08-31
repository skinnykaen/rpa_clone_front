import { useState } from "react";
import { Button, Input, Modal, Space, notification } from "antd";
import { CREATE_PARENT_REL, SEARCH_USER_BY_EMAIL } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import {
    MutationSearchUsersByEmailArgs,
    Role,
    UsersList,
} from "@/__generated__/graphql";
import { handlingGraphqlErrors } from "@/utils";
import UsersListComponent from "@/components/UsersList";
import { GET_CHILDREN_BY_PARENT } from "@/graphql/query";

interface SearchModalProps {
    buttonText?: string;
    searchTarget?: string;
    coreRelId?: number;
    targetRelId?: number;
    onSearch?(): void;
    onClickHandle?: any;
    roles: Role[];
}

function SearchModal({
    buttonText = 'Найти',
    searchTarget = '',
    onClickHandle,
    coreRelId,
    targetRelId,
    roles,
}: SearchModalProps) {
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchUsers, searchUsersResult] =
        useMutation<{ SearchUsersByEmail: UsersList }, MutationSearchUsersByEmailArgs>(
            SEARCH_USER_BY_EMAIL,
            {
                onError: error => {
                    handlingGraphqlErrors(error);
                },
            },
        );
    return (
        <>
            <Button type='primary' onClick={() => setOpenSearchModal(true)}>
                {buttonText}
            </Button>
            <Modal
                title={'Найти ' + searchTarget}
                centered
                open={openSearchModal}
                onCancel={() => setOpenSearchModal(false)}
                footer={[]}
            >
                <Space direction={'vertical'} size={'middle'} style={{ display: 'flex' }}>
                    <Input.Search
                        onChange={e => setSearchInput(e.target.value)}
                        onSearch={() => { searchUsers({ variables: { email: searchInput, roles: roles } }); }}
                        value={searchInput}
                    />
                    <UsersListComponent
                        isLoading={searchUsersResult.loading}
                        users={searchUsersResult.data?.SearchUsersByEmail.users}
                        countRows={searchUsersResult.data?.SearchUsersByEmail.countRows}
                        handleOnClick={(userId: number) => onClickHandle({ variables: { coreRelId: coreRelId ? String(coreRelId) : userId, targetRelId: targetRelId ? targetRelId : String(userId) } })}
                    />
                </Space>
            </Modal>
        </>
    );
}

export default SearchModal;