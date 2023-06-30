import { Roles } from "@/models";

export interface ProfileData {
    id: string;
    email: string;
    lastname: string;
    firstname: string;
    middlename: string;
    nickname: string;
    role: Roles;
    createdAt: string;
    // TODO был в сети
}

export interface ProfileFormInputs {
    email: string;
    lastname: string;
    firstname: string;
    middlename: string;
    nickname: string;
}