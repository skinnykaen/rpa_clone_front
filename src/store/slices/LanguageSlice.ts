import { Language } from "@/models"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface LanguageState {
    language: Language,
}

const getDefaultLanguage = () => {

}

const initialState: LanguageState = {
    language: Language.EN,
}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<Language>) {
            state.language = action.payload;
            localStorage.setItem('language', action.payload);
        },
    },
});

export default languageSlice.reducer;