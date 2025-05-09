import { Injectable, Logger } from '@nestjs/common';
import { CreateWeightEntryDto } from './dto/create-weight-entry.dto';
import { UpdateWeightEntryDto } from './dto/update-weight-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WeightEntry } from './entities/weight-entry.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class WeightEntriesService {
	private readonly logger = new Logger(WeightEntriesService.name);

	constructor(
		@InjectRepository(WeightEntry)
		private weightEntriesRepository: Repository<WeightEntry>,
	) {}

	async create(createWeightEntryDto: CreateWeightEntryDto) {
		const { userId, weight } = createWeightEntryDto;
		try {
			const weightEntry = new WeightEntry();
			weightEntry.userId = userId;
			weightEntry.weight = weight;
			await this.weightEntriesRepository.save(weightEntry);

			return {
				success: true,
				message: 'Weight entry created successfully',
				data: weightEntry,
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
			const weightEntries = await this.weightEntriesRepository.find({
				where: { userId },
			});
			return {
				success: true,
				message: 'Weight entries fetched successfully',
				data: weightEntries,
			};
		} catch (error: any) {
			this.logger.error('Error in fetching weight entries', error);
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
					message: 'Invalid weight entry id',
					data: null,
				};
			}
			const weightEntry = await this.weightEntriesRepository.findOne({
				where: { _id: objectId },
			});

			return {
				success: true,
				message: 'Weight entry fetched successfully',
				data: weightEntry,
			};
		} catch (error: any) {
			this.logger.error('Error in fetching weight entry', error);
			return {
				success: false,
				message: error.message,
				data: null,
			};
		}
	}

	async update(id: string, updateWeightEntryDto: UpdateWeightEntryDto) {
		try {
			const objectId = new ObjectId(id);
			if (!objectId) {
				return {
					success: false,
					message: 'Invalid weight entry id',
					data: null,
				};
			}
			const weightEntry = await this.weightEntriesRepository.update(
				objectId,
				updateWeightEntryDto,
			);
			return {
				success: true,
				message: 'Weight entry updated successfully',
				data: weightEntry,
			};
		} catch (error: any) {
			this.logger.error('Error in updating weight entry', error);
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
					message: 'Invalid weight entry id',
					data: null,
				};
			}
			const weightEntry = await this.weightEntriesRepository.delete(objectId);
			return {
				success: true,
				message: 'Weight entry deleted successfully',
				data: weightEntry,
			};
		} catch (error: any) {
			this.logger.error('Error in deleting weight entry', error);
			return {
				success: false,
				message: error.message,
				data: null,
			};
		}
	}
}
