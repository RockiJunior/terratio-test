import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { LotsService } from './lots.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lots')
@Controller('lots')
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

  @Get('')
  async getAll(): Promise<any> {
    return await this.lotsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<any> {
    return await this.lotsService.findOne(id);
  }

  @Post('')
  async create(@Body() createLotDto: CreateLotDto) {
    return await this.lotsService.create(createLotDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateLotDto: UpdateLotDto) {
    return await this.lotsService.update(id, updateLotDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return await this.lotsService.remove(id);
  }
}
