import { IsString, IsIn, IsNumber } from "class-validator";

export class UpdateOlderDolbomiDTO {

    @IsNumber()
    usercode: number;

    @IsString()
    @IsIn(['true', 'false'])
    dolbomi: string;

}