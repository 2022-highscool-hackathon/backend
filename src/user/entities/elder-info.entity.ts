import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('elder_info')
export class ElderInfoEntity {

    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({ unsigned: true })
    daycode: number;

    @ManyToOne(type => UserEntity, user => user.usercode)
    @JoinColumn({ name: 'usercode' })
    user: UserEntity;

    @Column({ nullable: false, unsigned: true })
    usercode: number;

    @Column({
        type: Boolean,
        default: false
    })
    isMonday: Boolean;

    @Column({
        type: Boolean,
        default: false
    })
    isTuesday: Boolean;

    @Column({
        type: Boolean,
        default: false
    })
    isWednesday: Boolean;

    @Column({
        type: Boolean,
        default: false
    })
    isThursday: Boolean;

    @Column({
        type: Boolean,
        default: false
    })
    isFriday: Boolean;

    @Column({
        type: Boolean,
        default: false
    })
    isSaturday: Boolean;

    @Column({
        type: Boolean,
        default: false
    })
    isSunday: Boolean;

    @Column({
        type: Number,
        nullable: true
    })
    startHour: number;

    @Column({
        type: Number,
        nullable: true
    })
    endHour: number;

    @Column({
        type: Number,
        nullable: true
    })
    startMinute: number;

    @Column({
        type: Number,
        nullable: true
    })
    endMinute: number;

    @Column({
        length: 30,
        nullable: true
    })
    history: string; 

    @Column({
        length: 30,
        nullable: true
    })
    other: string;

}
