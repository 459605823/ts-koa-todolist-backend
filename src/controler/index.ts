import Todo from '../models/todo';
import User from '../models/user';
import { InvalidQueryError } from '../response';
import config from '../config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

export const login = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    throw new InvalidQueryError();
  }
  const res = await User.findOne({
    username,
  }).exec();
  if (!res) {
    ctx.msg = '用户不存在';
  } else if (!bcrypt.compareSync(password, res.password)) {
    ctx.msg = '密码错误';
  } else {
    ctx.result = jwt.sign(
      {
        username,
      },
      config.secret,
      { expiresIn: '1d' },
    );
  }
  return next();
};

export const register = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    throw new InvalidQueryError();
  }
  const res = await User.findOne({
    username,
  }).exec();
  if (res) {
    ctx.msg = '用户名已存在';
  } else {
    const hash = bcrypt.hashSync(password, 12);
    const result = await User.create({
      username,
      password: hash,
    });
    if (result) {
      ctx.result = jwt.sign(
        {
          username,
        },
        config.secret,
        { expiresIn: '1d' },
      );
    } else {
      ctx.msg = '注册失败';
    }
  }
  return next();
};
