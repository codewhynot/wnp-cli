//modules
const download = require('download-git-repo');

//global services
const notify = require('../../../global-services/notify');

module.exports = callback => {
    download('codewhynot/whynotpack', process.cwd(),  err => {
        if (err) {
            notify(err, 'error');
        } else {
            callback();
        }
    });
};