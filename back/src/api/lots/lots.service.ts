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

  async findAll() {
    const result = await this.lotsRepository.find();
    return result;
  }

  async findOne(id: number) {
    const result = await this.lotsRepository.findOne({
      where: {
        id: id,
      },
    });
    return result;
  }

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

  async update(id: number, updateLotDto: UpdateLotDto) {
    try {
      await this.lotsRepository.update(id, updateLotDto);
      const result = await this.lotsRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!result) {
        throw new Error('Error Updating Lot');
      }
      return result;
    } catch (err) {
      console.error(err);
      return {
        message: err.message,
      };
    }
  }

  async remove(id: number) {
    try {
      await this.lotsRepository.update(id, {
        deleted_at: new Date(),
        is_deleted: true,
      });
      return {
        message: 'Lot deleted successfully',
      };
    } catch (err) {
      console.error(err);
      return {
        message: err,
      };
    }
  }
}
