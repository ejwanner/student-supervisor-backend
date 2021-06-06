import * as mongoose from 'mongoose';

export interface Status extends mongoose.Document {
  name: string;
}
