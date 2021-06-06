import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    index: {
      unique: true,
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  supervisor: {
    type: Boolean,
    required: true,
  },
  preferredCategory: {
    type: String,
    required: true,
  },
});
