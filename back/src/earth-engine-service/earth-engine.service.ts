import { Injectable } from '@nestjs/common';
// let ee = require('@google/earthengine');
import * as ee from '@google/earthengine'

@Injectable()
export class EarthEngineService {
  async getCloudiness(): Promise<any> {
    return new Promise((resolve, reject) => {
      ee.initialize(
        null,
        null,
        async () => {
          try {
            let s2Sr = ee.ImageCollection('COPERNICUS/S2_SR'); // satelite
            let s2Clouds = ee.ImageCollection(
              'COPERNICUS/S2_CLOUD_PROBABILITY',
            ); // cloud probability

            let startDate: Date = ee.Date('2023-01-01');
            let endDate: Date = ee.Date('2023-01-01');
            let maxCloudProbability: number = 65;

            // Definir la región como un polígono alrededor de Marcos Juárez
            let marcosJuarezPolygon = ee.Geometry.Rectangle({
              coords: [
                [-62.1427136525986, -32.78329173054609],
                [-61.97688876246188, -32.78329173054609],
                [-61.97688876246188, -32.6663158291671],
                [-62.1427136525986, -32.6663158291671],
                [-62.1427136525986, -32.78329173054609],
              ],
              geodesic: false,
            });

            // return resolve();
          } catch (error) {
            reject('Error al obtener la nubosidad: ' + error);
          }
        },
        (error: any) => {
          reject('Error de inicialización: ' + error);
        },
      );
    });
  }

  async getWeather(): Promise<any> {
    // Implementa el análisis para obtener datos meteorológicos y devuelve los resultados
  }

  async polygonToArea(polygon: any): Promise<any> {
    let areaM2 = ee.Geometry(polygon).area();
    let areaHa = ee.Number(areaM2).divide(10000);
    return {
      polygonToArea: await areaHa.getInfo(),
    };
  }

  async getLandType(): Promise<any> {
    // Implementa el análisis para determinar el tipo de tierra y devuelve los resultados
  }

  async getCropIdentification(): Promise<any> {
    // Implementa el análisis para identificar cultivos y devuelve los resultados
  }
}
