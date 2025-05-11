export class CreateMedicationDto {
	userId: string;
	type: string;
	dosage: string;
	startDate: Date;
	endDate: Date;
	timings: [
		{
			time: 'morning' | 'afternoon' | 'evening' | 'night';
			intakeCondition: 'before-fasting' | 'after-fasting' | 'anytime';
		},
	];
}
