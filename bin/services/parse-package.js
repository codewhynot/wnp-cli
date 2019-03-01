const { resolve } = require('path');
const { readFile } = require('fs');
const notify = require('./notify');

module.exports = callback => {
    readFile(resolve(process.cwd(), 'package.json'), (err,data) => {
        if (data.toString() === '') {
            notify('Package is not found, please use "init" command','error');
        } else {
            if (err) {
                notify(err,'error');
            } else {
                let result = JSON.parse(data.toString());
                callback(result);
            }
        }
    });
};