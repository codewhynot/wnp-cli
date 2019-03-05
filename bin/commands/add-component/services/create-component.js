//modules
const { resolve } = require('path');
const { writeFile } = require('fs');

//global services
const notify = require('../../../services/notify');

module.exports = ( path, component, type, content, callback ) => {
    writeFile(resolve(path,component,`${component + type}`), content, (err) => {
        if (err) {
            notify(err,'error');
            throw err;
        } else {
            notify(`Файл ${component+type} успешно создан`, 'success');
            if (callback) callback();
        }
    });
};