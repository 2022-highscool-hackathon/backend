import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClassTransformer } from '@nestjs/class-transformer';

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity]),
  ClassTransformer ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
