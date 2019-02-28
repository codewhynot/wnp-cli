//modules
const { readdir } = require('fs');
const { resolve } = require('path');

//services
const notify = require('./notify');

module.exports = callback => {
    readdir(resolve(process.cwd(), 'app', 'components'), (err, items) => {
        if (err || !items.length) {
            notify(err,'error');
        } else {
            callback(resolve(process.cwd(), 'app', 'components'));
        }
    });
};