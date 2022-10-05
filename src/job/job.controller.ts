import { Controller, Post, Get, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ViewJobDto } from './dto/request/view-job.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
    
    constructor(private readonly jobservice: JobService) {}

    @Post()
    uploadJob() {

    }

    @Get(':numOfRows')
    @UseGuards(JwtAuthGuard)
    async getAllJob(@Param() dto: ViewJobDto) {
        return await this.jobservice.viewAllJob(dto);
    }

    // Todo::점포 만들 때 (회원가입시) 

    // Todo::점포 추가하기

}
