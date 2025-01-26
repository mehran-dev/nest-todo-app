import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from 'src/schema/todo.model';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  getTodos = async () => {
    return await this.todoModel.find({});
  };
  addTodo = async (todo) => {
    // TODO don't need to destruct this >>>
    return await this.todoModel.create({ ...todo });
  };
}
