import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS' || req.path.startsWith('/auth')) {
      return next();
    }

    const token =
      req.cookies?.access_token ||
      (typeof req.headers['authorization'] === 'string'
        ? req.headers['authorization'].replace(/^Bearer\s+/i, '')
        : undefined);

    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Authentication required',
      });
    }

    try {
      const payload = this.jwtService.verify(token);
      (req as any).user = payload;
      return next();
    } catch (error) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Invalid token',
      });
    }
  }
}
