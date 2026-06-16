// vsource-backend-nest\src\auth\auth.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET ?? 'change-this-secret';
const TOKEN_EXPIRES_IN = '3h';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(dto: LoginDto, response: Response) {
    const email = dto.email.toLowerCase().trim();

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = jwt.sign(
      {
        sub: user.id,
        roleId: user.roleId,
      },
      JWT_SECRET,
      {
        expiresIn: TOKEN_EXPIRES_IN,
      },
    );

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3 * 60 * 60 * 1000,
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async logout(response: Response) {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  // async register(dto: RegisterDto) {
  //   const email = dto.email.toLowerCase().trim();
  //   const existing = await this.usersService.findByEmail(email);
  //   if (existing) {
  //     throw new BadRequestException('User already exists');
  //   }

  //   const hashedPassword = await bcrypt.hash(dto.password, 10);
  //   const user = await this.usersService.createUser({
  //     name: dto.name,
  //     email: dto.email,
  //     password: hashedPassword,
  //     role: dto.role,
  //     branchId: dto.branchId,
  //   });

  //   return {
  //     id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     role: user.role,
  //   };
  // }
}
