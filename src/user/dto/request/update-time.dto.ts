import { IsIn, IsNumber, IsString } from "class-validator";

export class UpdateTimeDTO {

    @IsNumber()
    usercode: number;

    @IsNumber()
    startHour: number;

    @IsNumber()
    endHour: number;

    @IsNumber()
    startMinute: number;

    @IsNumber()
    endMinute: number;

}