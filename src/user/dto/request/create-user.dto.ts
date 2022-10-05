import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { UserRole, UserSex } from 'src/user/entities/user.entity';

export class CreateUserDTO {
    
    @Transform(params => params.value.trim())
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    nickname: string;

    @IsString()
    @IsEmail()
    @MaxLength(30)
    email: string;

    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    password: string;
    
    @IsIn(["male", "female"])
    sex: UserSex

    @IsIn(["older", "employee", "caregiver"])
    role: UserRole

}