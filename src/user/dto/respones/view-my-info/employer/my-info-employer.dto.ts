import { Expose } from 'class-transformer';
import { BoardInfoDTO } from 'src/board/dto/respond/board-info.dto';
import { JobDto } from 'src/job/dto/respond/job.dto';
import { UserInfoDTO } from '../../user-info.dto';

export class MyInfoEmployerDTO {

    @Expose()
    employer: UserInfoDTO;

    @Expose()
    job: JobDto;

    @Expose()
    board: BoardInfoDTO;

}