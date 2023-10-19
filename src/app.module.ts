import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UpdateBotModule } from './update-bot/update-bot.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SocialModule } from './social/social.module';

@Module({
  imports: [ScheduleModule.forRoot(), UpdateBotModule, SocialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
