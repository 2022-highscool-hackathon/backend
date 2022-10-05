import { Expose } from "@nestjs/class-transformer";
import { UserRole, UserSex } from "src/user/entities/user.entity";

export class UserDto {

    @Expose()
    usercode: number;

    @Expose()
    sex: UserSex;

    @Expose()
    role: UserRole;

    @Expose()
    nickname: string;

    @Expose()
    phone: string;

}