//modules
const color = require("chalk");


module.exports = ( text, type) => {
  switch (type) {
    case 'error':
      console.log(color.red(`\n ${text} \n`));
      break;
    case 'success':
      console.log(color.green(`\n ${text} \n`));
      break;
    case 'info':
      console.log(color.cyan(`\n ${text} \n`));
  }
};