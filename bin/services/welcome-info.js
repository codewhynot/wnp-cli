const visual = require("chalk");


module.exports = data => {
  console.log(
      visual.cyan(
          "WHYNOTPACK"
      ),
      visual.cyan(data ? `\n\n Used command ${data} \n` : '\n\n Welcome to WHYNOTPACK-CLI \n'),
  )
};
