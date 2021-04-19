import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema({
  username: String,
  password: String,
});

export default model<User>('User', userSchema);
