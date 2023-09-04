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

export const GET_ALL_ROBBO_UNITS = gql`
    query GetAllRobboUnitByAccessToken($page: Int, $pageSize: Int) {
        GetAllRobboUnitByAccessToken(page: $page, pageSize: $pageSize) {
            countRows 
            robboUnits {
                id 
                name
                city
            }
        }   
    }
`;

export const GET_ROBBO_UNIT_BY_ID = gql`
    query GetRobboUnitById($id: ID!){
        GetRobboUnitById(id: $id) {
            id
            name
            city
            createdAt
            updatedAt
        }
    }
`;

export const GET_ALL_ROBBO_GROUPS_BY_ACCESS_TOKEN = gql`
    query GetAllRobboGroupByAccessToken($page: Int, $pageSize: Int) {
        GetAllRobboGroupByAccessToken(page: $page, pageSize: $pageSize) {
            countRows
            robboGroups {
                id
                name
                robboUnit{
                    id
                    name
                    city
                }
            }
        }
    }
`;

export const GET_ROBBO_GROUP_BY_ID = gql`
    query GetRobboGroupById($id: ID!) {
        GetRobboGroupById(id: $id) {
            id
            createdAt
            updatedAt
            name
            robboUnit{
                id
                name
                city
            }
        }
    }
`;

export const GET_ROBBO_GROUPS_BY_ROBBO_UNIT_ID = gql`
    query GetRobboGroupsByRobboUnitId($page: Int, $pageSize: Int, $robboUnitId: ID!) {
        GetRobboGroupsByRobboUnitId(page: $page, pageSize: $pageSize, robboUnitId: $robboUnitId) {
            countRows
            robboGroups {
                id
                name
                robboUnit{
                    id 
                    name
                }
            }
        }
    }
`;

export const GET_ROBBO_UNITS_BY_UNIT_ADMIN_ID = gql`
    query GetRobboUnitsByUnitAdmin($unitAdminId: ID!){
        GetRobboUnitsByUnitAdmin(unitAdminId: $unitAdminId) {
            countRows
            robboUnits {
                id
                name
                city
            }
        }
    }
`;

export const GET_UNIT_ADMINS_BY_ROBBO_UNIT_ID = gql`
    query GetUnitAdminByRobboUnitId($robboUnitId: ID!){
        GetUnitAdminByRobboUnitId(robboUnitId: $robboUnitId) {
            countRows
            users {
                id
                firstname
                lastname
                middlename
            }
        }
    }
`;

export const GET_STUDENTS_BY_ROBBO_GROUP_ID = gql`
    query GetStudentsByRobboGroupId($page: Int, $pageSize: Int, $robboGroupId: ID!) {
        GetStudentsByRobboGroupId(page: $page, pageSize: $pageSize, robboGroupId: $robboGroupId) {
            countRows
            users {
                id
                firstname
                lastname
                middlename
            }
        }
    }
`;

export const GET_TEACHERS_BY_ROBBO_GROUP_ID = gql`
    query GetTeachersByRobboGroupId($page: Int, $pageSize: Int, $robboGroupId: ID!) {
        GetTeachersByRobboGroupId(page: $page, pageSize: $pageSize, robboGroupId: $robboGroupId) {
            countRows
            users {
                id
                firstname
                lastname
                middlename
            }
        }
    }
`;

export const GET_STUDENTS_BY_ROBBO_UNIT_ID = gql`
    query GetStudentsByRobboUnitId($robboUnitId: ID!) {
        GetStudentsByRobboUnitId(robboUnitId: $robboUnitId) {
            countRows
            users {
                id
                firstname
                lastname
                middlename
            }
        }
    }
`;

export const GET_ROBBO_GROUP_BY_USER_ID = gql`
    query GetRobboGroupsByUserId($userId: ID!) {
        GetRobboGroupsByUserId(userId: $userId) {
            countRows
            robboGroups {
                id 
                name
                robboUnit{
                    id 
                    name
                }
            }
        }
    }
`;

export const GET_STUDENTS_BY_TEACHERS_ID = gql`
    query GetStudentsByTeacherId($teacherId: ID!) {
        GetStudentsByTeacherId(teacherId: $teacherId) {
            countRows
            users {
                id
                firstname
                lastname
                middlename
            } 
        }
    }
`;