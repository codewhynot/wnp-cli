//modules
const { resolve } = require('path');
const { readFile, writeFile } = require('fs');

//global services
const notify = require('../../../global-services/notify');

module.exports = ( params,callback ) => {
    if (params) {
        readFile(resolve(process.cwd(), 'package.json'), (err,data) => {
            let project = JSON.parse(data.toString());
            for (let key in params) {
                project[key] = params[key].toLowerCase();
            }
            let result = JSON.stringify(project);
            writeFile(resolve(process.cwd(), 'package.json'), result, (err) => {
                if (err) {
                    notify(err,'error');
                    throw err;
                } else {
                    notify(`Package successfully update`,'success');
                    callback(true);
                }
            });
        });
    } else {
        notify('Params is missing', 'error')
    }
};