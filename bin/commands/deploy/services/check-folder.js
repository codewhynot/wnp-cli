//modules
const { readdir } = require('fs');
const { resolve } = require('path');
const { exec } = require('shelljs');
const ora = require('ora');

//global services
const notify = require('../../../services/notify');
const ask = require('../../../services/asker');

//variables
const spinner = ora('Подождите, выполняется сборка проекта');

module.exports = (item,callback) => {
    readdir(resolve(process.cwd()), (err, items) => {
        if (items.includes(item)) {
            if (err) {
                notify(err,'error');
                return false;
            } else {
                callback(resolve(process.cwd(), 'build'));
            }
        } else {
            notify('Папка "build" не найдена', 'error');
            ask('build', answer => {
               if (answer) {
                   spinner.start();
                   exec('npm run build', () => {
                       spinner.stop();
                       notify('Проект успешно собран', 'success');
                       callback(resolve(process.cwd(), 'build'));
                   })
               }
            });
        }
    });
};