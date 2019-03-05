//modules
const { readdir } = require('fs');
const { resolve } = require('path');

//global services
const notify = require('../../../services/notify');

module.exports = (folder,callback) => {
    readdir(resolve(process.cwd(), folder), (err, items) => {
        if (err || !items.length) {
            notify('Папка "components" не существует или пуста! \nВоспользутесь командой "wnp init" для инициализации проекта!','error');
            return false;
        } else {
            callback(resolve(process.cwd(), folder));
        }
    });
};