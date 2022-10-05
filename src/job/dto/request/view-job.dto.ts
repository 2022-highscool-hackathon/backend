import { Transform } from 'class-transformer';
import { IsIn, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { UserRole, UserSex } from 'src/user/entities/user.entity';

export class ViewJobDto {
    
    @IsString()
    numOfRows: string;

}