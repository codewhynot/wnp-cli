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
const spinner = ora('Installing dependencies');



const initProject = project => {
  downloadProject(() => {
    updatePackage( {name: project}, success => {
      if(success) {
        spinner.start();
        shell.exec('npm install', () => {
          spinner.stop();
          notify('Whynotpack is ready to work', 'success');
          notify('Use "wnp dev" to start server', 'info');
          notify('Enjoy!','success');
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
        notify('Please use a valid project name', 'error');
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