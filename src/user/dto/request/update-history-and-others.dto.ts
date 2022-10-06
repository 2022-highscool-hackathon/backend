import { IsNumber, IsString } from "class-validator";

export class UpdateHistoryAndOtherDTO {

    @IsNumber()
    usercode: number;

    @IsString()
    history: string;

    @IsString()
    other: string;

}