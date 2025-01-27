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
  updateTodo = async (id, body, userId: string) => {
    console.log(id);
    console.log(body);
    console.log(userId);

    try {
      const todo = await this.todoModel.findOne({ _id: id });
      console.log(todo);

      if (!todo) {
        throw new Error('Todo not found');
      }
      // Check if the logged-in user owns the todo
      if (todo.user.toString() !== userId.toString()) {
        console.log(todo.user, userId);
        throw new Error(
          "Unauthorized: You do not have permission to update this todo \n you don't have permission ",
        );
      }
      // Update the todo entity with the provided body
      const updatedTodo = await this.todoModel.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true }, // Return the updated document
      );

      if (!updatedTodo) {
        throw new Error('Failed to update the todo');
      }

      return updatedTodo;
    } catch (error) {
      console.error('Error updating todo:', error.message);
      throw new Error(error.message);
    }
  };
}
