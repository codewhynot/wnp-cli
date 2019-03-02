const inquirer = require('inquirer');
const questions = require('../data/questions');

module.exports = ( question, callback ) => {
    let getQuestion = questions[question];
    const prompt = inquirer.createPromptModule();
    prompt( getQuestion ).then( answer => {
        callback( answer.result );
    })
};