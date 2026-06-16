// vsource-backend-nest\src\auth\auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AppJwtModule } from './jwt.module';

@Module({
  imports: [UsersModule, AppJwtModule],

  controllers: [AuthController],

  providers: [AuthService, JwtAuthGuard],

  exports: [JwtAuthGuard],
})
export class AuthModule {}
