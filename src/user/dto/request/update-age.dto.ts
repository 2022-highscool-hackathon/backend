import { IsString, IsIn, IsNumber } from "class-validator";

export class UpdateElderAgeDTO {

    @IsNumber()
    usercode: number;

    @IsNumber()
    age: number;

}