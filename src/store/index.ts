import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/AuthSlice';
import themeReducer from './slices/ThemeSlice';

const rootReducer = combineReducers({
    themeReducer,
    authReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
