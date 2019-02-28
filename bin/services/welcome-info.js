const visual = require("chalk");
const CFonts = require('cfonts');

module.exports = data => {
    CFonts.say('WHYNOTPACK!', {
        font: 'block',
        align: 'left',
        colors: ['yellow'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
    });

  console.log(
      visual.cyan(data ? ` Used command ${data} \n` : ' Welcome to WHYNOTPACK-CLI \n'),
  )
};
