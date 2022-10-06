import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from 'src/job/entities/job.entity';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  controllers: [MapController],
  providers: [MapService]
})
export class MapModule {}
