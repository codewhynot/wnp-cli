//modules
const { resolve } = require('path');
const { writeFile } = require('fs');

//global services
const notify = require('../../../services/notify');

module.exports = ( path, page, type, content, callback ) => {
    writeFile(resolve(path,`${page + type}`), content, (err) => {
        if (err) {
            notify(err,'error');
            throw err;
        } else {
            notify(`Файл ${page+type} успешно создан! :)`, 'success');
            if (callback) callback();
        }
    });
};