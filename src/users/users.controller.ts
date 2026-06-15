import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('add')
  async CreateUser(@Body() createUser: CreateUser) {
    return await this.userService.createUser(createUser);
  }

  @Get('getAll')
  async GetAllUsers() {
    return await this.userService.getAllUsers();
  }
}
