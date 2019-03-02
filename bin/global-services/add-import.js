//modules
const { readFile,writeFile } = require('fs');
const { resolve } = require('path');

//services
const notify = require('./notify');

module.exports = ( component, path ) => {
    const importPath = resolve(path, 'components.scss');
    readFile(importPath, (err,data) => {
        if (err) {
            notify(err,'error');
            return false;
        } else {
            let response = data.toString();
            let newLine = response.length > 0 ? '\n' : '';
            let content = `@import "${component}/${component}";`;
            let result = response + newLine + content;
            writeFile(importPath,result, err => {
                if (err) {
                    notify(err,'error');
                    throw err;
                } else {
                    notify('@import successfully added','success');
                }
            });
        }
    });
};