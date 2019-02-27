#! /usr/bin/env node
const programm = require('commander');
const figlet = require("figlet");
const chalk = require("chalk");
const commandLineUsage = require('command-line-usage');

//commands
const init = require('./commands/init');

const commands = [
    {
        header: 'Command List',
        content: [
            { name: '{bold help}', summary: 'Display help information about Whynotpack-cli.' },
            { name: '{bold init}', summary: 'Initializing Whynotpack in current direction' },
        ]
    }
]
const help = commandLineUsage(commands)


if (process.argv.slice(2).length <= 0) {
    console.log(chalk.cyan(
        figlet.textSync("whynotpack", {
            font: "standard",
            horizontalLayout: "default",
            verticalLayout: "default"
        })
    ));
    console.log(chalk.cyan('\n Welcome to WHYNOTPACK CLI'));
    console.log(chalk.cyan(help))
} else {
    console.log(chalk.yellow(
        figlet.textSync("whynotpack", {
            font: "standard",
            horizontalLayout: "default",
            verticalLayout: "default"
        })
    ));
    console.log(chalk.green('\n Welcome to WHYNOTPACK CLI'));
    programm
        .command('init')
        .action(() => {
            init();
        });
}


programm.parse(process.argv);


