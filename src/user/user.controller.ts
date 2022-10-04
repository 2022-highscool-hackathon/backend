import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/request/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userservice: UserService) { }

    @Post('create')
    createUser(@Body() dto: CreateUserDTO): Promise<string> {
        return this.userservice.Register(dto)
    }
}   
