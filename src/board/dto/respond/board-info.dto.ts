import { Expose } from 'class-transformer';
import { BusinessType } from 'src/user/entities/resume.entity';

export class BoardInfoDTO {

    @Expose()
    adress: string;

    @Expose()
    business: string;

    @Expose()
    worktype: BusinessType;

    @Expose()
    detail: string;

    @Expose()
    startHour: number;

    @Expose()
    endHour: number;

    @Expose()
    startMinute: number;

    @Expose()
    endMinute: number;

    @Expose()
    hourlyWage: number;

    @Expose()
    nickname: string;

    @Expose()
    phone: string;

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
    
}