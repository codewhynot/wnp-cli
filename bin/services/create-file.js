//modules
const { resolve } = require('path');
const { writeFile } = require('fs');

//services
const notify = require('./notify');

module.exports = ( path, component, type, content, callback ) => {
    writeFile(resolve(path,component,`${component + type}`), content, (err) => {
        if (err) {
            notify(err,'error');
            throw err;
        } else {
            notify(`File ${component+type} is created`, 'success');
            if (callback) callback();
        }
    });
};