// MODULE
import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/request/create-user.dto';
import { plainToClass } from '@nestjs/class-transformer';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { ResumeEntity } from './entities/resume.entity';
// TYPE
import { User } from 'src/auth/jwt/jwt.model';
import { UserEntity, UserRole, UserSex } from './entities/user.entity';
// DTO
import { LoginDTO } from './dto/request/login.dto';
import { UploadResumeDTO } from './dto/request/upload-resume.dto';
import { ViewAllElderDTO } from './dto/respones/view-all-elder.dto';
import { ViewCareGiverDTO } from './dto/respones/view-caregiver.dto';
import { UpdateElderAgeDTO } from './dto/request/update-age.dto';
import { MatchingElderDTO } from './dto/request/matching-elder.dto';
import { MatchingCaregiverDTO } from './dto/request/matching-caregiver.dto';
import { MatchingEntity } from './entities/matching.entity';
import { ViewUserInfoDTO } from './dto/request/view-user-info.dto';
import { UserInfoDTO } from './dto/respones/user-info.dto';
import { ElderInfoEntity } from './entities/elder-info.entity';
import { UploadDayDTO } from './dto/request/upload-day.dto';
import { UpdateTimeDTO } from './dto/request/update-time.dto';
import { UpdateElderDolbomiDTO } from './dto/request/update-dolbomi.dto';
import { UpdateHistoryAndOtherDTO } from './dto/request/update-history-and-others.dto';
import { ElderInfoDTO } from './dto/respones/elder-info.dto';
import { UpdateAddressDTO } from './dto/request/update-address.dto';
import { UserDto } from 'src/auth/jwt/dto/user.dto';
const axios = require('axios').default;

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(ResumeEntity) private resumeRepository: Repository<ResumeEntity>,
        @InjectRepository(MatchingEntity) private matchingRepository: Repository<MatchingEntity>,
        @InjectRepository(ElderInfoEntity) private elderInfoRepository: Repository<ElderInfoEntity>,
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
        // create or update
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

    async UpdateElderTime(dto: UpdateTimeDTO) {
        const { usercode, startHour, startMinute, endHour, endMinute } = dto;
        if (!await this.IsVaildUser(usercode)) throw new NotFoundException("유저를 찾을 수 없습니다.");
        await this.elderInfoRepository.createQueryBuilder()
            .update(ElderInfoEntity)
            .set({ startHour: startHour, endHour: endHour, startMinute: startMinute, endMinute: endMinute })
            .where("usercode = :usercode", { usercode: usercode })
            .execute()
    }

    async UpdateUserHistoryAndOther(dto: UpdateHistoryAndOtherDTO) {
        const { usercode, history, other } = dto;
        if (!await this.IsVaildUser(usercode)) throw new NotFoundException("유저를 찾을 수 없습니다.");
        await this.elderInfoRepository.createQueryBuilder()
            .update(ElderInfoEntity)
            .set({ history: history, other: other })
            .where("usercode = :usercode", { usercode: usercode })
            .execute()
    }

    async UpdateUserAddress(user: User, dto: UpdateAddressDTO) {
        const { x, y } = dto;
        const { usercode } = user;
        let config = {
            method: 'get',
            url: 'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=' + x + '&y=' + y,
            headers: {
                'Authorization': 'KakaoAK f5e345a8f9d1132783877bb6fa3e655c'
            }
        };
        let address = "";
        await axios(config)
            .then((response) => {
                address += response.data.documents[0].address_name;
            })
            .catch((error) => {
                console.log(error);
            });
        await this.userRepository.createQueryBuilder()
            .update(UserEntity)
            .set({ address: address })
            .where("usercode = :usercode", { usercode: usercode })
            .execute()
    }

    async ViewAllElders(user: User) {
        const users = await this.userRepository.findBy({ role: UserRole.ELDER, dolbomi: true });
        const elders: ViewAllElderDTO[] = await Promise.all(users.map(async elder => plainToClass(ViewAllElderDTO, {
            ...elder,
            isInCharge: (await this.IsInCharge(user, elder.usercode)),
            history: (await this.GetElderHistory(elder.usercode))
        }, { excludeExtraneousValues: true })));
        return elders;
    }

    async ViewMaleElders(user: User) {
        const users = await this.userRepository.findBy({ role: UserRole.ELDER, dolbomi: true, sex: UserSex.MALE });
        const elders: ViewAllElderDTO[] = await Promise.all(users.map(async elder => plainToClass(ViewAllElderDTO, {
            ...elder,
            isInCharge: (await this.IsInCharge(user, elder.usercode)),
            history: (await this.GetElderHistory(elder.usercode))
        }, { excludeExtraneousValues: true })));
        return elders;
    }

    async ViewFemaleElders(user: User) {
        const users = await this.userRepository.findBy({ role: UserRole.ELDER, dolbomi: true, sex: UserSex.FEMALE });
        const elders: ViewAllElderDTO[] = await Promise.all(users.map(async elder => plainToClass(ViewAllElderDTO, {
            ...elder,
            isInCharge: (await this.IsInCharge(user, elder.usercode)),
            history: (await this.GetElderHistory(elder.usercode))
        }, { excludeExtraneousValues: true })));
        return elders;
    }

    async GetElderHistory(usercode: number) {
        const elder = await this.elderInfoRepository.findOneBy({usercode: usercode});
        return elder.history;
    }

    private async IsInCharge(user: User, elderid: number) {
        const { usercode } = user;
        const match = await this.matchingRepository.findOneBy({ caregiver: usercode, elder: elderid });
        if (match === null) return false;
        else return true;
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
    
    async MatchingElder(user: User, dto: MatchingElderDTO) {
        const { usercode } = user;
        const { elderid } = dto;
        const match = new MatchingEntity();
        match.caregiver = usercode;
        match.elder = elderid;
        await this.matchingRepository.save(match);
    }

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
            ...await this.userRepository.findOneBy({ usercode: usercode })
        }, { excludeExtraneousValues: true });
        return user;
    }

    async ViewElderInfo(dto: ViewUserInfoDTO) {
        const { usercode } = dto;
        if (!await this.IsVaildUser(usercode)) throw new NotFoundException("유저를 찾을 수 없습니다.");
        const user: ElderInfoDTO = plainToClass(ElderInfoDTO, {
            ...await this.userRepository.findOneBy({ usercode: usercode }),
            ...await this.elderInfoRepository.findOneBy({ usercode: usercode })
        }, { excludeExtraneousValues: true });
        return user;
    }

    async UploadDay(dto: UploadDayDTO) {
        const { usercode } = dto;
        if (!await this.IsVaildUser(usercode)) throw new NotFoundException("유저를 찾을 수 없습니다.");
        await this.SaveDay(dto);
    }

    private async SaveDay(dto: UploadDayDTO) {
        const { usercode, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday } = dto;
        const day = new ElderInfoEntity();
        day.usercode = usercode;
        day.isMonday = (isMonday == 'true' ? true : false);
        day.isTuesday = (isTuesday == 'true' ? true : false);
        day.isWednesday = (isWednesday == 'true' ? true : false);
        day.isThursday = (isThursday == 'true' ? true : false);
        day.isFriday = (isFriday == 'true' ? true : false);
        day.isSaturday = (isSaturday == 'true' ? true : false);
        day.isSunday = (isSunday == 'true' ? true : false);
        await this.elderInfoRepository.save(day);
    }

    async ViewMyInfo(user: UserDto) {
        switch(user.role) {
            case "elder":
                return;
            case "employer":
                return;
            case "caregiver":
                return;
        }
    }

}
