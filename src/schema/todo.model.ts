import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string; // URL or base64

  @Prop({ enum: ['done', 'pending', 'canceled'], default: 'pending' })
  state: string;

  @Prop({ default: false })
  star: boolean;

  @Prop({ default: false })
  important: boolean;

  @Prop({ default: false })
  immediate: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
