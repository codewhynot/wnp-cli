//modules
const { exec } = require('shelljs');
const ora = require('ora');

//global services
const notify = require('../../services/notify');

//variables
const spinner = ora('Starting server');


module.exports = () => {
    spinner.start();
    exec('npm run dev', () => {
        notify('Server started successfully', 'success');
    });
    setTimeout(() => {
        spinner.stop();
    }, 5000);
};