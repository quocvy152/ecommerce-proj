import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateImageDto {
    @IsNotEmpty({ message: 'Name image can not be empty.' })
    @IsString({ message: 'Name image should be string.' })
    name: string;

    @IsNotEmpty({ message: 'Description can not be empty.' })
    @IsNumber()
    size: number;

    @IsNotEmpty({ message: 'Path image can not be empty.' })
    @IsString({ message: 'Path should be a string.' })
    path: string;
}
