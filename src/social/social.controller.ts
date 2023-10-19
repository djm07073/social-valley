// social.controller.ts
import { Body, Controller, Get } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialDto, ValleyResponseDto } from './interface/social.interface';

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get('getValleyId')
  getValleyId(@Body() socialDto: SocialDto): ValleyResponseDto {
    const valleyId = this.socialService.getValleyId(socialDto);
    return { valley_id: valleyId };
  }
}
