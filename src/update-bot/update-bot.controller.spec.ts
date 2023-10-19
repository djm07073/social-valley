import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBotController } from './update-bot.controller';

describe('UpdateBotController', () => {
  let controller: UpdateBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateBotController],
    }).compile();

    controller = module.get<UpdateBotController>(UpdateBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
