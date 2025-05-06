import { Test, TestingModule } from '@nestjs/testing';
import { WeightEntriesService } from './weight-entries.service';

describe('WeightEntriesService', () => {
  let service: WeightEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightEntriesService],
    }).compile();

    service = module.get<WeightEntriesService>(WeightEntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
