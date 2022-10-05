import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum JobType {
    // 인턴형
    INTERN = "int",
    // 연수형
    TRN = "trn",
}

@Entity('job')
export class JobEntity {
    
    @PrimaryGeneratedColumn("uuid")
    jobcode: string;

    @ManyToOne(type => UserEntity, user => user.usercode)
    @JoinColumn({name: 'usercode'})
    user: UserEntity;

    @Column({nullable: false, unsigned: true})
    usercode: number;

    @Column({
        length: 20,
        nullable: false
    })
    adress: string

    // @Column({
    //     type: "enum",
    //     enum: JobType,
    //     default: JobType.INTERN
    // })
    // type: JobType

    @Column({
        length: 20,
        nullable: false
    })
    name: string

    // @Column({
    //     nullable: false
    // })
    // projYear: Date;

    // @Column({
    //     length: 20,
    //     nullable: false,
    //     default: "모집 중"
    // })
    // state: string; 

    // @Column({
    //     length: 20,
    //     nullable: false
    // })
    // workplace: string; 
    
}
