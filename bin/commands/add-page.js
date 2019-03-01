//services
const notify = require('../services/notify');
const ask = require('../services/asker');
const check = require('../services/check');
const createPage = require('../services/create-page');
const getLayout = require('../services/get-layout');
const updatePageList = require('../services/save-page');

const makeProgramm = ( path, page ) => {
    getLayout (path, layout => {
        updatePageList(path, page, () => {
            createPage(path, page,'.hbs',layout);
        });
    });

};

const validatePageName = callback => {
    check ('app/pages',path  => {
        ask('page', page => {
            let match = /^[a-zA-Z_]+$/.test(page);
            if (match) {
                callback( path,page );
            } else {
                notify('Please use a valid page name', 'error');
                validatePageName(callback);
                return;
            }
        });
    });
};


module.exports = () => {
    validatePageName( ( path, page ) => {
        makeProgramm(path, page);
    });
};