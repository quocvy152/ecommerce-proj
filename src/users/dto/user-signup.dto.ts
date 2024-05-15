/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator";
import { UserSignInDto } from "./user-signin.dto";
import { Roles } from "src/utility/common/users/user-roles.enum";

export class UserSignUpDto extends UserSignInDto {
    @IsNotEmpty({ message: 'Username can not be null' })
    @IsString({ message: 'Username should be a string' })
    username: string;

    @IsNotEmpty({ message: 'Fullname can not be null' })
    @IsString({ message: 'Fullname should be a string' })
    fullname: string;
    
    // @IsPhoneNumber('VI', { message: 'Please provide a valid phone number' })
    @IsNotEmpty({ message: 'Phone can not be null' })
    phone: string;

    @IsEnum(Roles, { each: true, message: 'Invalid role' })
    roles: Roles[]
}