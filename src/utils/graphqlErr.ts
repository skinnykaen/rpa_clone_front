import { notification } from "antd"
import { GraphQLError } from "graphql"
import { ApolloError } from "apollo-client"
import { ArgsProps } from "antd/es/notification/interface"

import {
    StatusCode400Errors,
    StatusCode401Errors,
    StatusCode403Errors,
    StatusCode503Errors
} from '@/consts'
import { ExtensionErr } from "@/models"

export function handlingGraphqlErrors(error: ApolloError) {
    error.graphQLErrors.map(({ extensions }: GraphQLError) => {
        const { err }: any = extensions
        const { Code, Message }: ExtensionErr = err
        let notificationErr: ArgsProps = { message: '' }
        switch (Code) {
            case 400:
                notificationErr.message = 'Ошибка в запросе'
                notificationErr.description = handling400CodeError(Message)
                break
            case 401:
                notificationErr.message = 'Ошибка авторизации'
                notificationErr.description = handling401CodeError(Message)
                break
            case 403:
                notificationErr.message = 'Ошибка доступа'
                notificationErr.description = handling403CodeError(Message)
                break
            case 500:
                notificationErr.message = 'Ошибка на нашей стороне'
                notificationErr.description = handling403CodeError(Message)
                break
            case 503:
                notificationErr.message = 'Функция недоступна'
                notificationErr.description = handling503CodeError(Message)
                break
        }
        notification.error(notificationErr)
    })
}

function handling400CodeError(message: string): string {
    let description: string = ''
    switch (message) {
        case StatusCode400Errors.ErrEmailAlreadyInUse:
            description = 'Данный email уже занят.'
            break
        case StatusCode400Errors.ErrAtoi:
            description = 'Некорректный формат данных.'
            break
        case StatusCode400Errors.ErrIncorrectPasswordOrEmail:
            description = 'Введены неверные email или пароль. Попробуйте ещё раз.'
            break
        case StatusCode400Errors.ErrNotFoundInDB:
            description = 'Сущность не была не найдена.'
            break
        case StatusCode400Errors.ErrShortPassword:
            description = 'Пожалуйста, введите пароль, минимум 6 символов.'
            break
    }
    return description;
}

function handling401CodeError(message: string): string {
    let description: string = ''
    switch (message) {
        case StatusCode401Errors.ErrTokenExpired:
            description = 'Пожалуйста, авторизуйтесь.'
            break
        case StatusCode401Errors.ErrNotStandardToken:
            description = 'Некорректный формат данных для аутентификации.'
            break
    }
    return description;
}

function handling403CodeError(message: string): string {
    let description: string = ''
    switch (message) {
        case StatusCode403Errors.ErrUserIsNotActive:
            description = 'Ваша учетная запись не активирована. Пожалуйста, проверьте вашу почту.'
            break
        case StatusCode403Errors.ErrProjectPageIsBanned:
            description = 'Данный проект заблокирован по решению админитратора.'
            break
        case StatusCode403Errors.ErrAccessDenied:
            description = 'Доступ запрещеню.'
            break
    }
    return description;
}

function handling503CodeError(message: string): string {
    let description: string = ''
    switch (message) {
        case StatusCode503Errors.ErrActivationLinkUnavailable:
            description = 'В данный момент активация по ссылке недоступна.'
            break
    }
    return description;
}