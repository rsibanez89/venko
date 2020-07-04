import { Module, HttpModule } from '@nestjs/common';
import { S3Service } from './s3.service';
import { VenkoService } from './app.service';

@Module({
  imports: [HttpModule],
  providers: [S3Service, VenkoService],
  exports: [S3Service, VenkoService],
})
export class ServiceModule {}
