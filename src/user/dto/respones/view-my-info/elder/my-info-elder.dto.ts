import { Expose } from 'class-transformer';
import { ElderInfoDTO } from '../../elder-info.dto';
import { UserInfoDTO } from '../../user-info.dto';

export class MyInfoElderDTO {

    @Expose()
    elder: ElderInfoDTO;

    @Expose()
    caregiver: UserInfoDTO;

}