import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
} from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { MedicationLogsService } from './medication.logs.service';
import { CreateMedicationLogsDto } from './dto/create-medication-logs.dto';
import { UpdateMedicationLogsDto } from './dto/update-medication-logs.dto';

@Controller('medications')
export class MedicationsController {
	constructor(
		private readonly medicationsService: MedicationsService,
		private readonly medicationLogsService: MedicationLogsService,
	) {}

	@Post()
	async create(@Body() createMedicationDto: CreateMedicationDto) {
		return await this.medicationsService.create(createMedicationDto);
	}

	@Get()
	async findAll(@Query('userId') userId: string) {
		return await this.medicationsService.findAll(userId);
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.medicationsService.findOne(id);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateMedicationDto: UpdateMedicationDto,
	) {
		return await this.medicationsService.update(id, updateMedicationDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.medicationsService.remove(id);
	}

	// medication logs

	@Post('/logs')
	async createMedicationLogs(
		@Body() createMedicationLogsDto: CreateMedicationLogsDto,
	) {
		return await this.medicationLogsService.create(createMedicationLogsDto);
	}

	@Get('/logs')
	async findAllMedicationLogs(@Query('medicationId') medicationId: string) {
		return await this.medicationLogsService.findAll(medicationId);
	}

	@Get('/logs/:id')
	async findOneMedicationLogs(@Param('id') id: string) {
		return await this.medicationLogsService.findOne(id);
	}

	@Patch('/logs/:id')
	async updateMedicationLogs(
		@Param('id') id: string,
		@Body() updateMedicationLogsDto: UpdateMedicationLogsDto,
	) {
		return await this.medicationLogsService.update(id, updateMedicationLogsDto);
	}

	@Delete('/logs/:id')
	async removeMedicationLogs(@Param('id') id: string) {
		return await this.medicationLogsService.remove(id);
	}
}
