//modules
const shell = require('shelljs');

//global services
const ask = require('../../services/asker');
const notify = require('../../services/notify');
const ora = require('ora');

//local services
const checkFolder = require('./services/check-folder');
const updatePackage = require('./services/update-package');
const downloadProject = require('./services/download-project');

//variables
const spinner = ora('Подождите, выполняется установка зависимостей');



const initProject = project => {
  downloadProject(() => {
    updatePackage( {name: project}, success => {
      if(success) {
        spinner.start();
        shell.exec('npm install', () => {
          spinner.stop();
          notify('Whynotpack готов к работе', 'success');
          notify('Выполните комманду "wnp dev" для запуска сервера', 'info');
          notify('Наслаждайтесь! ;)','success');
        });
      }
    });
  })
};

const validateProject = callback => {
  checkFolder ( () => {
    ask('init', project => {
      let match = /^[a-zA-Z]+$/.test(project);
      if (match) {
        callback(project);
      } else {
        notify('Пожалуйста, введите корректное название проекта!', 'error');
        validateProject(callback);
        return false;
      }
    });
  });
};


module.exports = () => {
  validateProject( project => {
    initProject (project);
  });
};