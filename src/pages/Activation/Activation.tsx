import { useMutation } from "@apollo/client";

import { Spin, notification } from "antd";

import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { SignInResponse } from "@/__generated__/graphql";
import { ACCESS_TOKEN, PROFILE_PAGE_ROUTE, REFRESH_TOKEN } from "@/consts";
import { CONFIRM_ACTIVATION } from "@/graphql/mutations";
import { handlingGraphqlErrors } from "@/utils";

function ActivationPage() {
    const { link } = useParams();
    const navigate = useNavigate();
    const [confirmActivation, { loading }] = useMutation<{ ConfirmActivation: SignInResponse }, { activationLink: string }>(
        CONFIRM_ACTIVATION,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            onCompleted: ({ConfirmActivation}) => {
                localStorage.setItem(ACCESS_TOKEN, ConfirmActivation.accessToken);
                localStorage.setItem(REFRESH_TOKEN, ConfirmActivation.refreshToken);
                notification.success({
                    message: 'Успешно!',
                    description: 'Ваш аккаунт был активирован.',
                });
                navigate(PROFILE_PAGE_ROUTE);
            },
            variables: {
                activationLink: link || '',
            },
        },
    );
    useEffect(() => {
        confirmActivation();
    }, [link, confirmActivation]);
    return (
        <>
            {
                loading && <Spin size={'large'} />
            }
        </>
    );
}

export default ActivationPage;