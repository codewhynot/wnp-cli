//modules
const { exec } = require('shelljs');
const ora = require('ora');

//global services
const notify = require('../../services/notify');

//variables
const spinner = ora('Запуск сервера');


module.exports = () => {
    spinner.start();
    exec('npm run dev', () => {
        notify('Сервер успешно запущен! ;)', 'success');
    });
    setTimeout(() => {
        spinner.stop();
    }, 5000);
};