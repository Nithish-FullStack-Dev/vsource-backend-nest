// src/auth/auth.controller.ts

import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Req() req: Request, @Body() credentials: LoginDto) {
    console.log('RAW BODY =>', req.body);
    console.log('DTO =>', credentials);

    return this.authService.login(credentials);
  }

  // @Post('register')
  // register(@Body() data: RegisterDto) {
  //   return this.authService.register(data);
  // }
}
