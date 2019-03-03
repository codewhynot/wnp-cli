//modules
const { readdir } = require('fs');
const { resolve } = require('path');

//global services
const notify = require('../../../services/notify');

module.exports = (item,callback) => {
    readdir(resolve(process.cwd()), (err, items) => {
        if (items.includes(item)) {
            if (err) {
                notify(err,'error');
                return false;
            } else {
                callback();
            }
        } else {
            notify(`${item} is not found, please use "init" command`,'error');
            return false;
        }

    });
};