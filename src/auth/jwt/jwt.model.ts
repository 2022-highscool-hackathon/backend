import { UserRole, UserSex } from "src/user/entities/user.entity";

export type User = {
    usercode: number,
    sex: UserSex,
    role: UserRole,
    nickname: string,
    email: string,
}