//modules
const { emptyDir } = require('fs-extra');
const { readdir } = require('fs');
const ora = require('ora');

//global services
const notify = require('../../../services/notify');
const ask = require('../../../services/asker');


//variables
const spinner = ora('Подождите, выполняется очистка папки');

module.exports = callback => {
    readdir(process.cwd(), (err,items) => {
        if (err) {
            notify(err,'error');
            return;
        } else {
            if (items.length <= 0) {
                if (callback) callback();
            } else {
                notify('Текущая папка не пуста!', 'error');
                ask('clean', answer => {
                    if (answer) {
                        spinner.start();
                        emptyDir(process.cwd(), err => {
                            if (err) {
                                spinner.stop();
                                notify(err, 'error');
                            } else {
                                spinner.stop();
                                if (callback) callback();
                            }
                        })
                    } else {
                        notify('До встречи!', 'success');
                    }
                });
            }
        }
    });
};