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
import { UpdateElderDolbomiDTO } from './dto/request/update-dolbomi.dto';
import { plainToClass } from '@nestjs/class-transformer';
import { ViewAllElderDTO } from './dto/respones/view-all-elder.dto';
import { ViewCareGiverDTO } from './dto/respones/view-caregiver.dto';
import { UpdateElderAgeDTO } from './dto/request/update-age.dto';
import { User } from 'src/auth/jwt/jwt.model';
import { MatchingElderDTO } from './dto/request/matching-elder.dto';
import { MatchingCaregiverDTO } from './dto/request/matching-caregiver.dto';
import { MatchingEntity } from './entities/matching.entity';
import { ViewUserInfoDTO } from './dto/request/view-user-info.dto';
import { UserInfoDTO } from './dto/respones/user-info.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(ResumeEntity) private resumeRepository: Repository<ResumeEntity>,
        @InjectRepository(MatchingEntity) private matchingRepository: Repository<MatchingEntity>,
        private readonly authservice: AuthService
    ) { }

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

    async UpdateElderDolbomi(dto: UpdateElderDolbomiDTO) {
        const { usercode, dolbomi } = dto;
        if (!await this.IsVaildUser(usercode)) throw new NotFoundException("유저를 찾을 수 없습니다.");
        await this.userRepository.createQueryBuilder()
            .update(UserEntity)
            .set({ dolbomi: (dolbomi == 'true' ? true : false) })
            .where("usercode = :usercode", { usercode: usercode })
            .execute()
    }

    async UpdateElderAge(dto: UpdateElderAgeDTO) {
        const { usercode, age } = dto;
        if (!await this.IsVaildUser(usercode)) throw new NotFoundException("유저를 찾을 수 없습니다.");
        await this.userRepository.createQueryBuilder()
            .update(UserEntity)
            .set({ age: age })
            .where("usercode = :usercode", { usercode: usercode })
            .execute()
    } 

    // Todo :: 나이 추가
    // Todo :: 주소 추가
    async ViewAllElders() {
        const elders: ViewAllElderDTO[] = (await this.userRepository.findBy({ role: UserRole.ELDER, dolbomi: true })).map(elder => plainToClass(ViewAllElderDTO, {
            ...elder
        }, { excludeExtraneousValues: true }));
        return elders;
    }

    async ViewMaleElders() {
        const elders: ViewAllElderDTO[] = (await this.userRepository.findBy({ role: UserRole.ELDER, dolbomi: true, sex: UserSex.MALE })).map(elder => plainToClass(ViewAllElderDTO, {
            ...elder
        }, { excludeExtraneousValues: true }));
        return elders;
    }

    async ViewFemaleElders() {
        const elders: ViewAllElderDTO[] = (await this.userRepository.findBy({ role: UserRole.ELDER, dolbomi: true, sex: UserSex.FEMALE })).map(elder => plainToClass(ViewAllElderDTO, {
            ...elder
        }, { excludeExtraneousValues: true }));
        return elders;
    }

    async ViewAllCaregivers() {
        const caregivers: ViewCareGiverDTO[] = (await this.userRepository.findBy({ role: UserRole.CAREGIVER })).map(caregiver => plainToClass(ViewCareGiverDTO, {
            ...caregiver
        }, { excludeExtraneousValues: true }));
        return caregivers;
    }

    async ViewFemaleCaregivers() {
        const caregivers: ViewCareGiverDTO[] = (await this.userRepository.findBy({ role: UserRole.CAREGIVER, sex: UserSex.FEMALE })).map(caregiver => plainToClass(ViewCareGiverDTO, {
            ...caregiver
        }, { excludeExtraneousValues: true }));
        return caregivers;
    }

    async ViewMaleCaregivers() {
        const caregivers: ViewCareGiverDTO[] = (await this.userRepository.findBy({ role: UserRole.CAREGIVER, sex: UserSex.MALE })).map(caregiver => plainToClass(ViewCareGiverDTO, {
            ...caregiver
        }, { excludeExtraneousValues: true }));
        return caregivers;
    }

    // Todo::elderid가 실제 elder인지 확인 
    async MatchingElder(user: User, dto: MatchingElderDTO) {
        const { usercode } = user;
        const { elderid } = dto;
        const match = new MatchingEntity();
        match.caregiver = usercode;
        match.elder = elderid;
        await this.matchingRepository.save(match);
    }

    // Todo::caregiverid가 실제 caregiver인지 확인
    async MatchingCaregiver(user: User, dto: MatchingCaregiverDTO) {
        const { usercode } = user;
        const { caregiverid } = dto;
        const match = new MatchingEntity();
        match.elder = usercode;
        match.caregiver = caregiverid;
        await this.matchingRepository.save(match);
    }

    async ViewUserInfo(dto: ViewUserInfoDTO) {
        const { usercode } = dto;
        if (!await this.IsVaildUser(usercode)) throw new NotFoundException("유저를 찾을 수 없습니다.");
        const user: UserInfoDTO = plainToClass(UserInfoDTO, {
            ...await this.userRepository.findOneBy({usercode: usercode})
        }, {excludeExtraneousValues: true});
        return user; 
    }
}
