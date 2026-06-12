// vsource-backend-nest\src\auth\auth.service.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from '../generated/prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const JWT_SECRET = process.env.JWT_SECRET ?? 'change-this-secret';
const TOKEN_EXPIRES_IN = '3h';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(dto: LoginDto) {
    console.log('LOGIN DTO:', dto);

    if (!dto) {
      throw new BadRequestException('DTO is undefined');
    }

    if (!dto.email) {
      throw new BadRequestException('Email is missing');
    }

    if (!dto.password) {
      throw new BadRequestException('Password is missing');
    }

    const email = dto.email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roles = user.userRoles.map((ur) => ur.role.name);

    const accessToken = jwt.sign({ sub: user.id, roles }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles,
      },
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
