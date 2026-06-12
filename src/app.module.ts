// vsource-backend-nest\src\app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { LeadsModule } from './leads/leads.module';
import { BranchesModule } from './branches/branches.module';
import { CountriesService } from './countries/countries.service';
import { CountriesController } from './countries/countries.controller';
import { CountriesModule } from './countries/countries.module';
import { IntakesService } from './intakes/intakes.service';
import { IntakesModule } from './intakes/intakes.module';
import { LeadSourcesController } from './lead-sources/lead-sources.controller';
import { LeadSourcesModule } from './lead-sources/lead-sources.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    LeadsModule,
    BranchesModule,
    CountriesModule,
    IntakesModule,
    LeadSourcesModule,
  ],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
