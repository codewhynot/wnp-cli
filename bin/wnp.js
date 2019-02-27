#! /usr/bin/env node

//modules
const programm = require('commander');

//services
const validateCommand = require('./services/validate-command');
const welcome = require('./services/welcome-info');

//commands
const init = require('./commands/init');
const help = require('./commands/help');
const addComponent = require('./commands/add-component');
const addPage = require('./commands/add-page');
const deploy = require('./commands/deploy');

//params
const commands = process.argv;
const command = process.argv.slice(2);

const makeProgramm = data => {
    switch (data) {
        case 'init':
            init(data);
            break;
        case 'help':
            help(data);
            break;
        case 'add-component':
            addComponent(data);
            break;
        case 'add-page':
            addPage(data);
            break;
        case 'deploy':
            deploy(data);
            break;
    }
};

validateCommand(command, ( success, input ) => {
    if ( success ) {
        welcome(input);
        programm
            .command(input)
            .action(() => {
                makeProgramm(input);
            });
        programm.parse(commands);
    } else {
        help();
    }
});




