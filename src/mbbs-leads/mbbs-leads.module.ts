import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MbbsLeadsController } from './mbbs-leads.controller';
import { MbbsLeadsService } from './mbbs-leads.service';

@Module({
  imports: [PrismaModule],
  controllers: [MbbsLeadsController],
  providers: [MbbsLeadsService],
})
export class MbbsLeadsModule {}