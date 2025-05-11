import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicationLogsDto } from './create-medication-logs.dto';

export class UpdateMedicationLogsDto extends PartialType(
	CreateMedicationLogsDto,
) {}
