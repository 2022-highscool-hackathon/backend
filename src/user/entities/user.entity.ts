import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


export enum UserSex {
    MALE = "male",
    FEMALE = "female"
}

export enum UserRole {
    ELDER = "elder",
    EMPLOYER = "employer",
    CAREGIVER = "caregiver"
}

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({ unsigned: true })
    usercode: number;

    @Column({
        type: "enum",
        enum: UserSex,
    })
    sex: UserSex;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.ELDER
    })
    role: UserRole;

    @Column({
        nullable: false,
        length: 20
    })
    nickname: string;

    @Column({
        length: 20,
        nullable: false
    })
    phone: string;

    @Column({
        length: 200,
        nullable: false
    })
    password: string;

    @Column({
        type: Boolean,
        default: false
    })
    dolbomi: boolean

    @Column({
        type: Number,
        default: 0
    })
    age: number;

    @Column({
        length: 50,
        nullable: true,
        default: "주소 등록 안함"
    })
    address: string;
    
}
