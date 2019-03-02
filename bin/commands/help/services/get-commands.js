const data = require('../data/commands');

module.exports = () => {
    const commandsArray = data.commands;
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