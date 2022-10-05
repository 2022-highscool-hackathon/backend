import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/request/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/request/login.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private readonly authservice: AuthService
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

    async login(dto: LoginDTO) {
        const { email, password } = dto;
        const user = await this.userRepository.findOneBy({email: email});
        if (user === null) throw new NotFoundException("이메일을 찾을 수 없습니다.");
        const hashedPassword = user.password;
        await this.verifyPassword(password, hashedPassword);      
        return this.authservice.getToken(email, hashedPassword);
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new NotAcceptableException("패스워드가 맞지 않습니다.");
        }
    }

}
