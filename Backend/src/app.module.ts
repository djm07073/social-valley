import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UpdateBotModule } from './update-bot/update-bot.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SocialModule } from './social/social.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UpdateBotModule,
    SocialModule,
    ConfigModule.forRoot({
      envFilePath: '.provider.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
