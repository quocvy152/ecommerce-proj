import { FormatResponseType } from "src/types";
import { ImageEntity } from "../entities/image.entity";

export type CreateImageResponse = FormatResponseType<{ data?: ImageEntity }>;

export type UpdateImageResponse = FormatResponseType<{ data?: ImageEntity }>;

export type ListImageResponse = FormatResponseType<{ data?: ImageEntity[] }>;