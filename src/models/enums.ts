/* eslint-disable no-unused-vars */
export enum Themes {
    DEFAULT = 'DEFAULT',
    DARK = 'DARK',
}

export enum Roles {
    Anonymous = 'Anonymous',
    Student = 'Student',
    Parent = 'Parent',
    Teacher = 'Teacher',
    UnitAdmin = 'UnitAdmin',
    SuperAdmin = 'SuperAdmin',
}

export enum ProjectPageStatus {
    Shared = 'Shared',
    Private = 'Private',
    Banned = 'Banned'
}

export enum Language {
    RU = 'ru',
    EN = 'rn',
    ZH = 'zh'
}

export type MessageDescriptor = {
    id: string,
    defaultMessage: string,
    description?: string | object,
};

export type Messages = {
    [key: string]: MessageDescriptor
};