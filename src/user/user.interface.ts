import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  supervisor: boolean;
  preferredCategory: string;
}
