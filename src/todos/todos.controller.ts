import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { User, UserInfo } from 'src/decorator/user.decorator';
import { Roles } from 'src/decorator/roles.decorator';

type Todo = {
  title: any;
  description: any;
  image: any;
  state: any;
  star: any;
  important: any;
  immediate: any;
  user: any;
};

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  @Roles('admin', 'user')
  async getTodos(@User() user: UserInfo) {
    const todos = await this.todosService.getTodos();
    console.log('user in getTodos controller', user);

    if (!todos) {
      return [];
    }
    return todos;
  }

  @Post()
  async addTodo(@Body() body: Todo) {
    console.log(body);

    const newTodo = await this.todosService.addTodo(body);

    return newTodo;
  }
}
