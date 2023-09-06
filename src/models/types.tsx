export interface ExtensionErr {
    Code: number,
    Message: string,
}

export type MessageDescriptor = {
    id: string,
    defaultMessage: string,
    description?: string | object,
};

export type Messages = {
    [key: string]: MessageDescriptor
};

export type CourseOverview = {
    about: string,
    prerequisites: string,
    courseStaff: string,
    faq: {
       question: string,
       response: string,
    }[],
}