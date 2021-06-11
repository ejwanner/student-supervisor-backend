import * as mongoose from 'mongoose';

export const ThesisSchema = new mongoose.Schema({
  title: {
    type: String,
    index: {
      unique: true,
    },
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  is_billed: {
    type: Boolean
  },
  category: {
    type: String,
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  supervisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  secondSupervisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});