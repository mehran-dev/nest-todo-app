import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo, TodoSchema } from 'src/schema/todo.model';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from 'src/interceptor/user.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  providers: [
    TodosService,

    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
  controllers: [TodosController],
})
export class TodosModule {}
