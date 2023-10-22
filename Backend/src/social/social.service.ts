import { Injectable } from '@nestjs/common';
import { SocialDto } from './interface/social.interface';

@Injectable()
export class SocialService {
  getValleyId(socialDto: SocialDto): string {
    // 프론트에서 받은 socialDto.group_id, socialDto.user_address 사용해서 하고싶은거 하는 곳
    // valley_id 생성하고 web3 storage에서 valley_id를 기반으로 유저정보를 가져온다. <- 이건 맞는지 모르겠음
    console.log(socialDto.social_type);
    console.log(socialDto.group_id);
    console.log(socialDto.user_address);
    const valleyId = 'valleyId';
    return valleyId;
  }
}
