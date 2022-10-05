import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/request/create-user.dto';
import { UserEntity, UserRole, UserSex } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/request/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { UploadResumeDTO } from './dto/request/upload-resume.dto';
import { ResumeEntity } from './entities/resume.entity';
import { UpdateOlderDolbomiDTO } from './dto/request/dolbomi.dto';
import { plainToClass } from '@nestjs/class-transformer';
import { ViewAllElderDTO } from './dto/respones/view-all-elder.dto';
import { ViewCareGiverDTO } from './dto/respones/view-caregiver.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(ResumeEntity) private resumeRepository: Repository<ResumeEntity>,
        private readonly authservice: AuthService
    ) {}

    // Todo:: Phone Unique설정
    async Register(dto: CreateUserDTO) {
        const { password } = dto;
        const hashedPassword = await this.HashPassword(password);
        await this.saveUser({
            ...dto,
            password: hashedPassword
        });
        return await this.getLastId();
    }

    private async getLastId() {
        const user = await this.userRepository.find({
            order: { usercode: "DESC" },
            take: 1
        })
        return user[0].usercode;
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
        user.role = dto.role;
        user.sex = dto.sex;
        user.phone = dto.phone;
        user.password = dto.password;
        await this.userRepository.save(user);
    }

    async login(dto: LoginDTO) {
        const { phone, password } = dto;
        const user = await this.userRepository.findOneBy({ phone: phone });
        if (user === null) throw new NotFoundException("휴대폰 번호를 찾을 수 없습니다.");
        const hashedPassword = user.password;
        await this.verifyPassword(password, hashedPassword);
        return this.authservice.getToken(phone, hashedPassword);
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

    async UploadResume(dto: UploadResumeDTO) {
        const { usercode } = dto;
        const user = await this.userRepository.findBy({ usercode: usercode });
        if (user.length === 0) throw new NotFoundException("유저를 찾을 수 없습니다.")
        await this.saveResume(dto);
    }

    private async saveResume(
        dto: UploadResumeDTO
    ) {
        const { usercode, wanted, work } = dto;
        if (await this.IsWriteResume(usercode)) {
            this.resumeRepository.createQueryBuilder()
                .update(ResumeEntity)
                .set({ wanted: wanted, work: work })
                .where("usercode = :usercode", { usercode: usercode })
                .execute()
        } else {
            const resume = new ResumeEntity();
            resume.usercode = usercode;
            resume.wanted = wanted;
            resume.work = work;
            this.resumeRepository.save(resume);
        }
    }

    private async IsWriteResume(usercode: number) {
        const resume = await this.resumeRepository.findBy({ usercode: usercode });
        if (resume.length === 0) return false;
        else return true;
    }

    private async IsVaildUser(usercode: number) {
        const user = await this.userRepository.findBy({ usercode: usercode });
        if (user.length === 0) return false;
        else return true;
    }

    async UpdateOlderDolbomi(dto: UpdateOlderDolbomiDTO) {
        const { usercode, dolbomi } = dto;
        if (!await this.IsVaildUser(usercode)) throw new NotFoundException("유저를 찾을 수 없습니다.");
        await this.userRepository.createQueryBuilder()
            .update(UserEntity)
            .set({ dolbomi: (dolbomi=='true'?true:false) })
            .where("usercode = :usercode", { usercode: usercode })
            .execute()
    }

    // Todo :: 나이 추가
    async ViewAllElders() {
        const elders: ViewAllElderDTO[] = (await this.userRepository.findBy({role: UserRole.ELDER, dolbomi: true})).map(elder => plainToClass(ViewAllElderDTO, {
            ...elder
        }, {excludeExtraneousValues: true})); 
        return elders;
    }

    async ViewAllCaregivers() {
        const caregivers: ViewCareGiverDTO[] = (await this.userRepository.findBy({role: UserRole.CAREGIVER})).map(caregiver => plainToClass(ViewCareGiverDTO, {
            ...caregiver
        }, {excludeExtraneousValues: true})); 
        return caregivers;
    }

    async ViewFemaleCaregivers() {
        const caregivers: ViewCareGiverDTO[] = (await this.userRepository.findBy({role: UserRole.CAREGIVER, sex: UserSex.FEMALE})).map(caregiver => plainToClass(ViewCareGiverDTO, {
            ...caregiver
        }, {excludeExtraneousValues: true})); 
        return caregivers;
    }
}
