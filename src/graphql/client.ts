import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/consts';
import { ApolloClient, InMemoryCache, from, createHttpLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { setContext } from '@apollo/client/link/context'
import gql from 'graphql-tag';

const retryLink = new RetryLink({
    delay: {
        initial: 100,
        max: 5000,
    },
    attempts: {
        max: 3,
        retryIf: async error => {
            if (error && error.result.ExpiredBy && error.statusCode === 401) {
                localStorage.removeItem(ACCESS_TOKEN)
                const accessToken = await refreshToken()
                return true
            }
            return false
        },
    },
});

const httpLink = createHttpLink({
    uri: 'http://0.0.0.0:5050/query',
    credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const refreshToken = async (): Promise<string> => {
    try {
        const refreshResolverResponse = await graphqlClient.mutate(
            {
                mutation: gql`
                    mutation RefreshToken($refreshToken: String!) {
                            SignIn(refreshToken: $refreshToken) { 
                                ... on SignInResponse {
                                accessToken
                            }
                        }
                    }
                `,
                variables: {
                    refreshToken: localStorage.getItem(REFRESH_TOKEN),
                }
            },
        )
        const accessToken = refreshResolverResponse.data?.Refresh.accessToken
        localStorage.setItem(ACCESS_TOKEN, accessToken || '')
        return accessToken
    } catch (err) {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        console.error(err)
        throw err
    }
}

export const graphqlClient = new ApolloClient({
    link: from([retryLink, authLink, httpLink]),
    cache: new InMemoryCache(),
});