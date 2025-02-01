import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { User, UserInfo } from 'src/decorator/user.decorator';
import { Roles } from 'src/decorator/roles.decorator';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

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
  constructor(
    private todosService: TodosService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  @Roles('admin', 'user')
  async getTodos(@User() user: UserInfo) {
    const todos = await this.todosService.getTodos();
    this.logger.log('info', user);
    if (!todos) {
      return [];
    }
    return todos;
  }

  @Post()
  async addTodo(@Body() body: Todo) {
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
    const newTodo = await this.todosService.updateTodo(
      id,
      body,
      user.id.toString(),
    );

    return newTodo;
  }
}
