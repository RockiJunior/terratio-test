import { Injectable } from '@nestjs/common';
var ee = require('@google/earthengine');

@Injectable()
export class EarthEngineService {
  async runAnalysis(): Promise<any> {
    return new Promise((resolve, reject) => {
      ee.initialize(
        null,
        null,
        () => {
          var image = new ee.Image(
            new ee.ImageCollection('LANDSAT/LT05/C02/T1').first(),
          );
          var url = image
            .visualize({ bands: ['B4', 'B3', 'B2'], gamma: 1.5 })
            .getThumbURL({ dimensions: '1024x1024', format: 'jpg' });
          console.log(url);
        },
        (error: any) => {
          reject('Error de inicialización: ' + error);
        },
      );
    });
  }

  async authenticateAndRunAnalysis(privateKey: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ee.data.authenticateViaPrivateKey(
        privateKey,
        () => {
          this.runAnalysis()
            .then((result) => resolve(result))
            .catch((error) => reject(error));
        },
        (error: any) => {
          reject('Error de autenticación: ' + error);
        },
      );
    });
  }
}
