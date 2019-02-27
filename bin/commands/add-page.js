const welcome = require('../services/welcome-info');
const visual = require('chalk');
module.exports = data => {
    welcome(data);
    console.log(visual.cyan('\n Add page coming soon \n'));
};