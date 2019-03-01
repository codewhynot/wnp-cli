//modules
const { resolve } = require('path');
const { writeFile } = require('fs');

//services
const notify = require('./notify');

module.exports = ( path, page, type, content, callback ) => {
    writeFile(resolve(path,`${page + type}`), content, (err) => {
        if (err) {
            notify(err,'error');
            throw err;
        } else {
            notify(`File ${page+type} is created`, 'success');
            if (callback) callback();
        }
    });
};