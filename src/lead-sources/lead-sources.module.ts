import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

import { LeadSourcesController } from './lead-sources.controller';
import { LeadSourcesService } from './lead-sources.service';

@Module({
  imports: [PrismaModule],
  controllers: [LeadSourcesController],
  providers: [LeadSourcesService],
})
export class LeadSourcesModule {}