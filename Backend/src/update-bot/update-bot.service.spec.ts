import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBotService } from './update-bot.service';

describe('UpdateBotService', () => {
  let service: UpdateBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateBotService],
    }).compile();

    service = module.get<UpdateBotService>(UpdateBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
