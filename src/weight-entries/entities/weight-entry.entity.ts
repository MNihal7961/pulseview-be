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
export class WeightEntry {
	@ObjectIdColumn()
	@Transform((params) => params.obj._id.toString())
	_id: ObjectId;

	@Column()
	userId: string;

	@Column()
	weight: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
