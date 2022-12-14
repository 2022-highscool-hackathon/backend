import { Expose } from '@nestjs/class-transformer';
import { UserSex } from 'src/user/entities/user.entity';

export class ViewAllElderDTO {

    @Expose()
    usercode: number;

    @Expose()
    age: number;

    @Expose()
    sex: UserSex;

    @Expose()
    nickname: string;

    @Expose()
    phone: string;

    @Expose()
    isInCharge: boolean;

    @Expose()
    history: string;

}