import * as mongoose from 'mongoose';

export interface Category extends mongoose.Document {
  name: string;
}
