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

@Controller('medications')
export class MedicationsController {
	constructor(private readonly medicationsService: MedicationsService) {}

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
}
