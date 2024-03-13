import { Body, Controller, Get, Post } from '@nestjs/common';
import { EarthEngineService } from './earth-engine.service';
import * as ee from '@google/earthengine';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Earth Engine')
@Controller('earth-engine')
export class EarthEngineController {
  constructor(private readonly earthEngineService: EarthEngineService) {}

  // @Post('polygon-population-count')
  // async getPollyPopulationCount(@Body() body: any): Promise<any> {
  //   const { polygon } = body;
  //   return await this.earthEngineService.populationCountByKm2(polygon);
  // }
  
  // @Get('polygon-hectares')
  // async getFieldArea(@Body() body: any): Promise<any> {
  //   const { polygon } = body;
  //   return await this.earthEngineService.polygonToHectares(polygon);
  // }

  // @Get('polygon-square-meters')
  // async getPolygonSquareMeters(@Body() body: any): Promise<any> {
  //   const { polygon } = body;
  //   return await this.earthEngineService.polygonToSquareMeters(polygon);
  // }

  // @Get('cloudiness')
  // async getCloudiness(): Promise<number> {
  //   try {
  //     const cloudinessValue = await this.earthEngineService.getCloudiness();
  //     return cloudinessValue;
  //   } catch (error) {
  //     throw new Error('Error al obtener la nubosidad: ' + error);
  //   }
  // }

  // @Get('weather')
  // async getWeather(): Promise<any> {
  //   return this.earthEngineService.getWeather();
  // }

  // @Get('land-type')
  // async getLandType(): Promise<any> {
  //   return this.earthEngineService.getLandType();
  // }

  // @Get('crop-identification')
  // async getCropIdentification(): Promise<any> {
  //   return this.earthEngineService.getCropIdentification();
  // }
}
