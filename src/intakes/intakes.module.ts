import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

import { IntakesController } from './intakes.controller';
import { IntakesService } from './intakes.service';

@Module({
  imports: [PrismaModule],
  controllers: [IntakesController],
  providers: [IntakesService],
})
export class IntakesModule {}
