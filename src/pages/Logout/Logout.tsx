import { Navigate } from 'react-router-dom';

import { graphqlClient } from '@/graphql/client';
import { ACCESS_TOKEN, LOGIN_PAGE_ROUTE, REFRESH_TOKEN } from '@/consts';
import { useAppDispatch } from '@/store';
import { authSlice } from '@/store/slices/AuthSlice';
import { Roles } from '@/models';

function LogoutPage() {
    const dispatch = useAppDispatch();
    dispatch(authSlice.actions.setAuth({ userId: 0, userRole: Roles.Anonymous }))
    graphqlClient.resetStore();
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

    return <Navigate to={LOGIN_PAGE_ROUTE} />
}

export default LogoutPage;