//modules
const { readFile, writeFile } = require('fs');
const { resolve } = require('path');

//services
const notify = require('../../../services/notify');

module.exports = ( path, component, callback ) => {
    readFile(resolve(process.cwd(), 'app/core/config/components/components.json'), (err,data) => {
        let result = data.toString();
        let parsed = JSON.parse(result);
        if (!parsed.components.includes(component)) {
            parsed.components.push(component);
            let content = JSON.stringify(parsed);
            writeFile(resolve(process.cwd(), 'app/core/config/components/components.json'), content, (err) => {
                if (err) {
                    notify(err,'error');
                    throw err;
                } else {
                    notify('Список компонентов успешно обновлен! :)','success');
                    if (callback) callback();
                }
            });
        } else {
            notify('Такой компонент уже существует!','error');
            return false;
        }
    })
};