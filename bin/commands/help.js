const getCommands = require('../services/generate-commands');
const commandLineUsage = require('command-line-usage');
const welcome = require('../services/welcome-info');
const visual = require("chalk");

module.exports = data => {
    welcome(data);
    console.log(
        visual.cyan(
            commandLineUsage(getCommands())
        )
    )
};
