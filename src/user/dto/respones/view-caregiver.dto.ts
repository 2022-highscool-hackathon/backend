import { Expose } from '@nestjs/class-transformer';
import { UserSex } from 'src/user/entities/user.entity';

export class ViewCareGiverDTO {

    @Expose()
    usercode: number;

    @Expose()
    sex: UserSex;

    @Expose()
    nickname: string;

    @Expose()
    phone: string;

}