/* eslint-disable prettier/prettier */

import { CategoryEntity } from "../entities/category.entity";

export type FormatResponseType<T = object> = {
    error: boolean,
    errorCode?: number,
    statusCode?: number,
    message?: string
} & T;

export type CreateCategoryResponse = FormatResponseType<{ data?: CategoryEntity }>;

export type UpdateCategoryResponse = FormatResponseType<{ data?: CategoryEntity }>;