export class CreateMedicationLogsDto {
	userId: string;
	medicationId: string;
	date: Date;
	time: 'morning' | 'afternoon' | 'evening' | 'night';
	status: 'taken' | 'skipped';
	notes?: string;
}
