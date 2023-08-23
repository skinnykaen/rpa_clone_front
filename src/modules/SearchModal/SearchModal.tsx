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
    onSearch?(): void;
}

function SearchModal({
    buttonText = 'Найти',
    searchTarget = '',
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

    // const [createParentRel, createParentRelResult] = useMutation<{ CreateParentRel: UsersList }, { parentId: string, childId: string }>(
    //     CREATE_PARENT_REL,
    //     {
    //         onError: error => {
    //             handlingGraphqlErrors(error);
    //         },
    //         onCompleted: () => {
    //             notification.success({
    //                 message: 'Успешно!',
    //                 description: 'Ребенок добавлен.',
    //             });
    //         },
    //         refetchQueries: [
    //             {
    //                 query: GET_CHILDREN_BY_PARENT,
    //                 variables: {
    //                     parentId: String(parentId),
    //                 },
    //             } as QueryOptions<{ parentId: string }>,
    //         ],
    //     },
    // );

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
                        onSearch={() => { searchUsers({ variables: { email: searchInput, roles: [Role.Student] } }); }}
                        value={searchInput}
                    />
                    <UsersListComponent
                        isLoading={searchUsersResult.loading}
                        users={searchUsersResult.data?.SearchUsersByEmail.users}
                        countRows={searchUsersResult.data?.SearchUsersByEmail.countRows}
                    // handleOnClick={(userId: number) => createParentRel({variables: {parentId: parentId, childId: String(userId)}})}
                    />
                </Space>
            </Modal>
        </>
    );
}

export default SearchModal;