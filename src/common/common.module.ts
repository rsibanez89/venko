import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [AuthModule, ServiceModule],
  exports: [AuthModule, ServiceModule],
  providers: []
})
export class CommonModule {}
