import { Injectable, Logger } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class GoalsService {
	private readonly logger = new Logger(GoalsService.name);

	constructor(
		@InjectRepository(Goal)
		private goalsRepository: Repository<Goal>,
	) {}

	async create(createGoalDto: CreateGoalDto) {
		const { endDate, startDate, targetValue, type, unit, userId } =
			createGoalDto;
		try {
			const goal = new Goal();
			goal.userId = userId;
			goal.type = type;
			goal.targetValue = targetValue;
			goal.unit = unit;
			goal.startDate = new Date(startDate);
			goal.endDate = new Date(endDate);
			goal.status = 'active';

			const newGoal = await this.goalsRepository.save(goal);

			if (!newGoal) {
				return {
					success: false,
					message: 'Failed to create new goal , please try again later',
					data: null,
				};
			}

			return {
				success: true,
				message: 'Goal created successfully',
				data: newGoal,
			};
		} catch (error: any) {
			this.logger.error('Error in creating new goal', error);
			return {
				success: false,
				message: error.message,
				data: null,
			};
		}
	}

	async findAll(userId: string) {
		try {
			const goals = await this.goalsRepository.find({
				where: { userId },
			});

			return {
				success: true,
				message: 'Goals fetched successfully',
				data: goals,
			};
		} catch (error: any) {
			this.logger.error('Error in fetching goals', error);
			return {
				success: false,
				message: error.message,
				data: [],
			};
		}
	}

	async findOne(id: string) {
		try {
			const objectId = new ObjectId(id);
			if (!objectId) {
				return {
					success: false,
					message: 'Invalid goal id',
					data: null,
				};
			}
			const goal = await this.goalsRepository.findOne({
				where: { _id: objectId },
			});

			return {
				success: true,
				message: 'Goal found',
				data: goal,
			};
		} catch (error: any) {
			this.logger.error('Error in fetching goals', error);
			return {
				success: false,
				message: error.message,
				data: null,
			};
		}
	}

	async update(id: string, updateGoalDto: UpdateGoalDto) {
		try {
			const objectId = new ObjectId(id);
			if (!objectId) {
				return {
					success: false,
					message: 'Invalid goal id',
					data: null,
				};
			}
			const goal = await this.goalsRepository.update(objectId, updateGoalDto);

			return {
				success: true,
				message: 'Goal updated successfully',
				data: goal,
			};
		} catch (error: any) {
			this.logger.error('Error in updating goal', error);
			return {
				success: false,
				message: error.message,
				data: null,
			};
		}
	}

	async remove(id: string) {
		try {
			const objectId = new ObjectId(id);
			if (!objectId) {
				return {
					success: false,
					message: 'Invalid goal id',
					data: null,
				};
			}
			const goal = await this.goalsRepository.delete(objectId);
			if (!goal) {
				return {
					success: false,
					message: 'Goal not found',
					data: null,
				};
			}

			return {
				success: true,
				message: 'Goal deleted successfully',
				data: goal,
			};
		} catch (error: any) {
			this.logger.error('Error in deleting goal', error);
			return {
				success: false,
				message: error.message,
				data: null,
			};
		}
	}
}
