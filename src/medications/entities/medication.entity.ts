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
export class Medication {
	@ObjectIdColumn()
	@Transform((params) => params.obj._id.toString())
	_id: ObjectId;

	@Column()
	userId: string;

	@Column()
	type: string;

	@Column()
	dosage: string;

	@Column()
	startDate: Date;

	@Column()
	endDate: Date;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
