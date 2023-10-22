import { IsString, IsNotEmpty, ValidateIf } from 'class-validator';

export class SocialDto {
  @IsString()
  //   @IsIn(['POSTTECH', 'FRIENDTECH'])
  social_type: string;

  //post.tech이면 group_id를 필수로 포함
  @ValidateIf((o) => o.social_type === 'POSTTECH')
  @IsString()
  @IsNotEmpty()
  group_id: string;

  //friend.tech이면 user_address를 필수로 포함
  @ValidateIf((o) => o.social_type === 'FRIENDTECH')
  @IsString()
  @IsNotEmpty()
  user_address: string;
}

export class ValleyResponseDto {
  valley_id: string;
}
