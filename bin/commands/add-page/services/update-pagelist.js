//modules
const { readFile, writeFile } = require('fs');
const { resolve } = require('path');

//services
const notify = require('../../../services/notify');

module.exports = ( path, page, callback ) => {
    readFile(resolve(path, 'app/core/pages/pagelist.json'), (err,data) => {
        let result = data.toString();
        let parsed = JSON.parse(result);
        if (!parsed.pages.includes(page)) {
            parsed.pages.push(page);
            let content = JSON.stringify(parsed);
            writeFile(resolve(path, 'app/core/pages/pagelist.json'), content, (err) => {
                if (err) {
                    notify(err,'error');
                    throw err;
                } else {
                    notify('Pagelist successfully updated','success');
                    if (callback) callback();
                }
            });
        } else {
            notify('This page is already registered.','error');
            return false;
        }
    })
};