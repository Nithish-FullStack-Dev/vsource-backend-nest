import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async CreateUser(@Body() createUser: CreateUser) {
    return await this.userService.createUser(createUser);
  }
}
