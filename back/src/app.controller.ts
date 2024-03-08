import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EarthEngineService } from './earth-engine-service/earth-engine.service';
var privateKey = require('../private-key/private-key.json');
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly earthEngineService: EarthEngineService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return 'Hello World';
    // const imageData =
    //   await this.earthEngineService.authenticateAndRunAnalysis(privateKey);
    // return imageData;
  }
}
