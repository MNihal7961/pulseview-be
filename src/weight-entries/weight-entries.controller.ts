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
import { WeightEntriesService } from './weight-entries.service';
import { CreateWeightEntryDto } from './dto/create-weight-entry.dto';
import { UpdateWeightEntryDto } from './dto/update-weight-entry.dto';

@Controller('weight-entries')
export class WeightEntriesController {
	constructor(private readonly weightEntriesService: WeightEntriesService) {}

	@Post()
	async create(@Body() createWeightEntryDto: CreateWeightEntryDto) {
		return await this.weightEntriesService.create(createWeightEntryDto);
	}

	@Get()
	async findAll(@Query('userId') userId: string) {
		return await this.weightEntriesService.findAll(userId);
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.weightEntriesService.findOne(id);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateWeightEntryDto: UpdateWeightEntryDto,
	) {
		return await this.weightEntriesService.update(id, updateWeightEntryDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.weightEntriesService.remove(id);
	}
}
