// vsource-backend-nest\src\app.module.ts
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppJwtModule } from './auth/jwt.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { LeadsModule } from './leads/leads.module';
import { BranchesModule } from './branches/branches.module';
import { CountriesModule } from './countries/countries.module';
import { IntakesModule } from './intakes/intakes.module';
import { LeadSourcesModule } from './lead-sources/lead-sources.module';
import { LeadDegreesModule } from './lead-degrees/lead-degrees.module';
import { LeadUniversitiesModule } from './lead-universities/lead-universities.module';
import { ModulesModule } from './modules/modules.module';
import { RolesModule } from './roles/roles.module';
import { MbbsLeadsModule } from './mbbs-leads/mbbs-leads.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    AppJwtModule,
    LeadsModule,
    BranchesModule,
    CountriesModule,
    IntakesModule,
    LeadSourcesModule,
    LeadDegreesModule,
    LeadUniversitiesModule,
    ModulesModule,
    RolesModule,
    MbbsLeadsModule,
  ],
  controllers: [AppController],

  providers: [AppService, AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/logout', method: RequestMethod.POST },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
