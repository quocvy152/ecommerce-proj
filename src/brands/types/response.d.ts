import { FormatResponseType } from "src/types";
import { BrandEntity } from "../entities/brand.entity";

export type CreateBrandResponse = FormatResponseType<{ data?: BrandEntity }>;

export type UpdateBrandResponse = FormatResponseType<{ data?: BrandEntity }>;

export type ListBrandResponse = FormatResponseType<{ data?: BrandEntity[] }>;