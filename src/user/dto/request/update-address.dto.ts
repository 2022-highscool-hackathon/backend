import { IsNumber, IsSemVer, IsString } from 'class-validator'

export class UpdateAddressDTO {

    @IsString()
    x: string;

    @IsString()
    y: string;
    
}