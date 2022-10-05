import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class LoginDTO {

    @IsString()
    @MaxLength(12)
    phone: string;

    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    password: string;

}