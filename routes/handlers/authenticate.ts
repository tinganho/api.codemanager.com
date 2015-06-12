
/// <reference path='../../typings/express/express.d.ts'/>

import {Request, Response} from 'express';
import {Model, Query} from 'mongoose';
import {getList, ModelKind, User} from '../../models/index';
import {assert, httpError, httpSuccess, httpInternalServerError} from '../../src/utils';
import Diagnostics from '../../src/diagnostics.generated';

export default function(req: Request, res: Response) {
    let {username, email, password} = req.body;
    let userList = <Model<User>>getList(ModelKind.User);

    if (!password) {
        return httpError(res, Diagnostics.Missing_argument_0, 'password');
    }
    if (!email && !username) {
        return httpError(res, Diagnostics.Missing_arguments_0_and_1, 'email', 'password');
    }

    let query: Query<User[]>;
    if (username) {
        query = userList.find({ username: username });
    }
    else {
        query = userList.find({ email: email });
    }

    query.select('password').exec((err, foundUsers) => {
        if (err) return httpInternalServerError(res);
        assert(foundUsers.length === 1, 'Found more than 1 user.');
        if (foundUsers[0].password === password) {
            httpSuccess(res, {
                
            });
        }
        else {
            httpError(res, Diagnostics.Could_not_find_any_user_with_the_username_email_and_password_combination);
        }
    });
}