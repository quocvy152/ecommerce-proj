import { FormatResponseType } from "src/types";
import { CategoryEntity } from "../entities/category.entity";

export type CreateCategoryResponse = FormatResponseType<{ data?: CategoryEntity }>;

export type UpdateCategoryResponse = FormatResponseType<{ data?: CategoryEntity }>;

export type ListCategoryResponse = FormatResponseType<{ data?: CategoryEntity[] }>;