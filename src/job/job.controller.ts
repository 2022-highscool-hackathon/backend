import { Controller, Post, Get, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
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

    // Todo::점포 만들 때 (회원가입시) 
    @Post('upload')
    async uploadJob(@Body() dto: UploadJobDto) {
        return await this.jobservice.UploadJob(dto);
    }

    // Todo::점포 추가하기
    // @Post('append')

}
