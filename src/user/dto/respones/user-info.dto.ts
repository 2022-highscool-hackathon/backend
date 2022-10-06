import { Expose } from '@nestjs/class-transformer';
import { UserRole, UserSex } from 'src/user/entities/user.entity';

export class UserInfoDTO {

    @Expose()
    usercode: number;

    @Expose()
    role: UserRole;

    @Expose()
    phone: string;

    @Expose()
    sex: UserSex;

    @Expose()
    nickname: string;

    @Expose()
    dolbomi: boolean;

    @Expose()
    age: number;

}