import { Select, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import { languageSlice } from '@/store/slices';
import { Language } from '@/models';
import { useEffect } from 'react';

function LanguageSelect() {
    const languages = [
        { value: Language.RU, label: 'Русский' },
        { value: Language.EN, label: 'English' },
        { value: Language.ZH, label: '中文' },
    ];
    const dispatch = useAppDispatch();
    const onLanguageChange = (value: string) => {
        dispatch(languageSlice.actions.setLanguage(value as Language));
    };
    const language = useAppSelector(state => state.languageReducer.language);
    const [browserLanguage] = navigator.language.split('-');

    useEffect(() => {
        switch (browserLanguage) {
            case Language.EN:
                dispatch(languageSlice.actions.setLanguage(languages[1].value as Language));
                break;
            case Language.RU:
                dispatch(languageSlice.actions.setLanguage(languages[0].value as Language));
                break;
            case Language.ZH:
                dispatch(languageSlice.actions.setLanguage(languages[2].value as Language));
                break;
            default:
                dispatch(languageSlice.actions.setLanguage(languages[1].value as Language));
        }
    }, [browserLanguage]);

    return (
        <Space direction={'horizontal'} size={'middle'} style={{ marginLeft: '1rem' }}>
            <Select
                style={{ width: 120 }}
                defaultValue={Language.RU}
                value={language}
                options={languages}
                onChange={value => (onLanguageChange(value))}
            />
            <GlobalOutlined />
        </Space>
    );
}

export default LanguageSelect;