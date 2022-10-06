import { IsIn, IsNumber, IsString, IsUUID } from 'class-validator'
import { BusinessType } from 'src/user/entities/resume.entity';

export class UploadBoardDTO {

    @IsUUID()
    jobcode: string;

    @IsString()
    adress: string;

    @IsString()
    business: string;

    @IsIn(["dealer", "service", "serving", "housework", "packaging", "event", "office", "sales", "consulting", "education", "etc"])
    worktype: BusinessType;

    @IsString()
    detail: string;

    @IsNumber()
    startHour: number;

    @IsNumber()
    endHour: number;

    @IsNumber()
    startMinute: number;

    @IsNumber()
    endMinute: number;

    @IsNumber()
    hourlyWage: number;

    @IsString()
    @IsIn(['true', 'false'])
    isMonday: string;

    @IsString()
    @IsIn(['true', 'false'])
    isTuesday: string;

    @IsString()
    @IsIn(['true', 'false'])
    isWednesday: string;

    @IsString()
    @IsIn(['true', 'false'])
    isThursday: string;

    @IsString()
    @IsIn(['true', 'false'])
    isFriday: string;

    @IsString()
    @IsIn(['true', 'false'])
    isSaturday: string;

    @IsString()
    @IsIn(['true', 'false'])
    isSunday: string;

}