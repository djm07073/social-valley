import { Module } from '@nestjs/common';
import { UpdateBotService } from './update-bot.service';
import { UpdateBotController } from './update-bot.controller';

@Module({
  providers: [UpdateBotService],
  controllers: [UpdateBotController],
})
export class UpdateBotModule {}
