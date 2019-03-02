#! /usr/bin/env node

//modules
const program = require('commander');

//services
const validateCommand = require('./global-services/validate-command');
const welcome = require('./global-services/welcome-info');

//commands
const init = require('./commands/init/program');
const help = require('./commands/help/program');
const addComponent = require('./commands/add-component/program');
const addPage = require('./commands/add-page/program');
const deploy = require('./commands/deploy/program');

//params
const commands = process.argv;
const command = process.argv.slice(2);

const makeProgram = data => {
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
        program
            .command(input)
            .action(() => {
                makeProgram(input);
            });
        program.parse(commands);
    } else {
        help();
    }
});




