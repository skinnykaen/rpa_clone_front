import { SignInResponse } from "@/__generated__/graphql";
import { ACCESS_TOKEN, LOGIN_PAGE_ROUTE, PROFILE_PAGE_ROUTE, REFRESH_TOKEN } from "@/consts";
import { CONFIRM_ACTIVATION } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { Spin, notification } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ActivationPage() {
    const { link } = useParams();
    const navigate = useNavigate();
    const [confirmActivation, { loading }] = useMutation<{ ConfirmActivation: SignInResponse }, { activationLink: string }>(
        CONFIRM_ACTIVATION,
        {
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
                navigate(LOGIN_PAGE_ROUTE);
            },
            onCompleted: ({ConfirmActivation}) => {
                localStorage.setItem(ACCESS_TOKEN, ConfirmActivation.accessToken);
                localStorage.setItem(REFRESH_TOKEN, ConfirmActivation.refreshToken);
                notification.success({
                    message: 'Успешно!',
                    description: 'Ваш аккаунт был активирован.',
                })
                navigate(PROFILE_PAGE_ROUTE)
            },
            variables: {
                activationLink: link || ''
            }
        }
    );
    useEffect(() => {
        confirmActivation();
    }, [link, confirmActivation])
    return (
        <>
            {
                loading && <Spin size={'large'} />
            }
        </>
    );
}

export default ActivationPage;