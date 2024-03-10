import { Body, Controller, Get } from '@nestjs/common';
import { EarthEngineService } from './earth-engine.service';
import * as ee from '@google/earthengine';

@Controller('earth-engine')
export class EarthEngineController {
  constructor(private readonly earthEngineService: EarthEngineService) {}

  @Get('cloudiness')
  async getCloudiness(): Promise<number> {
    try {
      const cloudinessValue = await this.earthEngineService.getCloudiness();
      return cloudinessValue;
    } catch (error) {
      throw new Error('Error al obtener la nubosidad: ' + error);
    }
  }

  @Get('weather')
  async getWeather(): Promise<any> {
    return this.earthEngineService.getWeather();
  }

  @Get('polygon-area')
  async getFieldArea(@Body() body: any): Promise<any> {
    const { polygon } = body;
    return this.earthEngineService.polygonToArea(polygon);
  }

  @Get('land-type')
  async getLandType(): Promise<any> {
    return this.earthEngineService.getLandType();
  }

  @Get('crop-identification')
  async getCropIdentification(): Promise<any> {
    return this.earthEngineService.getCropIdentification();
  }
}
