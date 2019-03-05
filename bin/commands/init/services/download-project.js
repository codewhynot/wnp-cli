//modules
const { copy } = require('fs-extra');
const { resolve } = require('path');

//global services
const notify = require('../../../services/notify');


module.exports = callback => {
    copy(resolve(__dirname, '../../../project'), process.cwd(), function (err) {
        if (err) {
            notify(err,'error')
        } else {
            notify('Проект успешно создан! ;)');
            callback();
        }
    });
};