// vsource-backend-nest\src\lead-universities\lead-universities.module.ts
import { Module } from '@nestjs/common';
import { LeadUniversitiesService } from './lead-universities.service';
import { UniversitiesController } from './lead-universities.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UniversitiesController],
  providers: [LeadUniversitiesService],
})
export class LeadUniversitiesModule {}
