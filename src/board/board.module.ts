import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from 'src/job/entities/job.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardEntity } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, JobEntity])],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
