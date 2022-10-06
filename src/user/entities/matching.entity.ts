import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('matching')
export class MatchingEntity {

    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({ unsigned: true })
    matchingcode: number;

    @ManyToOne(type => UserEntity, user => user.usercode)
    @JoinColumn({ name: 'elder' })
    @JoinColumn({ name: 'caregiver' })
    user: UserEntity;

    @Column({ nullable: false, unsigned: true })
    elder: number;

    @Column({ nullable: false, unsigned: true })
    caregiver: number;

}
