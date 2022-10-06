import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClassTransformer } from '@nestjs/class-transformer';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ResumeEntity } from './entities/resume.entity';
import { MatchingEntity } from './entities/matching.entity';
import { ElderInfoEntity } from './entities/elder-info.entity';
import { JobEntity } from 'src/job/entities/job.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, ResumeEntity, MatchingEntity, ElderInfoEntity, JobEntity]),
        ClassTransformer,
        AuthModule,
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '1y' },
        }),],
    controllers: [UserController],
    providers: [UserService, AuthService]
})
export class UserModule { }
