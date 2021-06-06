import * as mongoose from 'mongoose';
import { User } from '../user/user.interface';

export interface Conversation extends mongoose.Document {
  owner: User;
  participant: User;
}

export interface Message extends mongoose.Document {
  message: string;
  timestamp: Date;
  conversation: Conversation;
  createdBy: User;
}
