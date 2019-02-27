const inquirer = require('inquirer');
const download = require('download-git-repo');
const { resolve } = require('path');
const currentPath = process.cwd();
const shell = require('shelljs');
const chalk = require("chalk");
const { readFile, writeFile, readdir } = require('fs');
const { emptyDir } = require('fs-extra');
let projectName;

const checkFolder = (callback) => {
  readdir(currentPath, (err,items) => {
    if (err) {
      console.log(chalk.bold.red(err));
      return;
    } else {
      if (items.length <= 0) {
        callback();
      } else {
        console.log(chalk.bold.red('Folder is not empty'))
        asker({
          name: 'remove',
          type: 'confirm',
          message: 'Do you want to clean current folder?'
        }, answer => {
          if (answer.remove) {
            emptyDir(currentPath, err => {
              if (err) {
                console.log(chalk.bold.red(err))
              } else {
                callback();
              }
            })
          } else {
            console.log(chalk.bold.green('Ok, see you!'))
          }
        })
      }
    }

  });
};

const getProject = (callback) => {
  download('codewhynot/whynotpack', currentPath, function (err) {
    if (err) {
      console.log(chalk.bold.red(err))
    } else {
      callback();
    }
  });
};

const changePackage = (callback) => {
  let path = resolve(currentPath, 'package.json');
  readFile(path, function (err,data) {
    let result = data.toString();
    let jsonData = JSON.parse(result);
    jsonData.name = projectName;
    let output = JSON.stringify(jsonData);
    writeFile(path, output, (err) => {
      if (err) throw err;
    });
    callback();
  });
};

const asker = (questions, callback) => {
  const prompt = inquirer.createPromptModule();
  prompt(questions).then(data => {
    callback(data);
  })
}


module.exports = (args) => {
    asker ({
      name: 'name',
      type: 'input',
      message: 'Please enter your project name'
    }, project => {
      if (project.name !== '' ) {
        projectName = project.name;
        checkFolder ( () => {
          getProject(() => {
            changePackage( () => {
              asker({
                name: 'dependencies',
                type: 'confirm',
                message: 'Do uou want to install dependencies?'
              }, answers => {
                if (answers.dependencies) {
                  shell.exec('npm install');
                } else {
                  console.log(chalk.bold.green('Ok, see you ;)'));
                }
              })
            });
          })
        });
      } else {
        console.log(chalk.bold.red('please use a valid project name'));
      }
    });
};