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