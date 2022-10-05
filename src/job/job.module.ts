import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { JobEntity } from './entities/job.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
    imports: [TypeOrmModule.forFeature([JobEntity, UserEntity])],
    controllers: [JobController],
    providers: [JobService]
})
export class JobModule { }
