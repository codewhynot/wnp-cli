//modules
const { readFile } = require('fs');
const { resolve } = require('path');

module.exports = ( path, callback ) => {
    readFile(resolve(path, 'layouts','layout.hbs'), function (err,data) {
        let result = data.toString();
        callback( result );
    });
};
