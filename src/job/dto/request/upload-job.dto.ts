import { IsNumber, IsString } from 'class-validator'

export class UploadJobDto {
    
    @IsNumber()
    usercode: number;

    @IsNumber()
    registrationNumber: number;

    @IsString()
    name: string;

    @IsString()
    adress: string;

}