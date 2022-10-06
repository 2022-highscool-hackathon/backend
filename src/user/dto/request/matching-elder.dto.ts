import { IsNumber } from 'class-validator'

export class MatchingElderDTO {

    @IsNumber()
    elderid: number;
    
}