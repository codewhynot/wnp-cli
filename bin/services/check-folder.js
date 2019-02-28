const { emptyDir } = require('fs-extra');
const { readdir } = require('fs');

const notify = require('./notify');
const ask = require('./asker');

module.exports = callback => {
    readdir(process.cwd(), (err,items) => {
        if (err) {
            notify(err,'error');
            return;
        } else {
            if (items.length <= 0) {
                if (callback) callback();
            } else {
                notify('Folder is not empty', 'error');
                ask('clean', answer => {
                    if (answer) {
                        emptyDir(process.cwd(), err => {
                            if (err) {
                                notify(err, 'error');
                            } else {
                                if (callback) callback();
                            }
                        })
                    } else {
                        notify('Ok, enjoy your work!', 'success');
                    }
                });
            }
        }
    });
};