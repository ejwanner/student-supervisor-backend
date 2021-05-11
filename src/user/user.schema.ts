import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.interface';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: {
            unique: true,
        },
        required: true
    },
    password: {
        type: String,
        required: true
    },
    supervisor: {
        type: Boolean,
        required: true
    }

});

UserSchema.pre<User>('save', function(next){
    let user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {

        if(err) {
            return next(err)
        };

        bcrypt.hash(user.password, salt, (err, hash) => {

            if(err) {
                return next(err)
            };
            user.password = hash;
            next();
        });

    });

}); 

UserSchema.methods.comparePassword = function(attempt, callback){
    let user: User = this;

    bcrypt.compare(attempt, user.password, (err, isMatch) => {
        if(err) return callback(err);
        callback(null, isMatch);
    });

};