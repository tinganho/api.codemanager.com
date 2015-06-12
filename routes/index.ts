
/// <reference path='../typings/express/express.d.ts'/>

import publishHandler from './handlers/publish';
import installHandler from './handlers/install';
import {Application} from 'express';
import cf from '../configs/server';

export function route(p: string): string {
    return '/' + cf.API_VERSION + p;
}

export function install(app: Application) {
    app.post(route('/publish'), publishHandler);
    app.get(route('/install'), installHandler);
}