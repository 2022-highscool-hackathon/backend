import { Controller, Param, Get } from '@nestjs/common';
import { ViewNealyPositionByPositionDTO } from './dto/request/view-nearly-position-by-position.dto';
import { ViewNealyPositionDTO } from './dto/request/view-nearly-position.dto';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
    constructor(private readonly mapservice: MapService) {}

    @Get(':city/:province')
    ViewNearlyPosition(@Param() dto: ViewNealyPositionDTO) {
        return this.mapservice.ViewNearlyPosition(dto);
    }

    @Get('position/:x/:y')
    ViewNearlyPositionByPosition(@Param() dto: ViewNealyPositionByPositionDTO) {
        return this.mapservice.ViewNearlyPositionByPosition(dto);
    }

}
