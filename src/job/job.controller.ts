import { Controller, Post, Get, UseGuards, Param, Body } from '@nestjs/common';
import { GetUser } from 'src/auth/getUser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { User } from 'src/auth/jwt/jwt.model';
import { UploadJobDto } from './dto/request/upload-job.dto';
import { ViewJobDto } from './dto/request/view-job.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
    
    constructor(private readonly jobservice: JobService) {}

    @Get(':numOfRows')
    @UseGuards(JwtAuthGuard)
    async getAllJob(@Param() dto: ViewJobDto) {
        return await this.jobservice.viewAllJob(dto);
    }

    @Post('upload')
    async uploadJob(@Body() dto: UploadJobDto) {
        return await this.jobservice.UploadJob(dto);
    }

    @Get('my/uploaded')
    @UseGuards(JwtAuthGuard)
    async viewMyUploadedJob(@GetUser() user: User) {
        return this.jobservice.ViewMyUploadedJob(user);
    }


    // Todo::점포 추가하기
    // @Post('append')

}
