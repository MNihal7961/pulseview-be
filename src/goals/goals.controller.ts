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
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Controller('goals')
export class GoalsController {
	constructor(private readonly goalsService: GoalsService) {}

	@Post()
	async create(@Body() createGoalDto: CreateGoalDto) {
		return await this.goalsService.create(createGoalDto);
	}

	@Get()
	async findAll(@Query('userId') userId: string) {
		return await this.goalsService.findAll(userId);
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.goalsService.findOne(id);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
		return await this.goalsService.update(id, updateGoalDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.goalsService.remove(id);
	}
}
