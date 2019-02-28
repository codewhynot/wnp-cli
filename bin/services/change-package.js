const { resolve } = require('path');
const { readFile, writeFile } = require('fs');
const notify = require('./notify');

module.exports = ( projectName,callback ) => {
    readFile(resolve(process.cwd(), 'package.json'), (err,data) => {
        let project = JSON.parse(data.toString());
        project.name = projectName.toLowerCase();
        let result = JSON.stringify(project);
        writeFile(resolve(process.cwd(), 'package.json'), result, (err) => {
            if (err) {
                notify(err,'error');
                throw err;
            } else {
                notify(`Project name id ${projectName}`,'success');
                callback(true);
            }
        });
    });
};