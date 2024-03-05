import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EarthEngineService } from './earth-engine-service/EarthEngineService';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, EarthEngineService],
})
export class AppModule {}
