import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as ee from '@google/earthengine';
let privateKey = require('../../private-key/private-key.json'); // Importa el objeto JSON de la clave privada

@Injectable()
export class EarthEngineMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      await this.authenticate(privateKey);
      next();
    } catch (error) {
      console.error('Error de autenticación:', error);
      res
        .status(500)
        .json({ error: 'Error de autenticación con Google Earth Engine' });
    }
  }

  private authenticate(privateKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ee.data.authenticateViaPrivateKey(
        privateKey,
        () => {
          resolve();
          console.log('la autenticación se realizó correctamente');
        },
        (error: any) => {
          reject(error);
        },
      );
    });
  }
}
