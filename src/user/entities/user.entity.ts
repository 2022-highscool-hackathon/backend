import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


export enum UserSex {
    MALE = "male",
    FEMALE = "female"
}

export enum UserRole {
    OLDER = "older",
    EMPLOYEE = "employee",
    CAREGIVER = "caregiver"
}

@Entity('user')
export class UserEntity {
    
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({unsigned: true})
    usercode: number;

    @Column({
        type: "enum",
        enum: UserSex,
    })
    sex: number;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.OLDER
    })
    role: UserRole;

    @Column({
        nullable: false,
        length: 20
    })
    nickname: string;

    @Column({
        length: 320,
        nullable: false
    })
    email: string;

    @Column({
        length: 200,
        nullable: false
    })
    password: string;
    
}
