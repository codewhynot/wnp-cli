const visual = require("chalk");
const letters = require("figlet");

module.exports = data => {
  console.log(
      visual.cyan(
          letters.textSync("whynotpack", {
              font: "Standart",
              horizontalLayout: "default",
              verticalLayout: "default"
          })
      ),
      visual.cyan(data ? `\n\n Used command ${data} \n` : '\n\n Welcome to WHYNOTPACK-CLI \n'),
  )
};
