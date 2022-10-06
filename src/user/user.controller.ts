import { Body, Controller, Post, Get, UseGuards, Put } from '@nestjs/common';
import { GetUser } from 'src/auth/getUser.decorator';
import { UserDto } from 'src/auth/jwt/dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateUserDTO } from './dto/request/create-user.dto';
import { UpdateElderDolbomiDTO } from './dto/request/update-dolbomi.dto';
import { LoginDTO } from './dto/request/login.dto';
import { UploadResumeDTO } from './dto/request/upload-resume.dto';
import { UserService } from './user.service';
import { UpdateElderAgeDTO } from './dto/request/update-age.dto';
import { MatchingElderDTO } from './dto/request/matching-elder.dto';
import { User } from 'src/auth/jwt/jwt.model';
import { MatchingCaregiverDTO } from './dto/request/matching-caregiver.dto';

// Todo UseGuards로 권한관리하기
@Controller('user')
export class UserController {
    constructor(private readonly userservice: UserService) { }

    @Post('create')
    createUser(@Body() dto: CreateUserDTO) {
        return this.userservice.Register(dto)
    }

    @Post('login')
    login(@Body() dto: LoginDTO) {
        return this.userservice.login(dto);
    }

    @Put('dolbomi')
    uploadUserDolbomi(
        @Body() dto: UpdateElderDolbomiDTO
    ) {
        return this.userservice.UpdateElderDolbomi(dto);
    }

    @Put('age')
    uploadUserAge(
        @Body() dto: UpdateElderAgeDTO
    ) {
        return this.userservice.UpdateElderAge(dto);
    }

    @Post('resume')
    uploadResume(
        @Body() dto: UploadResumeDTO
    ) {
        return this.userservice.UploadResume(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getMyInfo(@GetUser() user: UserDto) {
        return user;
    }

    @Get('elders')
    @UseGuards(JwtAuthGuard)
    viewAllElders() {
        return this.userservice.ViewAllElders();
    }

    @Get('elders/male')
    @UseGuards(JwtAuthGuard)
    viewMaleElders() {
        return this.userservice.ViewMaleElders();
    }

    @Get('elders/female')
    @UseGuards(JwtAuthGuard)
    viewFemaleElders() {
        return this.userservice.ViewFemaleElders();
    }

    @Get('caregivers')
    @UseGuards(JwtAuthGuard)
    viewAllCaregivers() {
        return this.userservice.ViewAllCaregivers();
    }

    @Get('caregivers/female')
    @UseGuards(JwtAuthGuard)
    viewFemaleCaregivers() {
        return this.userservice.ViewFemaleCaregivers();
    }

    @Get('caregivers/male')
    @UseGuards(JwtAuthGuard)
    viewMaleCaregivers() {
        return this.userservice.ViewMaleCaregivers();
    }

    @Post('matching/elder')
    @UseGuards(JwtAuthGuard)
    matchingElder(
        @GetUser() user: User,
        @Body() dto: MatchingElderDTO
    ) {
        return this.userservice.MatchingElder(user, dto); 
    }

    @Post('matching/caregiver')
    @UseGuards(JwtAuthGuard)
    matchingCaregiver(
        @GetUser() user: User,
        @Body() dto: MatchingCaregiverDTO
    ) {
        return this.userservice.MatchingCaregiver(user, dto);
    }

}   
