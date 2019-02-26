#! /usr/bin/env node
const programm = require('commander');
const init = require('./commands/init');

programm
    .command('init')
    .action(() => {
        init();
    });

programm.parse(process.argv);