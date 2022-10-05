import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UploadJobDto } from './dto/request/upload-job.dto';
import { ViewJobDto } from './dto/request/view-job.dto';
import { JobDto } from './dto/respond/job.dto';
import { JobEntity } from './entities/job.entity';
const axios = require('axios').default;

const { SERVICE_KEY } = process.env;

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
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

    // Todo Caregiver 만 등록 가능
    async UploadJob(dto: UploadJobDto) {
        const {registrationNumber, usercode} = dto;
        // Todo:: 사업자 등록번호 유효한지 확인
        if (!await this.IsVaildUser(usercode)) throw new NotFoundException("유저를 찾을 수 없습니다.");
        await this.SaveJob(dto);
    }

    private async IsVaildUser(usercode: number) {
        const user = await this.userRepository.findBy({ usercode: usercode });
        if (user.length === 0) return false;
        else return true;
    }

    private async SaveJob(dto: UploadJobDto) {
        const {usercode, name, adress} = dto;
        const job = new JobEntity();
        job.usercode = usercode;
        job.name = name;
        job.adress = adress;
        await this.jobrepository.save(job);
    }
}
