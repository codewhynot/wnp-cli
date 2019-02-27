const commands = require('../data/commands');

module.exports = (data,callback) => {
    let arrayForCheck = commands.commandsArray;
    if (data.length > 0 && data[0] !== undefined && arrayForCheck.includes(data[0])) {
        callback(true,data[0]);
    } else {
        callback(false,data[0])
    }
};