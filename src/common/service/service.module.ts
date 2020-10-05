import { Module, HttpModule } from '@nestjs/common';
import { S3Service } from './s3.service';
import { VenkoService } from './app.service';
import { UtilsService } from './utils.service';

@Module({
  imports: [HttpModule],
  providers: [S3Service, VenkoService, UtilsService],
  exports: [S3Service, VenkoService, UtilsService],
})
export class ServiceModule {}
