import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Themes } from '@/models';

interface ThemeState {
    theme: Themes,
}

const getDefaultTheme = () => {
    const defaultTheme = localStorage.getItem('theme');
    return defaultTheme ? (defaultTheme as Themes) : Themes.DEFAULT;
};

const initialState: ThemeState = {
    theme: getDefaultTheme(),
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<Themes>) {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
    },
});

export default themeSlice.reducer;
