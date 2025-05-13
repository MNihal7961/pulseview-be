import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from './entities/medication.entity';
import { MedicationLogsService } from './medication.logs.service';
import { MedicationLogs } from './entities/medication.logs.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Medication, MedicationLogs])],
	controllers: [MedicationsController],
	providers: [MedicationsService, MedicationLogsService],
	exports: [MedicationsService, MedicationLogsService],
})
export class MedicationsModule {}
