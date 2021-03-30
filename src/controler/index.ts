import Todo from '../models/todo';
import { InvalidQueryError } from '../response';

export const getTodo = async (ctx, next) => {
  const res = await Todo.find().sort({ create_time: 'desc' }).exec();
  if (res) {
    ctx.result = res;
  } else {
    ctx.msg = '获取数据失败';
  }
  return next();
};

export const addTodo = async (ctx, next) => {
  const { content } = ctx.request.body;
  if (!content) {
    throw new InvalidQueryError();
  } else {
    const res = await Todo.create({
      content,
      completed: false,
      createTime: new Date(),
    });
    if (res) {
      ctx.result = res;
    } else {
      ctx.msg = '添加数据失败';
    }
  }
  return next();
};

export const updateTodo = async (ctx, next) => {
  const res = await Todo.findByIdAndUpdate(
    ctx.params.id,
    Object.assign(ctx.request.body, { updateTime: new Date() }),
  ).exec();
  if (res) {
    ctx.result = res;
  } else {
    ctx.msg = '修改数据失败';
  }
  return next();
};

export const deleteTodo = async (ctx, next) => {
  const res = await Todo.findByIdAndRemove(ctx.params.id).exec();
  if (res) {
    ctx.result = res;
  } else {
    ctx.msg = '删除数据失败';
  }
  return next();
};
