//modules
const { readFile, writeFile } = require('fs');
const { resolve } = require('path');

//services
const notify = require('../../../services/notify');

module.exports = ( path, page, callback ) => {
    readFile(resolve(process.cwd(), 'app/core/config/pages/pagelist.json'), (err,data) => {
        let result = data.toString();
        let parsed = JSON.parse(result);
        if (!parsed.pages.includes(page)) {
            parsed.pages.push(page);
            let content = JSON.stringify(parsed);
            writeFile(resolve(process.cwd(), 'app/core/config/pages/pagelist.json'), content, (err) => {
                if (err) {
                    notify(err,'error');
                    throw err;
                } else {
                    notify('Список страниц успешно обновлен! :)','success');
                    if (callback) callback();
                }
            });
        } else {
            notify('Такая страница уже существует, попробуйте еще раз!','error');
            return false;
        }
    })
};