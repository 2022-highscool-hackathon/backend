import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/request/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ) {}    

    async Register(dto: CreateUserDTO): Promise<string> {
        const { password } = dto;
        const hashedPassword = await this.HashPassword(password);
        await this.saveUser({
            ...dto,
            password: hashedPassword
        });
        return "회원가입이 완료되었습니다."
    }

    async HashPassword(password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

    private async saveUser(
        dto: CreateUserDTO
      ) {
        const user = new UserEntity();
        user.nickname = dto.nickname;
        user.email = dto.email;
        user.password = dto.password;
        await this.userRepository.save(user);
      }
}
