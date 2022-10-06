import { Controller, Param, Get } from '@nestjs/common';
import { ViewNealyPositionDTO } from './dto/request/view-nearly-position.dto';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
    constructor(private readonly mapservice: MapService) {}

    @Get(':city/:province')
    ViewNearlyPosition(@Param() dto: ViewNealyPositionDTO) {
        return this.mapservice.ViewNearlyPosition(dto);
    }

    

}
