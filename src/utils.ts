
/// <reference path='../typings/express/express.d.ts'/>

import {Response} from 'express';
import Diagnostics from './diagnostics.generated';

export function assert(expression: boolean, message?: string, verboseDebugInfo?: () => string): void {
    if (!expression) {
        let verboseDebugString = '';
        if (verboseDebugInfo) {
            verboseDebugString = '\nVerbose Debug Information: ' + verboseDebugInfo();
        }

        throw new Error('Debug Failure. False expression: ' + (message || '') + verboseDebugString);
    }
}

export function fail(message?: string): void {
    assert(false, message);
}

export interface Diagnostic {
    status: number;
    code: number;
    message: string;
}

export function httpError(res: Response, diagnostic: Diagnostic, ...args: string[]): void {
    let message = diagnostic.message;

    for (let i = 0; i < args.length; i++) {
        message = message.replace(`{${i}}`, args[1]);
    }

    res.status(diagnostic.status || 200).json({
        code: diagnostic.code,
        message
    });
}

export function httpSuccess(res: Response, data?: Object) {
    res.status(200).json({
        code: 1000,
        message: Diagnostics.Request_successful.message,
        data
    });
}

export function httpInternalServerError(res: Response) {
    res.status(500).json({
        code: Diagnostics.Internal_server_error.code,
        message: Diagnostics.Request_successful.message
    });
}