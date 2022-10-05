import { IsString, IsIn, IsNumber } from "class-validator";

export class UpdateElderDolbomiDTO {

    @IsNumber()
    usercode: number;

    @IsString()
    @IsIn(['true', 'false'])
    dolbomi: string;

}