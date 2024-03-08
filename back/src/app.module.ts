import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EarthEngineService } from './earth-engine-service/earth-engine.service';
import { EarthEngineController } from './earth-engine-service/earth-engine.controller';
import { EarthEngineMiddleware } from './middlewares/earth-enginge.middleware';

@Module({
  imports: [],
  controllers: [AppController, EarthEngineController],
  providers: [AppService, EarthEngineService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EarthEngineMiddleware).forRoutes('*');
  }
}
