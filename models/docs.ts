
/// <reference path='../typings/mongoose/mongoose.d.ts'/>

import {Document} from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string;
}
