const commands = require('../data/commands');

module.exports = () => {
    const commandsArray = commands.helpCommands;
    let res = [
        {
            header: 'Command list',
            content: commandsArray.map( val => {
                let command = val[Object.keys(val)];
                return {
                    name: `{bold ${command.name}}`,
                    summary: command.description
                }
            })
        }
    ];
    return res;
};