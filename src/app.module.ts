import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { S3Service } from './s3service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [HttpModule, CacheModule.register({
    ttl: 300, // seconds
    max: 1000, // maximum number of items in cache
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
