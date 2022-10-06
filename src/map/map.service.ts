import { Injectable } from '@nestjs/common';
import { ViewNealyPositionDTO } from './dto/request/view-nearly-position.dto';
const axios = require('axios').default;

@Injectable()
export class MapService {
    async ViewNearlyPosition(dto: ViewNealyPositionDTO) {
        const { city, province } = dto;
        let Jobs;
        const url = 'https://www.seniorro.or.kr:4431/seniorro/main/jobSearchAct02.do';
        const payload = {sst01: city, sst02: province, projTypeList: ["A", "B", "C", "E"]}
        await axios.post(url, payload)
        .then(function (response) {
            Jobs = response.data.map.instnList;
        })
        .catch(function (error) {
            console.log(error);
        });
        const PositionJobs = await Promise.all(Jobs.map(async job => {
        return ({
            ...job,
            x: (await this.getXY(job.rdAddr, true)),
            y: (await this.getXY(job.rdAddr, false))
        })
        }))
        return PositionJobs;
    }

    async getXY(adress: string, isX: boolean) {
        if (adress === " ") return 0;
        let config = {
            method: 'get',
            url: `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(adress)}`,
            headers: { 
                'Authorization': 'KakaoAK f5e345a8f9d1132783877bb6fa3e655c'
            }
        };
        let x = "";
        let y = ""
        await axios(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data.documents[0].x));
                x += response.data.documents[0].x;
                y += response.data.documents[0].y;
            })
            .catch((error) => {
                console.log(error);
            });
        if (isX) {
            return x;
        } else {
            return y;
        }
    }
}
