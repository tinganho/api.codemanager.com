
/// <reference path='../typings/mongoose/mongoose.d.ts'/>

export * from './docs'

import User from './user';

import {Model, Document} from 'mongoose';
import cf from '../configs/server';
import {fail} from '../src/utils';

export const enum ModelKind {
    User
}

export function getList(kind: ModelKind): Model<Document> {
    switch (kind) {
        case ModelKind.User:
            return User;
    }

    fail(`Could not get collection`);
}