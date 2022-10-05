import { IsNumber } from "class-validator";

export class updateOlderDolbomiDTO {

    @IsNumber()
    usercode: number;

    @IsNumber()
    dolbomi: number;

}