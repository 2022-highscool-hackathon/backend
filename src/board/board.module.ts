import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from 'src/job/entities/job.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardEntity } from './entities/board.entity';
import { JobDayEntity } from './entities/job-day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, JobEntity, UserEntity, JobDayEntity])],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
