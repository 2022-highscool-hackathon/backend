import { IsString } from "class-validator";

export class ViewNealyPositionDTO {

    @IsString()
    city: string;

    @IsString()
    province: string;

}