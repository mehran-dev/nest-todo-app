import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodosService } from './todos.service';

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
  async getTodos() {
    const todos = await this.todosService.getTodos();
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
