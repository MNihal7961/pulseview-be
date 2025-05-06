import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeightEntriesService } from './weight-entries.service';
import { CreateWeightEntryDto } from './dto/create-weight-entry.dto';
import { UpdateWeightEntryDto } from './dto/update-weight-entry.dto';

@Controller('weight-entries')
export class WeightEntriesController {
  constructor(private readonly weightEntriesService: WeightEntriesService) {}

  @Post()
  create(@Body() createWeightEntryDto: CreateWeightEntryDto) {
    return this.weightEntriesService.create(createWeightEntryDto);
  }

  @Get()
  findAll() {
    return this.weightEntriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weightEntriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeightEntryDto: UpdateWeightEntryDto) {
    return this.weightEntriesService.update(+id, updateWeightEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weightEntriesService.remove(+id);
  }
}
