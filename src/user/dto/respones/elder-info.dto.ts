import { Expose } from '@nestjs/class-transformer';
import { UserSex } from 'src/user/entities/user.entity';

export class ElderInfoDTO {

    @Expose()
    usercode: number;

    @Expose()
    age: number;

    @Expose()
    phone: string;

    @Expose()
    sex: UserSex;

    @Expose()
    nickname: string;

    @Expose()
    isMonday: Boolean;

    @Expose()
    isTuesday: Boolean;

    @Expose()
    isWednesday: Boolean;
    
    @Expose()
    isThursday: Boolean;
    
    @Expose()
    isFriday: Boolean;

    @Expose()
    isSaturday: Boolean;

    @Expose()
    isSunday: Boolean;

    @Expose()
    startHour: number;

    @Expose()
    endHour: number;

    @Expose()
    startMinute: number;

    @Expose()
    endMinute: number;

    @Expose()
    history: string;

    @Expose()
    other: string;

}