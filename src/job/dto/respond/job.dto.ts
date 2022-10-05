import { Expose } from "@nestjs/class-transformer";
import { UserRole, UserSex } from "src/user/entities/user.entity";

export class JobDto {

    @Expose()
    city: string;

    @Expose()
    province: string;

    @Expose()
    name: string

    @Expose()
    state: string;

    @Expose()
    workplace: string;

}