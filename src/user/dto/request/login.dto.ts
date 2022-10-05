import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class LoginDTO {

    @IsString()
    @IsEmail()
    @MaxLength(30)
    email: string;

    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    password: string;

}