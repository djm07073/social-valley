import { Controller } from '@nestjs/common';
import { UpdateBotService } from './update-bot.service';
import { Cron } from '@nestjs/schedule';

@Controller('update-bot')
export class UpdateBotController {
  constructor(private readonly updateBotService: UpdateBotService) {}

  @Cron('*/4 * * * * *') //15분마다: */15 * * * *, 5초마다(아마 테스트용?): */5 * * * * *
  eventListening() {
    this.updateBotService.eventListening();
  }
}
