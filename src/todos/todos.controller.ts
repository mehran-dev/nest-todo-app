import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { User, UserInfo } from 'src/decorator/user.decorator';
import { Roles } from 'src/decorator/roles.decorator';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserInterceptor } from 'src/interceptor/user.interceptor';

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

// @UseGuards(JwtStrategy)
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
  // @UseInterceptors(UserInterceptor)
  @Roles('user', 'admin')
  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() body: Partial<Todo>,
    @User() user: UserInfo,
  ) {
    console.log('QWERTYUIOP', user);

    const newTodo = await this.todosService.updateTodo(
      id,
      body,
      user.id.toString(),
    );

    return newTodo;
  }
}
