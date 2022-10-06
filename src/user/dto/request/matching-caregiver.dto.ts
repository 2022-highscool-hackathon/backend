import { IsNumber } from 'class-validator'

export class MatchingCaregiverDTO {

    @IsNumber()
    caregiverid: number;
    
}