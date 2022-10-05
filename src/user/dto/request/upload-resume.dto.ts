import { IsIn, IsNumber, isNumber } from "class-validator";
import { BusinessType } from "src/user/entities/resume.entity";


export class UploadResumeDTO {

    @IsNumber()
    usercode: number;

    @IsIn(["dealer", "service", "serving", "housework", "packaging", "event", "office", "sales", "consulting", "education", "etc"])
    work: BusinessType;

    @IsIn(["dealer", "service", "serving", "housework", "packaging", "event", "office", "sales", "consulting", "education", "etc"])
    wanted: BusinessType;

}