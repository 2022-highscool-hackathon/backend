import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

export enum BusinessType {
    DEALER = "dealer",
    SERVICE = "service",
    SERVING = "serving",
    HOUSEWORK = "housework",
    PACKAGING = "packaging",
    EVENT = "event",
    OFFICE = "office",
    SALES = "sales",
    CONSULTING = "consulting",
    EDUCATION = "education",
    ETC = "etc" 
}

@Entity('resume')
export class ResumeEntity {
    
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({unsigned: true})
    resumecode: number;

    @ManyToOne(type => UserEntity, user => user.usercode)
    @JoinColumn({name: 'usercode'})
    user: UserEntity;

    @Column({nullable: false, unsigned: true})
    usercode: number;

    @Column({
        type: "enum",
        enum: BusinessType,
        default: BusinessType.ETC
    })
    work: BusinessType;

    @Column({
        type: "enum",
        enum: BusinessType,
        default: BusinessType.ETC
    })
    wanted: BusinessType;
    
}
