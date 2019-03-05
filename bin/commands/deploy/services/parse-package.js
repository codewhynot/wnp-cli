//modules
const { resolve } = require('path');
const { readFile } = require('fs');

//global services
const notify = require('../../../services/notify');

//local services
const check = require('./check-package');

module.exports = callback => {
    check('package.json', () => {
        readFile(resolve(process.cwd(), 'package.json'), (err,data) => {
            if (data.toString() === '') {
                notify('Файл package.json не найден, или пуст. \nВоспользуйтесь командой "wnp init", для инициализации проекта!','error');
            } else {
                if (err) {
                    notify(err,'error');
                } else {
                    let result = JSON.parse(data.toString());
                    callback(result);
                }
            }
        });
    });
};