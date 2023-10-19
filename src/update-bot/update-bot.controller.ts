import { Controller } from '@nestjs/common';
import { UpdateBotService } from './update-bot.service';
import { Cron } from '@nestjs/schedule';

@Controller('update-bot')
export class UpdateBotController {
  constructor(private readonly updateBotService: UpdateBotService) {}

  @Cron('*/15 * * * *') //15분마다: */15 * * * *, 15초마다: */15 * * * * *
  eventListening() {
    this.updateBotService.eventListening();
  }
}
