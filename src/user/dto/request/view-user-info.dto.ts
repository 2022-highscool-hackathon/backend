import { IsNumber } from "class-validator";

export class ViewUserInfoDTO {

    @IsNumber()
    usercode: number;

}