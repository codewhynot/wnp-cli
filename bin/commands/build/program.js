//modules
const { exec } = require('shelljs');
const ora = require('ora');

//global services
const notify = require('../../services/notify');

//variables
const spinner = ora('Building project');


module.exports = () => {
    spinner.start();
    exec('npm run build', () => {
       spinner.stop();
       notify('Project successfully built', 'success');
    });
};