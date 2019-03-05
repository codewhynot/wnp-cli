const visual = require("chalk");
const CFonts = require('cfonts');

module.exports = data => {
    CFonts.say('\nWNP', {
        font: 'block',
        align: 'left',
        colors: ['yellow'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 0.5,
        space: false,
        maxLength: '0',
    });

  console.log(
      visual.cyan(data ? `\n Команда ${data} \n` : '\n Добро пожаловать в WHYNOTPACK-CLI \n'),
  )
};
