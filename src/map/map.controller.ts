import { Controller, Param, Get, Render, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/getUser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { User } from 'src/auth/jwt/jwt.model';
import { ViewNealyPositionByPositionDTO } from './dto/request/view-nearly-position-by-position.dto';
import { ViewNealyPositionDTO } from './dto/request/view-nearly-position.dto';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
    constructor(private readonly mapservice: MapService) {}

    @Get(':city/:province')
    viewNearlyPosition(@Param() dto: ViewNealyPositionDTO) {
        return this.mapservice.ViewNearlyPosition(dto);
    }

    @Get('position/:x/:y')
    viewNearlyPositionByPosition(@Param() dto: ViewNealyPositionByPositionDTO) {
        return this.mapservice.ViewNearlyPositionByPosition(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    viewNearlyPositionByUser(@GetUser() user: User) {
        return this.mapservice.ViewNearlyPositionByUser(user); 
    }

    @Get('find')
    @Render('index')
    root() {
        return;
    }

}