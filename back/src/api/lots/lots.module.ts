import { Module } from '@nestjs/common';
import { LotsService } from './lots.service';
import { LotsController } from './lots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lots } from './entities/lot.entity';
import { EarthEngineService } from 'src/earth-engine-service/earth-engine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lots])],
  controllers: [LotsController],
  providers: [LotsService, EarthEngineService],
  exports: [LotsService],
})
export class LotsModule {}
