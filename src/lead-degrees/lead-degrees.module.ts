// vsource-backend-nest\src\lead-degrees\lead-degrees.module.ts
import { Module } from '@nestjs/common';
import { LeadDegreesService } from './lead-degrees.service';
import { DegreesController } from './lead-degrees.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DegreesController],
  providers: [LeadDegreesService],
})
export class LeadDegreesModule {}
