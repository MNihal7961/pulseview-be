import { Injectable, Logger } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from './entities/medication.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class MedicationsService {
	private readonly logger = new Logger(MedicationsService.name);

	constructor(
		@InjectRepository(Medication)
		private medicationsRepository: Repository<Medication>,
	) {}

	async create(createMedicationDto: CreateMedicationDto) {
		const { dosage, endDate, startDate, timings, type, userId } =
			createMedicationDto;
		try {
			const medication = new Medication();
			medication.userId = userId;
			medication.type = type;
			medication.dosage = dosage;
			medication.startDate = new Date(startDate);
			medication.endDate = new Date(endDate);
			medication.timings = timings;
			await this.medicationsRepository.save(medication);

			return {
				success: true,
				message: 'Goal created successfully',
				data: medication,
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
			const goals = await this.medicationsRepository.find({
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
			const goal = await this.medicationsRepository.findOne({
				where: { _id: objectId },
			});

			if (!goal) {
				return {
					success: false,
					message: 'Goal not found',
					data: null,
				};
			}

			return {
				success: true,
				message: 'Goal fetched successfully',
				data: goal,
			};
		} catch (error: any) {
			this.logger.error('Error in fetching goal', error);
			return {
				success: false,
				message: error.message,
				data: null,
			};
		}
	}

	async update(id: string, updateMedicationDto: UpdateMedicationDto) {
		try {
			const objectId = new ObjectId(id);
			if (!objectId) {
				return {
					success: false,
					message: 'Invalid goal id',
					data: null,
				};
			}
			const goal = await this.medicationsRepository.update(
				objectId,
				updateMedicationDto,
			);

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
			const goal = await this.medicationsRepository.delete(objectId);

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
