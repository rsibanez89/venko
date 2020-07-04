import { Module, CacheModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 300, // seconds
      max: 1000, // maximum number of items in cache
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
