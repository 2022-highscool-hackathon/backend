import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { JobEntity } from 'src/job/entities/job.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UploadBoardDTO } from './dto/request/upload-board.dto';
import { ViewBoardInfoDTO } from './dto/request/view-board-info.dto';
import { BoardInfoDTO } from './dto/respond/board-info.dto';
import { BoardEntity } from './entities/board.entity';

@Injectable()
export class BoardService {

    constructor(
        @InjectRepository(BoardEntity) private boardRepository: Repository<BoardEntity>,
        @InjectRepository(JobEntity) private jobRepository: Repository<JobEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ) {}

    private async IsVailedJob(jobcode: string) {
        const job = await this.jobRepository.findBy({jobcode: jobcode});
        console.log(job);
        if (job.length === 0) throw new NotFoundException("일자리를 찾을 수 없습니다."); 
    }

    async UploadBoard(dto: UploadBoardDTO) {
        const { jobcode } = dto; 
        await this.IsVailedJob(jobcode);
        await this.SaveBoard(dto);
    }

    private async SaveBoard(dto: UploadBoardDTO) {
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

    async ViewBoard() {
        return await this.boardRepository.find();
    }

    async ViewBoardInfo(dto: ViewBoardInfoDTO) {
        const { boardcode } = dto;
        const board: BoardInfoDTO = plainToClass(BoardInfoDTO, {
            ...(await this.GetBoardInfo(boardcode)),
            ...(await this.GetPostUser(boardcode))
        }, {excludeExtraneousValues: true})
        return board;
    }

    private async GetBoardInfo(boardcode: number) {
        const board = await this.boardRepository.findOneBy({boardcode: boardcode});
        if (board === null) throw new NotFoundException("구인 광고를 찾을 수 없습니다.");
        return board;
    }

    private async GetPostUser(boardcode: number) {
        const board = await this.boardRepository.findOneBy({boardcode: boardcode});
        if (board === null) throw new NotFoundException("구인 광고를 찾을 수 없습니다.");
        const job = await this.jobRepository.findOneBy({jobcode: board.jobcode});
        const user = await this.userRepository.findOneBy({usercode: job.usercode});
        return user
    }
}
