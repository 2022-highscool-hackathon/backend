// import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { UserEntity } from './user.entity';

// @Entity('elder_day')
// export class ElderNeedDayEntity {

//     @PrimaryGeneratedColumn('increment')
//     @PrimaryColumn({ unsigned: true })
//     daycode: number;

//     @ManyToOne(type => UserEntity, user => user.usercode)
//     @JoinColumn({ name: 'usercode' })
//     user: UserEntity;

//     @Column({ nullable: false, unsigned: true })
//     usercode: number;

//     @Column({ 
//         type: Boolean, 
//         default: false 
//     })
//     isMonday: number;

//     @Column({ 
//         type: Boolean, 
//         default: false 
//     })
//     isTuesday: number;

//     @Column({ 
//         type: Boolean, 
//         default: false 
//     })
//     isWednesday: number;

//     @Column({ 
//         type: Boolean, 
//         default: false 
//     })
//     isTh: number;

//     @Column({ 
//         type: Boolean, 
//         default: false 
//     })
//     isMonday: number;

//     @Column({ 
//         type: Boolean, 
//         default: false 
//     })
//     isMonday: number;

//     @Column({ 
//         type: Boolean, 
//         default: false 
//     })
//     isMonday: number;

// }
