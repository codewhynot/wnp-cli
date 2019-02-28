const download = require('download-git-repo');
const notify = require('./notify');

module.exports = callback => {
    download('codewhynot/whynotpack', process.cwd(),  err => {
        if (err) {
            notify(err, 'error');
        } else {
            callback();
        }
    });
};