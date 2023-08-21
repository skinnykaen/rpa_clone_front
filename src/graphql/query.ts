import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
    query GetUserById($id: ID!){
        GetUserById(id: $id) {
            ... on UserHttp {
                id
                email
                lastname
                firstname 
                nickname
                middlename
                createdAt
                role
                updatedAt
                isActive
            }
        }
    }
`;

export const ME = gql`
    query {
        Me {
            ... on UserHttp {
                id
                email
                lastname
                firstname 
                nickname
                middlename
                createdAt
                role
                updatedAt
                isActive
            }
        }
    }
`;

export const GET_ALL_USERS = gql`
    query GetAllUsers($page: Int, $pageSize: Int, $active: Boolean!, $roles: [Role!]!){
        GetAllUsers(page: $page, pageSize: $pageSize, active: $active, roles: $roles) {
            users {
                id
                email
                lastname
                firstname 
                middlename
            }
            countRows
        }
    }
`;

export const GET_ALL_PROJECT_PAGES_BY_ACCESS_TOKEN = gql`
    query GetAllProjectPagesByAccessToken($page: Int, $pageSize: Int){
        GetAllProjectPagesByAccessToken(page: $page, pageSize: $pageSize) {
            projectPages{
                id
                title
                isShared
                isBanned
            }
            countRows
        }
    }
`;

export const GET_ALL_PROJECT_PAGES_BY_AUTHOR_ID = gql`
    query GetAllProjectPagesByAuthorId($id: ID!, $page: Int, $pageSize: Int){
        GetAllProjectPagesByAuthorId(id: $id, page: $page, pageSize: $pageSize) {
            projectPages{
                id
                title
                isShared
                isBanned
            }
            countRows
        }
    }
`;

export const GET_PROJECT_PAGE_BY_ID = gql`
    query GetProjectPageById($id: ID!){
        GetProjectPageById(id: $id) {
            id
            authorId
            createdAt
            updatedAt
            projectId
            title
            instruction
            notes
            linkToScratch
            isShared
            isBanned
            projectUpdatedAt
        }
    }
`;

export const GET_SETTINGS = gql`
    query {
        GetSettings{
            activationByLink
        }
    }
`;

export const GET_CHILDREN_BY_PARENT = gql`
    query GetChildrenByParent($parentId: ID!){
        GetChildrenByParent(parentId: $parentId) {
            countRows
            users {
                id
                lastname
                firstname 
                middlename
            }
        }
    }
`;