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