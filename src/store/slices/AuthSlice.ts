import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Roles } from "@/models";

interface AuthState {
    userRole: string ,
    userId: number;
}

const initialState: AuthState = {
    userRole: Roles.Anonymous,
    userId: 0,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthState>) {
            state.userId = action.payload.userId;
            state.userRole = action.payload.userRole;
        },
    },
});

export default authSlice.reducer;