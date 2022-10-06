import { Injectable } from '@nestjs/common';
import { ViewNealyPositionDTO } from './dto/request/view-nearly-position.dto';
const axios = require('axios').default;

@Injectable()
export class MapService {
    async ViewNearlyPosition(dto: ViewNealyPositionDTO) {
        const { city, province } = dto;
        console.log(city, province);
        let Jobs;
        const url = 'https://www.seniorro.or.kr:4431/seniorro/main/jobSearchAct02.do';
        const payload = {sst01: city, sst02: province, projTypeList: ["A", "B", "C", "E"]}
        await axios.post(url, payload)
        .then(function (response) {
            console.log(response.data);
            Jobs = response.data.map;
        })
        .catch(function (error) {
            console.log(error);
        });
        return Jobs;
    }
}
