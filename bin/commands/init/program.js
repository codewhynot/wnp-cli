//modules
const shell = require('shelljs');

//global services
const ask = require('../../global-services/asker');
const notify = require('../../global-services/notify');

//local services
const checkFolder = require('./services/check-folder');
const updatePackage = require('./services/update-package');
const downloadProject = require('./services/download-project');




const initProject = project => {
  downloadProject(() => {
    updatePackage( {name: project}, success => {
      if(success) {
        ask('dep', answer => {
          if (answer) {
            shell.exec('npm install');
          } else {
            notify('Enjoy your work! ;)', 'success');
          }
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