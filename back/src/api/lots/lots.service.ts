import { Injectable } from '@nestjs/common';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lots } from './entities/lot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LotsService {
  constructor(
    @InjectRepository(Lots) private readonly lotsRepository: Repository<Lots>,
  ) {}

  async create(createLotDto: CreateLotDto) {
    const result = this.lotsRepository.create(createLotDto);
    return result;
  }

  async findAll() {
    const result = await this.lotsRepository.find();
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} lot`;
  }

  update(id: number, updateLotDto: UpdateLotDto) {
    return `This action updates a #${id} lot`;
  }

  remove(id: number) {
    return `This action removes a #${id} lot`;
  }
}
