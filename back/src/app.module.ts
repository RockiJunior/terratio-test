import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EarthEngineService } from './earth-engine-service/earth-engine.service';
import { EarthEngineController } from './earth-engine-service/earth-engine.controller';
import { EarthEngineMiddleware } from './middlewares/earth-enginge.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './config/enviroments';
import { LotsModule } from './api/lots/lots.module';
import config from './config/config';
import { Lots } from './api/lots/entities/lot.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: `postgres`,
      host: `${process.env.POSTGRES_DB_HOST}`,
      port: Number(`${process.env.POSTGRES_DB_PORT}`),
      username: `${process.env.POSTGRES_DB_USER}`,
      password: `${process.env.POSTGRES_DB_PASSWORD}`,
      database: `${process.env.POSTGRES_DB_NAME}`,
      entities: [Lots],
      synchronize: true,
    }),
    LotsModule,
  ],
  controllers: [AppController, EarthEngineController],
  providers: [AppService, EarthEngineService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EarthEngineMiddleware).forRoutes('*');
  }
}
