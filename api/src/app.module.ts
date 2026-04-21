import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { HealthModule } from './modules/health/health.module';
import { validate } from './config/env.validation';
import { MailModule } from './mail/mail.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    ThrottlerModule.forRoot([{
      ttl: 60000,  // 1 minuto en ms
      limit: 100,  // 100 requests por ventana
    }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    TicketsModule,
    HealthModule,
    MailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, //aplica a TODOS los endpoints automáticamente
    },
  ],
})
export class AppModule { }
