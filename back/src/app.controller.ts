import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EarthEngineService } from './earth-engine-service/earth-engine.service';
import { ApiTags } from '@nestjs/swagger';
var privateKey = require('../private-key/private-key.json');
@ApiTags('/')
@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    // private readonly earthEngineService: EarthEngineService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return 'Hello World';
  }
}
