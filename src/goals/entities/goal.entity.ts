import { Transform } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	Entity,
	ObjectId,
	ObjectIdColumn,
	UpdateDateColumn,
} from 'typeorm';

export type GoalType = 'weight' | 'height';

@Entity()
export class Goal {
	@ObjectIdColumn()
	@Transform((params) => params.obj._id.toString())
	_id: ObjectId;

	@Column()
	userId: string;

	@Column()
	type: GoalType;

	@Column()
	targetValue: number;

	@Column()
	unit: 'kg' | 'cm';

	@Column()
	startDate: Date;

	@Column()
	endDate: Date;

	@Column()
	status: 'active' | 'completed' | 'failed';

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
