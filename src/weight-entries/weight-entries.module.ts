import { Module } from '@nestjs/common';
import { WeightEntriesService } from './weight-entries.service';
import { WeightEntriesController } from './weight-entries.controller';

@Module({
  controllers: [WeightEntriesController],
  providers: [WeightEntriesService],
})
export class WeightEntriesModule {}
