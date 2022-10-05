import { IsIn, IsNumber, IsString, IsUUID } from 'class-validator'
import { BusinessType } from 'src/user/entities/resume.entity';

export class UploadBoardDto {

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

}