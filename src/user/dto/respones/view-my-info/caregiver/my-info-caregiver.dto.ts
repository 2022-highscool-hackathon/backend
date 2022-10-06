import { Expose } from 'class-transformer';
import { ElderInfoDTO } from '../../elder-info.dto';
import { UserInfoDTO } from '../../user-info.dto';

export class MyInfoCareGiverDTO {

    @Expose()
    caregiver: UserInfoDTO;

    @Expose()
    elder: ElderInfoDTO[];

}