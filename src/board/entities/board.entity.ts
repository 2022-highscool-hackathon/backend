import { JobEntity } from 'src/job/entities/job.entity';
import { BusinessType } from 'src/user/entities/resume.entity';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('board')
export class BoardEntity {
    
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({unsigned: true})
    boardcode: number;

    @ManyToOne(type => JobEntity, job => job.jobcode)
    @JoinColumn({name: 'jobcode'})
    job: JobEntity;

    @Column({nullable: false})
    jobcode: string;

    @Column({
        length: 20,
        nullable: false
    })
    adress: string;

    @Column({
        length: 30,
        nullable: false
    })
    business: string;

    @Column({
        type: "enum",
        enum: BusinessType,
        default: BusinessType.ETC
    })
    worktype: BusinessType;

    @Column({
        length: 300,
        nullable: true
    })
    detail: string;

    @Column({
        type: Number
    })
    startHour: number;
    
    @Column({
        type: Number
    })
    endHour: number;

    @Column({
        type: Number
    })
    startMinute: number;

    @Column({
        type: Number
    })
    endMinute: number;

    @Column({
        type: Number
    })
    hourlyWage: number;
    
}
