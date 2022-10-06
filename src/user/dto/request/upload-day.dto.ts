import { IsIn, IsNumber, IsString } from "class-validator";

export class UploadDayDTO {

    @IsNumber()
    usercode: number;

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