import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from './dto/users.dto';
import { UsersService } from './users.service';
import { UserRequest, UserByEmailRequest } from './dto/users.request.dto';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { VenkoAuthGuard } from '../common/auth/venko-auth.guard';
import { Permissions } from '../common/auth/permissions.decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
  @Put(':userId')
  @Permissions('edit:users')
  async updateUser(@Body() request: UserRequest): Promise<User> {
    return this.usersService.addUser(request);
  }

  @UseGuards(JwtAuthGuard, VenkoAuthGuard)
  @Delete(':userId')
  @Permissions('delete:users')
  async deleteUser(@Param('userId') userId: string): Promise<User> {
    const user = await this.usersService.getUserByUserId(userId);
    if (user == null) {
      throw new NotFoundException();
    }
    await this.usersService.deleteUser(user.email);
    return user;
  }
}
