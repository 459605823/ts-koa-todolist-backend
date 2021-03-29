import { Schema, Document, model } from 'mongoose';

export interface Todo extends Document {
  content: string;
  completed: boolean;
  create_time: Date;
  update_time: Date;
}

const todoSchema = new Schema(
  {
    content: String,
    completed: Boolean,
    create_time: { type: Date, default: Date.now },
    update_time: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

todoSchema
  .virtual('createTime')
  .set(function (this: any, v) {
    this.create_time = v;
  })
  .get(function (this: any) {
    return this.create_time.toLocaleString();
  });

todoSchema
  .virtual('updateTime')
  .set(function (this: any, v) {
    this.update_time = v;
  })
  .get(function (this: any) {
    return this.update_time.toLocaleString();
  });

export default model<Todo>('Todo', todoSchema);
