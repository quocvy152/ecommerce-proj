/* eslint-disable prettier/prettier */
import { UserEntity } from "../entities/user.entity";

export type FormatResponseType<T = object> = {
    error: boolean,
    errorCode?: number,
    message?: string,
} & T;

export type SignInResponse = FormatResponseType<{ data?: UserEntity, accessToken?: string }>;

export type SignUpResponse = FormatResponseType<{ data?: UserEntity }>;

export type ListUserResponse = FormatResponseType<{ data?: UserEntity[] }>;

export type FindUserResponse = FormatResponseType<{ data?: UserEntity }>;