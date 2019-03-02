//modules
const program = require('gh-pages');

//global services
const notify = require('../../services/notify');
const ask = require('../../services/asker');

//local services
const updatePackage = require('./services/update-package');
const parsePackage = require('./services/parse-package');
const checkFolder = require('./services/check-folder');


const repoAsker = callback => {
    ask('repository', repo => {
        let match = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(repo);
        if (match) {
            updatePackage({repository: repo}, () => {
                ask('branch', branch => {
                    let match = /^[a-zA-Z_-]+$/.test(branch);
                    if (match) {
                        updatePackage({deployBranch: branch}, () => {
                            callback({repository: repo, deployBranch: branch });
                        });
                    } else {
                        notify('Please enter valid branch', 'error');
                        repoAsker(callback);
                        return false;
                    }
                })
            });
        } else {
            notify('Please enter valid url', 'error');
            repoAsker(callback);
            return false;
        }
    })
};

const makeProgramm = ( data,path,callback ) => {
    if (data.repository && data.deployBranch) {
        program.publish(path, {
            branch: data.deployBranch,
            repo: data.repository
        }, response => {
            if (response) {
                notify("Process error, this repository doesn't exist.", 'error');
                repoAsker(response => {
                    makeProgramm(response,path,callback);
                })
            } else {
                callback(data);
            }
        });
    } else {
        repoAsker(response => {
            makeProgramm(response,path,callback);
        })
    }
};


const validationPackage = callback => {
    parsePackage(data => {
        checkFolder('build', path => {
            callback(data,path);
        });
    })
};


module.exports = () => {
    validationPackage((data,path) => {
        makeProgramm(data, path, (response) => {
            notify(`Your project is published!\n branch: ${response.deployBranch}\n repository: ${response.repository}`, 'success');
        })
    });
};