//modules
const { mkdirSync } = require('fs');
const { resolve } = require('path');

//services
const notify = require('../services/notify');
const ask = require('../services/asker');
const check = require('../services/check');
const createComponent= require('../services/create-component');
const addImport = require('../services/add-import');

const makeProgramm = ( path, component ) => {
    mkdirSync(resolve(path,component), { recursive: true });
    createComponent(path,component,'.hbs','', () => {
        createComponent(path,component,'.scss','', () => {
            createComponent(path,component,'.js','', () => {
                addImport(component,path);
            });
        });
    });
};


const validateComponentName = callback => {
    check ('app/components', path  => {
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