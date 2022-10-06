import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BoardEntity } from './board.entity';

@Entity('job_day')
export class JobDayEntity {

    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({ unsigned: true })
    daycode: number;

    @OneToOne(type => BoardEntity, board => board.boardcode)
    @JoinColumn({ name: 'boardcode' })
    board: BoardEntity;

    @Column({ nullable: false, unsigned: true })
    boardcode: number;

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

}
