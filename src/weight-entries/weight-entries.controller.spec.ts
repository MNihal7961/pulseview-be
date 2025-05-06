import { Test, TestingModule } from '@nestjs/testing';
import { WeightEntriesController } from './weight-entries.controller';
import { WeightEntriesService } from './weight-entries.service';

describe('WeightEntriesController', () => {
  let controller: WeightEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightEntriesController],
      providers: [WeightEntriesService],
    }).compile();

    controller = module.get<WeightEntriesController>(WeightEntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
