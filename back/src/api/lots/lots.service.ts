import { Injectable } from '@nestjs/common';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lots } from './entities/lot.entity';
import { Repository } from 'typeorm';
import { EarthEngineService } from 'src/earth-engine-service/earth-engine.service';

@Injectable()
export class LotsService {
  constructor(
    @InjectRepository(Lots) private readonly lotsRepository: Repository<Lots>,
    private earthEngineService: EarthEngineService,
  ) {}

  async create(createLotDto: CreateLotDto) {
    const { polygon } = createLotDto;
    const { polygonToSquareMeters } =
      await this.earthEngineService.polygonToSquareMeters(polygon);
    const { polygonToHectares } =
      await this.earthEngineService.polygonToHectares(polygon);

    try {
      const result = this.lotsRepository.create({
        ...createLotDto,
        square_meters: polygonToSquareMeters,
        hectares: polygonToHectares,
      });
      await this.lotsRepository.save(result);

      return {
        message: 'Lote Cargado correctamente',
      };
    } catch (err) {
      console.error(err);
    }
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
