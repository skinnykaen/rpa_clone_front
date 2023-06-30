import { Navigate } from 'react-router-dom';
import { graphqlClient } from '@/graphql/client';

import { ACCESS_TOKEN, LOGIN_PAGE_ROUTE, REFRESH_TOKEN } from '@/consts';

function LogoutPage() {
    graphqlClient.resetStore()
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    return <Navigate to={LOGIN_PAGE_ROUTE} />
}

export default LogoutPage;