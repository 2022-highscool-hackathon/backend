import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    
    @PrimaryGeneratedColumn('increment')
    usercode: number;

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
