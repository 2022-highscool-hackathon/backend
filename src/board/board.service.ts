import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEntity } from 'src/job/entities/job.entity';
import { Repository } from 'typeorm';
import { UploadBoardDto } from './dto/request/upload-board.dto';
import { BoardEntity } from './entities/board.entity';

@Injectable()
export class BoardService {

    constructor(
        @InjectRepository(BoardEntity) private boardRepository: Repository<BoardEntity>,
        @InjectRepository(JobEntity) private jobRepository: Repository<JobEntity>
    ) {}

    private async IsVailedJob(jobcode: string) {
        const job = await this.jobRepository.findBy({jobcode: jobcode});
        console.log(job);
        if (job.length === 0) throw new NotFoundException("일자리를 찾을 수 없습니다."); 
    }

    async UploadBoard(dto: UploadBoardDto) {
        const { jobcode } = dto; 
        await this.IsVailedJob(jobcode);
        await this.SaveBoard(dto);
    }

    private async SaveBoard(dto: UploadBoardDto) {
        const { jobcode, adress, business, worktype, detail, startHour, endHour, startMinute, endMinute, hourlyWage } = dto;
        const board = new BoardEntity();
        board.jobcode = jobcode;
        board.adress = adress;
        board.business = business;
        board.worktype = worktype;
        board.detail = detail;
        board.startHour = startHour;
        board.endHour = endHour;
        board.startMinute = startMinute;
        board.endMinute = endMinute;
        board.hourlyWage = hourlyWage;
        await this.boardRepository.save(board);
    }

}
