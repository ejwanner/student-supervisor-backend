import * as mongoose from 'mongoose';

export const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
