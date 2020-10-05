import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { RoutinesModule } from './routines/routines.module';
import { CommonModule } from './common/common.module';
import { ServiceModule } from './common/service/service.module';
import { TrainingHistoryModule } from './training-history/training-history.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [() => config], isGlobal: true }),
    HttpModule,
    CacheModule.register({
      ttl: 300, // seconds
      max: 1000, // maximum number of items in cache
    }),
    UsersModule,
    RoutinesModule,
    CommonModule,
    ServiceModule,
    TrainingHistoryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
