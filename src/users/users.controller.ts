import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { User } from './dto/users.dto';
import { UsersService } from './users.service';
import { UserRequest, UserByEmailRequest } from './dto/users.request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  async add(@Body() user: UserRequest): Promise<boolean> {
    return this.usersService.addUser(user);
  }

  @Get(':userId')
  async get(@Param('userId') userId: string): Promise<User> {
    const user = await this.usersService.getUserById(userId);
    if (user == null) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post('email')
  async getByEmail(@Body() request: UserByEmailRequest): Promise<User> {
    const user = await this.usersService.getUserByEmail(request.email);
    if (user == null) {
      throw new NotFoundException();
    }
    return user;
  }

  @Get('')
  async getUsers(@Body() user: User): Promise<string> {
    console.log(user);

    return 'Ok';
  }
}
