import { Injectable } from '@nestjs/common';
// let ee = require('@google/earthengine');
import * as ee from '@google/earthengine';

@Injectable()
export class EarthEngineService {
  async polygonToHectares(polygon: any): Promise<any> {
    const realPolygon = ee.Geometry.Polygon(polygon);
    let areaM2 = ee.Geometry(realPolygon).area();
    let areaHa = ee.Number(areaM2).divide(10000);
    return {
      polygonToHectares: await areaHa.getInfo(),
    };
  }

  async polygonToSquareMeters(polygon: any): Promise<any> {
    const realPolygon = ee.Geometry.Polygon(polygon);
    const areaM2 = ee.Geometry(realPolygon).area();
    const areaSquareMeters = await ee.Number(areaM2).getInfo();
    return { polygonToSquareMeters: areaSquareMeters.toFixed(2) };
  }

  async populationCountByKm2(polygon: any): Promise<any> {
    ee.initialize();
    const realPolygon = ee.Geometry.Polygon(polygon);

    const dataset = ee
      .ImageCollection('CIESIN/GPWv411/GPW_Population_Count')
      .first();

    const raster = dataset.select('population_count');

    // valor de cantidad de población en el polygon por kilometro cuadrado
    const valor_densidad_poblacion = raster.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: realPolygon,
      scale: 1000, // Escala en metros
    });

    return valor_densidad_poblacion.get('population_count');
  }

  async getWeather(): Promise<any> {
    // Implementa el análisis para obtener datos meteorológicos y devuelve los resultados
  }

  async getLandType(): Promise<any> {
    // Implementa el análisis para determinar el tipo de tierra y devuelve los resultados
  }
}
