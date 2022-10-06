import { Body, Controller, Post, Get, UseGuards, Put, Param } from '@nestjs/common';
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
import { ViewUserInfoDTO } from './dto/request/view-user-info.dto';
import { UploadDayDTO } from './dto/request/upload-day.dto';
import { UpdateTimeDTO } from './dto/request/update-time.dto';
import { UpdateHistoryAndOtherDTO } from './dto/request/update-history-and-others.dto';

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

    @Put('time')
    uploadUserTime(
        @Body() dto: UpdateTimeDTO
    ) {
        return this.userservice.UpdateElderTime(dto);
    }

    @Post('resume')
    uploadResume(
        @Body() dto: UploadResumeDTO
    ) {
        return this.userservice.UploadResume(dto);
    }

    @Put('history')
    uploadUserHistoryAndOther(@Body() dto: UpdateHistoryAndOtherDTO) {
        return this.userservice.UpdateUserHistoryAndOther(dto);
    }

    @Post('day')
    uploadDay(
        @Body() dto: UploadDayDTO
    ) {
        return this.userservice.UploadDay(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getMyInfo(@GetUser() user: UserDto) {
        return user;
    }

    @Get(':usercode')
    viewUserInfo(@Param() dto: ViewUserInfoDTO) {
        return this.userservice.ViewUserInfo(dto);
    }

    @Get('view/elders')
    @UseGuards(JwtAuthGuard)
    viewAllElders(@GetUser() user: User) {
        return this.userservice.ViewAllElders(user);
    }

    @Get('view/elders/male')
    @UseGuards(JwtAuthGuard)
    viewMaleElders(@GetUser() user: User) {
        return this.userservice.ViewMaleElders(user);
    }

    @Get('view/elders/female')
    @UseGuards(JwtAuthGuard)
    viewFemaleElders(@GetUser() user: User) {
        return this.userservice.ViewFemaleElders(user);
    }

    @Get('view/caregivers')
    @UseGuards(JwtAuthGuard)
    viewAllCaregivers() {
        return this.userservice.ViewAllCaregivers();
    }

    @Get('view/caregivers/female')
    @UseGuards(JwtAuthGuard)
    viewFemaleCaregivers() {
        return this.userservice.ViewFemaleCaregivers();
    }

    @Get('view/caregivers/male')
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
