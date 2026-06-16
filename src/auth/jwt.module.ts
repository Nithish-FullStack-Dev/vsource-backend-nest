import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

const JWT_SECRET = process.env.JWT_SECRET ?? 'change-this-secret';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '3h',
      },
    }),
  ],
  exports: [JwtModule],
})
export class AppJwtModule {}
