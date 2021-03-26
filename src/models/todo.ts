import Mongoose from 'mongoose';

const todoSchema = new Mongoose.Schema({
  id: Number,
  title: String,
  completed: Boolean,
});
