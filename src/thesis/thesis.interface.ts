import * as mongoose from 'mongoose';
import { User } from "../user/user.interface";

export interface Thesis extends mongoose.Document {
  title: string,
  description: string,
  status: string,
  is_billed: boolean,
  category: string,
  studentId: User,
  supervisorId: User
}