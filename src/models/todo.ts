import {Schema, Document, model} from 'mongoose';
import {ObjectID} from 'mongodb';

export interface Todo extends Document {
  content: string;
  completed: boolean;
  create_time: Date;
  update_time: Date;
}

const todoSchema = new Schema(
  {
    user_id: ObjectID,
    content: String,
    completed: Boolean,
    create_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now},
  },
  {versionKey: false}
);

todoSchema
  .virtual('createTime')
  .set(function (this: Todo, v: Date) {
    this.create_time = v;
  })
  .get(function (this: Todo) {
    return this.create_time.toLocaleString();
  });

todoSchema
  .virtual('updateTime')
  .set(function (this: Todo, v: Date) {
    this.update_time = v;
  })
  .get(function (this: Todo) {
    return this.update_time.toLocaleString();
  });

export default model<Todo>('Todo', todoSchema);
