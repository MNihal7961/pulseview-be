import { Injectable } from '@nestjs/common';
import { CreateWeightEntryDto } from './dto/create-weight-entry.dto';
import { UpdateWeightEntryDto } from './dto/update-weight-entry.dto';

@Injectable()
export class WeightEntriesService {
  create(createWeightEntryDto: CreateWeightEntryDto) {
    return 'This action adds a new weightEntry';
  }

  findAll() {
    return `This action returns all weightEntries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weightEntry`;
  }

  update(id: number, updateWeightEntryDto: UpdateWeightEntryDto) {
    return `This action updates a #${id} weightEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} weightEntry`;
  }
}
