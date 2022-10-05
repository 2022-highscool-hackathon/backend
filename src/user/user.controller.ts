import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/getUser.decorator';
import { UserDto } from 'src/auth/jwt/dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateUserDTO } from './dto/request/create-user.dto';
import { UpdateOlderDolbomiDTO } from './dto/request/dolbomi.dto';
import { LoginDTO } from './dto/request/login.dto';
import { UploadResumeDTO } from './dto/request/upload-resume.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

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

    @Post('dolbomi')
    uploadUserDolbomi(
        @Body() dto: UpdateOlderDolbomiDTO
    ) {
        return this.userservice.UpdateOlderDolbomi(dto);
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

}   
