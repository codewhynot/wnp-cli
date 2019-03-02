const data = require('../data/commands');

module.exports = (command,callback) => {
    let arrayForCheck = data.commands;
    if (command.length > 0 && command[0] !== undefined && arrayForCheck.includes(command[0])) {
        callback(true,command[0]);
    } else {
        callback(false,command[0])
    }
};