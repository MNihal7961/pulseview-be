import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicatonLogs } from './entities/medication.logs.entity';
import { Repository } from 'typeorm';
import { CreateMedicationLogsDto } from './dto/create-medication-logs.dto';
import { UpdateMedicationLogsDto } from './dto/update-medication-logs.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class MedicationLogsService {
	private readonly logger = new Logger(MedicationLogsService.name);

	constructor(
		@InjectRepository(MedicatonLogs)
		private medicationsLogsRepository: Repository<MedicatonLogs>,
	) {}

	async create(createMedicationLogsDto: CreateMedicationLogsDto) {
		const { date, medicationId, status, time, userId, notes } =
			createMedicationLogsDto;
		try {
			const medicationLog = new MedicatonLogs();
			medicationLog.userId = userId;
			medicationLog.medicationId = medicationId;
			medicationLog.date = new Date(date);
			medicationLog.time = time;
			medicationLog.status = status;
			if (notes) medicationLog.notes = notes;
			await this.medicationsLogsRepository.save(medicationLog);
			return {
				success: true,
				message: 'Medication log created successfully',
				data: medicationLog,
			};
		} catch (error: any) {
			this.logger.error('Error in creating new medication logs', error);
			return {
				success: false,
				message: error.message,
				data: null,
			};
		}
	}

	async findAll(medicationId: string, userId: string) {
		try {
			if (medicationId) {
				const medicationLogs = await this.medicationsLogsRepository.find({
					where: { medicationId },
				});
				return {
					success: true,
					message: 'Medication logs fetched successfully',
					data: medicationLogs,
				};
			}

			if (userId) {
				const medicationLogs = await this.medicationsLogsRepository.find({
					where: { userId },
				});
				return {
					success: true,
					message: 'Medication logs fetched successfully',
					data: medicationLogs,
				};
			}
		} catch (error: any) {
			this.logger.error('Error in fetching medication logs', error);
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
					message: 'Invalid medication log id',
					data: null,
				};
			}
			const medicationLog = await this.medicationsLogsRepository.findOne({
				where: { _id: objectId },
			});

			return {
				success: true,
				message: 'Medication log fetched successfully',
				data: medicationLog,
			};
		} catch (error: any) {
			this.logger.error('Error in fetching medication logs', error);
			return {
				success: false,
				message: error.message,
				data: null,
			};
		}
	}

	async update(
		medicationId: string,
		updateMedicationDto: UpdateMedicationLogsDto,
	) {
		try {
			const objectId = new ObjectId(medicationId);
			if (!objectId) {
				return {
					success: false,
					message: 'Invalid medication log id',
					data: null,
				};
			}
			const medicationLog = await this.medicationsLogsRepository.update(
				objectId,
				updateMedicationDto,
			);

			return {
				success: true,
				message: 'Medication log updated successfully',
				data: medicationLog,
			};
		} catch (error: any) {
			this.logger.error('Error in updating medication logs', error);
			return {
				success: false,
				message: error.message,
				data: null,
			};
		}
	}

	async remove(medicationId: string) {
		try {
			const objectId = new ObjectId(medicationId);
			if (!objectId) {
				return {
					success: false,
					message: 'Invalid medication log id',
					data: null,
				};
			}
			const medicationLog =
				await this.medicationsLogsRepository.delete(objectId);

			return {
				success: true,
				message: 'Medication log deleted successfully',
				data: medicationLog,
			};
		} catch (error: any) {
			this.logger.error('Error in deleting medication logs', error);
			return {
				success: false,
				message: error.message,
				data: null,
			};
		}
	}
}
