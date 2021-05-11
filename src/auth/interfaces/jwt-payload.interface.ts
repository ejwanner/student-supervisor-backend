import * as mongoose from 'mongoose';

export interface JwtPayload extends mongoose.Document{
    email: string;
}