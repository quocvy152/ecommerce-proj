/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsEmail, IsNotEmpty, MinLength, IsStrongPassword } from "class-validator";

export class UserSignInDto {
    @IsEmail({}, { message: 'Please provide a valid email' })
    @IsNotEmpty({ message: 'Email can not be null' })
    email: string;

    @IsNotEmpty({ message: 'Password can not be null' })
    @MinLength(6, { message: 'Password minium character should be 6' })
    @IsStrongPassword({}, { message: 'Please provide a strong password' })
    password: string;
}