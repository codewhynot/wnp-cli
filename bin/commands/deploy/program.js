//modules
const program = require('gh-pages');
const ora = require('ora');

//global services
const notify = require('../../services/notify');
const ask = require('../../services/asker');

//local services
const updatePackage = require('./services/update-package');
const parsePackage = require('./services/parse-package');
const checkFolder = require('./services/check-folder');

//variables
const spinner = ora('Deploying project');

const repoAsker = callback => {
    ask('repository', repo => {
        let match = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(repo);
        if (match) {
            updatePackage({repository: repo}, () => {
                callback({repository: repo, deployBranch: 'gh-pages'});
            });
        } else {
            notify('Please enter valid url', 'error');
            repoAsker(callback);
            return false;
        }
    })
};

const makeProgramm = ( data,path,callback ) => {
    data.deployBranch = data.deployBranch ? data.deployBranch : 'gh-pages';
    if (data.repository) {
        spinner.start();
        program.publish(path, {
            branch: data.deployBranch,
            repo: data.repository
        }, response => {
            spinner.stop();
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