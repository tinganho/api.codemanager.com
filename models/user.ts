
/// <reference path='../typings/mongoose/mongoose.d.ts'/>
/// <reference path='../typings/bcrypt/bcrypt.d.ts'/>

import {Schema, model, Document} from 'mongoose';
import * as bcrypt from 'bcrypt';
import cf from '../configs/server';
import {User} from './docs';

let UserSchema = new Schema({
   username: { type: String, required: true, index: { unique: true } },
   email: { type: String, required: true, index: { unique: true } },
   password: { type: String, required: true }
});

UserSchema.pre('save', function(next: any) {
    var user: User = this;
    if (!user.isModified('password')) return next();
 
    bcrypt.genSalt(cf.SALT_WORKER_VALUE, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword: string, callback: (err: Error, isMatch?: boolean) => void) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};


export default model<User>('User', UserSchema);