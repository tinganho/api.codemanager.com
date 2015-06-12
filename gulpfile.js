/// <reference path="typings/node/node.d.ts"/>
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');

gulp.task('generate-diagnostics', function() {
    var json = require('./src/diagnostics.json');
    var errorText = 'export default {\n';
    var length = Object.keys(json).length;
    var index = 0;
    for (var error in json) {
        errorText += '    ' + 
            error.replace(/\s+/g, '_')
            .replace(/['"\.,]/g, '')
            .replace(/{(\d)}/g, '$1');

        errorText += ': {\n';
        errorText += '        message: \'' + error + '\',\n';
        errorText += '        status: ' + json[error].status + ',\n';
        errorText += '        code: ' + json[error].code + '\n';
        errorText += '    }';
        if (index < length - 1) {
            errorText += ',\n';
        }
        index++;
    }
    errorText += '\n';
    errorText += '}';
    fs.writeFileSync(path.join(__dirname, 'src/diagnostics.generated.ts'), errorText);
});

gulp.task('default', function () {
});
