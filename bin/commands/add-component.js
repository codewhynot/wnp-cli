//modules
const { mkdirSync,writeFile,readFile } = require('fs');
const { resolve } = require('path');

//services
const welcome = require('../services/welcome-info');
const notify = require('../services/notify');
const ask = require('../services/asker');
const check = require('../services/check-components');
const create= require('../services/create-file');

const makeProgramm = component => {
    check( path => {
        mkdirSync(resolve(path,component), { recursive: true });
        create(path,component,'.hbs','', () => {
            create(path,component,'.scss','', () => {
                create(path,component,'.js','',)
            })
        })
    });
};


const validateComponentName = callback => {
  ask('component', component => {
      let match = /^[a-zA-Z_]+$/.test(component);
      if (match) {
          callback(component);
      } else {
        notify('Please use a valid component name', 'error');
        validateComponentName(callback);
        return;
      }
  })
};


module.exports = data => {
    // validateComponentName( component => {
    //     makeProgramm(component);
    // });

    notify('Coming soon', 'info');
};