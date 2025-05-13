import { Transform } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	Entity,
	ObjectId,
	ObjectIdColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MedicationLogs {
	@ObjectIdColumn()
	@Transform((params) => params.obj._id.toString())
	_id: ObjectId;

	@Column()
	userId: string;

	@Column()
	medicationId: string;

	@Column()
	date: Date;

	@Column()
	time: 'morning' | 'afternoon' | 'evening' | 'night';

	@Column()
	status: 'taken' | 'skipped';

	@Column({ nullable: true })
	notes?: string;

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
