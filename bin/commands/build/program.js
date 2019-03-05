//modules
const { exec } = require('shelljs');
const ora = require('ora');

//global services
const notify = require('../../services/notify');

//variables
const spinner = ora('Подождите, выполняется сборка проекта');


module.exports = () => {
    spinner.start();
    exec('npm run build', () => {
       spinner.stop();
       notify('Проект успешно собран', 'success');
    });
};