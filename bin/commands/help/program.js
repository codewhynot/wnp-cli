//modules
const commandLineUsage = require('command-line-usage');

//global services
const welcome = require('../../global-services/welcome-info');
const notify = require('../../global-services/notify');

//local services
const commands = require('./services/get-commands');


module.exports = data => {
    welcome(data);
    notify(commandLineUsage(commands()),'info');
};
