
/// <reference path='typings/express/express.d.ts'/>
/// <reference path='typings/mongoose/mongoose.d.ts'/>

declare function require(name: string): any;
require('source-map-support').install();

import * as express from 'express';
import * as http from 'http';
import cf from './configs/server';
import * as mongoose from 'mongoose';
import * as routes from './routes/index';
import * as models from './models/index';

let app = express();
app.set('port', process.env.PORT || 3000);

mongoose.connect(process.env.MONGO_URI || cf.DEFAULT_DEV_MONGODB_SERVER, (err: any) => {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

routes.install(app);

let server = app.listen(app.get('port'), function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('api.codemanager.com is listening at http://%s:%s', host === '::' ? 'localhost' : host, port);
});

