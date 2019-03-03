//modules
const { mkdirSync } = require('fs');
const { resolve } = require('path');

//global services
const notify = require('../../services/notify');
const ask = require('../../services/asker');

//local services
const checkFolder = require('./services/check-folder');
const createComponent = require('./services/create-component');
const updateImports = require('./services/update-imports');
const updateComponent = require('./services/update-components');


const makeProgramm = ( path, component ) => {
    updateComponent(path, component, () => {
        mkdirSync(resolve(path,component), { recursive: true });
        createComponent(path,component,'.hbs','', () => {
            createComponent(path,component,'.scss','', () => {
                createComponent(path,component,'.js','', () => {
                    updateImports(component,path);
                });
            });
        });
    });
};


const validateComponentName = callback => {
    checkFolder ('app/components', path  => {
        ask('component', component => {
            let match = /^[a-zA-Z_]+$/.test(component);
            if (match) {
                callback( path,component );
            } else {
                notify('Please use a valid component name', 'error');
                validateComponentName(callback);
                return;
            }
        });
    });
};


module.exports = () => {
    validateComponentName( ( path, component ) => {
        makeProgramm(path, component);
    });
};