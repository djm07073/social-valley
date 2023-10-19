import { Injectable } from '@nestjs/common';
import { SocialDto } from './interface/social.interface';

@Injectable()
export class SocialService {
  getValleyId(socialDto: SocialDto): string {
    // socialDto.social_type 및 socialDto.user_address를 사용해서 valley_id 계산하세요!!
    console.log(socialDto.social_type);
    console.log(socialDto.group_id);
    console.log(socialDto.user_address);
    const valleyId = 'valleyId';
    return valleyId;
  }
}
