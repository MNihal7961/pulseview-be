export class CreateGoalDto {
	userId: string;
	type: 'weight' | 'height';
	targetValue: number;
	unit: 'kg' | 'cm';
	startDate: Date;
	endDate: Date;
}
