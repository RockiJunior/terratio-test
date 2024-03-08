import { Controller, Get } from '@nestjs/common';
import { EarthEngineService } from './earth-engine.service';
import * as ee from '@google/earthengine'

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
  async getFieldArea(): Promise<any> {
    const polygon = ee.Geometry.Polygon([
      [-62.1427136525986, -32.78329173054609],
      [-61.97688876246188, -32.78329173054609],
      [-61.97688876246188, -32.6663158291671],
      [-62.1427136525986, -32.6663158291671],
      [-62.1427136525986, -32.78329173054609],
    ]);
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
