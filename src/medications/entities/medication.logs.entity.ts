import { Transform } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	ObjectId,
	ObjectIdColumn,
	UpdateDateColumn,
} from 'typeorm';

export class MedicatonLogs {
	@ObjectIdColumn()
	@Transform((params) => params.obj._id.toString())
	_id: ObjectId;

	@Column()
	userId: string;

	@Column()
	medicationId: string;

	@Column()
	date: Date; // The day of the medication

	@Column()
	time: 'morning' | 'afternoon' | 'evening' | 'night'; // Which dose time

	@Column()
	status: 'taken' | 'skipped'; // Action by patient

	@Column({ nullable: true })
	notes?: string; // Optional reason or comment

	@Column()
	timings: [
		{
			time: 'morning' | 'afternoon' | 'evening' | 'night';
			intakeCondition: 'before-fasting' | 'after-fasting' | 'anytime';
		},
	];

	@Column()
	startDate: Date;

	@Column()
	endDate: Date;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
