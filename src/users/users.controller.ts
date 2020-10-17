import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  Delete,
  Put,
  UseGuards,
  CacheInterceptor,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { User } from './dto/users.dto';
import { UsersService } from './users.service';
import { UserRequest, UserByEmailRequest } from './dto/users.request.dto';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { VenkoAuthGuard } from '../common/auth/venko-auth.guard';
import { Permissions } from '../common/auth/permissions.decorator';

@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, VenkoAuthGuard)
  @Post('')
  async add(@Body() request: UserRequest): Promise<User> {
    const user = await this.usersService.getUserByEmail(request.email);
    if (user != null) {
      return user;
    }
    request.userType = 'User';
    request.userId = '10';
    return this.usersService.addUser(request);
  }

  // UserId is not unique, so better not use this endpoint.
  // @Get(':userId')
  // async get(@Param('userId') userId: string): Promise<User> {
  //   const user = await this.usersService.getUserByUserId(userId);
  //   if (user == null) {
  //     throw new NotFoundException();
  //   }
  //   return user;
  // }

  @UseGuards(JwtAuthGuard, VenkoAuthGuard)
  @Post('email')
  async getByEmail(@Body() request: UserByEmailRequest): Promise<User> {
    const user = await this.usersService.getUserByEmail(request.email);
    if (user == null) {
      throw new NotFoundException();
    }
    return user;
  }

  @UseGuards(JwtAuthGuard, VenkoAuthGuard)
  @Get('')
  @Permissions('read:users')
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.getUsers();
    if (users == null) {
      throw new NotFoundException();
    }
    return users;
  }

  @UseGuards(JwtAuthGuard, VenkoAuthGuard)
  @Put('')
  @Permissions('edit:users')
  async updateUser(
    @Req() req: any,
    @Body() request: UserRequest,
  ): Promise<User> {
    if (!req.isAdmin) {
      const user = await this.usersService.getUserByEmail(request.email);
      request.userId = user?.userId || '10';
      request.userType = user?.userType || 'User';
    }
    return this.usersService.addUser(request);
  }

  @UseGuards(JwtAuthGuard, VenkoAuthGuard)
  @Delete('')
  @Permissions('delete:users')
  async deleteUser(@Body() request: UserRequest): Promise<boolean> {
    return await this.usersService.deleteUser(request.email);
  }
}
