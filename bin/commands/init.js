//modules
const shell = require('shelljs');

//services
const checkFolder = require('../services/check-folder');
const changePackage = require('../services/change-package');
const getProjects = require('../services/get-projects');
const ask = require('../services/asker');
const notify = require('../services/notify');



const initProject = project => {
  checkFolder ( () => {
    getProjects(() => {
      changePackage( project, success => {
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
  });
};

const validateProject = callback => {
  ask('init', project => {
    let match = /^[a-zA-Z]+$/.test(project);
    if (match) {
      callback(project);
    } else {
      notify('Please use a valid project name', 'error');
      validateProject(callback);
      return;
    }
  });
};


module.exports = (args) => {
  validateProject( project => {
    initProject (project);
  });
};