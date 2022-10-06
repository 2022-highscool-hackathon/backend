import { IsString } from "class-validator";

export class ViewNealyPositionByPositionDTO {

    @IsString()
    x: string;

    @IsString()
    y: string;

}