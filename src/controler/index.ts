import Todo from '../models/todo';
import User from '../models/user';
import {InvalidQueryError} from '../response';
import {SECRET, CLIENT_ID, CLIENT_SECRETS} from '../config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import {ObjectID} from 'mongodb';
import {Middleware} from 'koa';

export const getTodo: Middleware = async (ctx, next) => {
  const user_id = new ObjectID(ctx.userInfo.id);
  const res = await Todo.find({user_id}).sort({create_time: 'desc'}).exec();
  if (res) {
    ctx.result = res;
  } else {
    ctx.msg = '获取数据失败';
  }
  return next();
};

export const addTodo: Middleware = async (ctx, next) => {
  const user_id = new ObjectID(ctx.userInfo.id);
  const {content} = ctx.request.body;
  if (!content) {
    throw new InvalidQueryError();
  } else {
    const res = await Todo.create({
      user_id,
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

export const updateTodo: Middleware = async (ctx, next) => {
  const res = await Todo.findByIdAndUpdate(
    ctx.params.id,
    Object.assign(ctx.request.body, {updateTime: new Date()})
  ).exec();
  if (res) {
    ctx.result = res;
  } else {
    ctx.msg = '修改数据失败';
  }
  return next();
};

export const deleteTodo: Middleware = async (ctx, next) => {
  const res = await Todo.findByIdAndRemove(ctx.params.id).exec();
  if (res) {
    ctx.result = res;
  } else {
    ctx.msg = '删除数据失败';
  }
  return next();
};

export const login: Middleware = async (ctx, next) => {
  const {username, password} = ctx.request.body;
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
    ctx.result = {
      token: jwt.sign({username, id: res._id}, SECRET, {expiresIn: '1d'}),
      username,
    };
  }
  return next();
};

export const register: Middleware = async (ctx, next) => {
  const {username, password} = ctx.request.body;
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
          id: result._id,
        },
        SECRET,
        {expiresIn: '1d'}
      );
    } else {
      ctx.msg = '注册失败';
    }
  }
  return next();
};

export const getUserInfo: Middleware = async (ctx, next) => {
  ctx.result = {username: ctx.userInfo.username};
  return next();
};

export const githubLogin: Middleware = async (ctx, next) => {
  const token = ctx.query.code;
  const tokenResponse = await axios({
    method: 'post',
    url:
      'https://github.com/login/oauth/access_token?' +
      `client_id=${CLIENT_ID}&` +
      `client_secret=${CLIENT_SECRETS}&` +
      `code=${token}`,
    headers: {
      accept: 'application/json',
    },
  });
  const accessToken = tokenResponse.data.access_token;
  const user = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`,
    },
  });
  const res = await User.findOne({username: user.data.name}).exec();
  if (res) {
    ctx.result = {
      token: jwt.sign(
        {
          username: user.data.name,
          id: res._id,
        },
        SECRET,
        {expiresIn: '1d'}
      ),
      username: user.data.name,
    };
  } else {
    const result = await User.create({
      username: user.data.name,
    });
    ctx.result = {
      token: jwt.sign(
        {
          username: user.data.name,
          id: result._id,
        },
        SECRET,
        {expiresIn: '1d'}
      ),
      username: user.data.name,
    };
  }
  return next();
};
