import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './interceptor/user.interceptor';
import { RolesGuard } from './guards/auth.guard';

import { UserSchema, User } from './schema/user.model';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todo-list'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register User schema
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({
          filename: 'logs/info.log',
          level: 'info',
        }),
        new winston.transports.File({
          filename: 'logs/warn.log',
          level: 'warn',
        }),
      ],
    }),

    UsersModule,
    TodosModule,
    AuthModule,
  ],
  controllers: [AppController],
  exports: [MongooseModule], // export MongooseModule

  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
})
export class AppModule {}
