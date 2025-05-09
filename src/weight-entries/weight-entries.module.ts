import { Module } from '@nestjs/common';
import { WeightEntriesService } from './weight-entries.service';
import { WeightEntriesController } from './weight-entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightEntry } from './entities/weight-entry.entity';

@Module({
	imports: [TypeOrmModule.forFeature([WeightEntry])],
	controllers: [WeightEntriesController],
	providers: [WeightEntriesService],
	exports: [WeightEntriesService],
})
export class WeightEntriesModule {}
