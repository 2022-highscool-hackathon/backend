import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { ViewJobDto } from './dto/request/view-job.dto';
import { JobDto } from './dto/respond/job.dto';
import { JobEntity } from './entities/job.entity';
const axios = require('axios').default;

const { SERVICE_KEY } = process.env;

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(JobEntity) private jobrepository: Repository<JobEntity>
    ) {}

    async uploadJob() {
        
    }

    async saveJob() {

    }

    async viewAllJob(dto: ViewJobDto) {
        const { numOfRows } = dto;
        let Jobs: JobDto;
        console.log(numOfRows);
        const url = 'http://apis.data.go.kr/B552474/JobBsnInfoService/getJobBsnRecruitList';
        let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + SERVICE_KEY;
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(numOfRows);
        await axios.get(url+queryParams)
            .then(function (response) {
                // 성공 핸들링
                // console.log(JSON.stringify(response.data.response.body.items.item));
                Jobs = response.data.response.body.items.item.map(job => plainToClass(JobDto,
                    {
                        city: job.dstrCd1Nm,
                        province: job.dstrCd2Nm,
                        name: job.orgName,
                        state: job.trnStatNm,
                        workplace: job.workPlace
                    }, { excludeExtraneousValues: false }
                ))
                // console.log(Jobs);
                // response.data.response.body.items.item.map(job => 
                // {console.log(job)});
            })
            .catch(function (error) {
                console.log(error);
            })
        return Jobs;
    }
}
