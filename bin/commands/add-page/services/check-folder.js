//modules
const { readdir } = require('fs');
const { resolve } = require('path');

//global services
const notify = require('../../../services/notify');

module.exports = (folder,callback) => {
    readdir(resolve(process.cwd(), folder), (err, items) => {
        if (err || !items.length) {
            notify('Folder is not found or empty','error');
            return false;
        } else {
            callback(resolve(process.cwd(), folder));
        }
    });
};