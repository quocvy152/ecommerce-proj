import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBrandDto {
    @IsNotEmpty({ message: 'Name can not be empty.' })
    @IsString({ message: 'Name should be string.' })
    name: string;

    @IsNotEmpty({ message: 'Description can not be empty.' })
    @IsString({ message: 'Description should be string.' })
    description: string;

    @IsOptional()
    @IsNumber()
    parentId: number;
}
