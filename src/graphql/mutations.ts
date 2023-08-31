import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
    mutation UpdateUser($input: UpdateUser!){
        UpdateUser(input: $input) {
            ... on UserHttp {
                id
                email
                nickname
                lastname
                firstname
                middlename
            }
        }
    }
`;

export const SIGN_IN = gql`
    mutation SignIn($input: SignIn!){
        SignIn(input: $input) {
            ... on SignInResponse {
                accessToken
                refreshToken
            }
        }
    }
`;

export const SIGN_UP = gql`
    mutation SignUp($input: SignUp!){
        SignUp(input: $input) {
            ... on Response{
                    ok
                }
            }
        }
`;

export const CREATE_USER = gql`
    mutation CreateUser($input: NewUser!){
        CreateUser(input: $input) {
            ... on UserHttp {
                id
                email
                nickname
                lastname
                firstname
                middlename
            }
        }
    }
`;

export const SET_USER_IS_ACTIVE = gql`
    mutation SetUserIsActive($id: ID!, $isActive: Boolean!){
        SetUserIsActive(id: $id, isActive: $isActive) {
            ok
        }
    }
`;

export const CREATE_PROJECT_PAGE = gql`
    mutation {
        CreateProjectPage{
            id
            createdAt
            updatedAt
            authorId
            projectId
            projectUpdatedAt
            title
            notes
            linkToScratch
            isShared
        }
    }
`;

export const CONFIRM_ACTIVATION = gql`
    mutation ConfirmActivation($activationLink: String!){
        ConfirmActivation(activationLink: $activationLink) {
            ... on SignInResponse {
                accessToken
                refreshToken
            }
        }
    }
`;

export const SET_ACTIVATION_BY_LINK = gql`
    mutation SetActivationByLink($activationByLink: Boolean!){
        SetActivationByLink(activationByLink: $activationByLink) {
            ok
        }
    }
`;

export const UPDATE_PROJECT_PAGE = gql`
    mutation UpdateProjectPage($input: UpdateProjectPage!){
        UpdateProjectPage(input: $input) {
            id
        }
    }
`;

export const DELETE_PROJECT_PAGE = gql`
    mutation DeleteProjectPage($id: ID!){
        DeleteProjectPage(id: $id) {
            ok
        }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!){
        DeleteUser(id: $id) {
            ok
        }
    }
`;

export const SET_IS_BANNED = gql`
    mutation SetIsBanned($projectPageId: ID!, $isBanned: Boolean!){
        SetIsBanned(projectPageId: $projectPageId, isBanned: $isBanned) {
            ok
        }
    }
`;

export const CREATE_PARENT_REL = gql`
    mutation CreateParentRel($coreRelId: ID!, $targetRelId: ID!){
        CreateParentRel(coreRelId: $coreRelId, targetRelId: $targetRelId) {
            ok
        }
    }
`;

export const DELETE_PARENT_REL = gql`
    mutation DeleteParentRel($parentId: ID!, $childId: ID!){
        DeleteParentRel(parentId: $parentId, childId: $childId) {
            ok
        }
    }
`;

export const SEARCH_USER_BY_EMAIL = gql`
    mutation SearchUsers($email: String!, $roles: [Role!]!, $page: Int, $pageSize: Int) {
        SearchUsersByEmail(email: $email, roles: $roles, page: $page, pageSize: $pageSize){
            countRows
            users {
                id
                lastname
                firstname
                middlename
                email
            }
        }
    }
`;

export const CREATE_ROBBO_UNIT = gql`
    mutation CreateRobboUnit($input: NewRobboUnit!) {
        CreateRobboUnit(input: $input) {
            id
        }
    }
`;

export const DELETE_ROBBO_UNIT = gql`
    mutation DeleteRobboUnit($id: ID!) {
        DeleteRobboUnit(id: $id) {
            ok
        }
}
`;

export const UPDATE_ROBBO_UNIT  = gql`
    mutation UpdateRobboUnit($input: UpdateRobboUnit!) {
        UpdateRobboUnit(input: $input) {
            id
        }
    }
`; 

export const DELETE_ROBBO_GROUP = gql`
    mutation DeleteRobboGroup($id: ID!) {
        DeleteRobboGroup(id: $id) {
            ok
        }
}
`;

export const UPDATE_ROBBO_GROUP = gql`
    mutation UpdateRobboGroup($input: UpdateRobboGroup!) {
        UpdateRobboGroup(input: $input) {
            id
        }
    }
`; 

export const CREATE_ROBBO_GROUP = gql`
    mutation CreateRobboGroup($input: NewRobboGroup!) {
        CreateRobboGroup(input: $input) {
            id
        }
    }
`;

export const CREATE_ROBBO_UNIT_REL = gql`
    mutation CreateRobboUnitRel($coreRelId: ID!, $targetRelId: ID!){
        CreateRobboUnitRel(coreRelId: $coreRelId, targetRelId: $targetRelId) {
            ok
        }
    }
`;

export const DELETE_ROBBO_UNIT_REL = gql`
    mutation DeleteRobboUnitRel($unitAdminId: ID!, $robboUnitId: ID!){
        DeleteRobboUnitRel(unitAdminId: $unitAdminId, robboUnitId: $robboUnitId) {
            ok
        }
    }
`;

export const CREATE_ROBBO_GROUP_REL = gql`
    mutation CreateRobboGroupRel($coreRelId: ID!, $targetRelId: ID!){
        CreateRobboGroupRel(coreRelId: $coreRelId, targetRelId: $targetRelId) {
            ok
        }
    }
`;

export const DELETE_ROBBO_GROUP_REL = gql`
    mutation DeleteRobboGroupRel($userId: ID!, $robboGroupId: ID!){
        DeleteRobboGroupRel(userId: $userId, robboGroupId: $robboGroupId) {
            ok
        }
    }
`;