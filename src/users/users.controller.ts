import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('add')
  async CreateUser(@Body() createUser: CreateUser) {
    return await this.userService.createUser(createUser);
  }

  @Get('getAll')
  async GetAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async GetUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async UpdateUser(
    @Param('id') id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async DeleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
