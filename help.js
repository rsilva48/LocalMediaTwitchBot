//Import Settings from settings.js.
const set = require(process.cwd() + '/settings');

const helptext = `${set.prefix}${set.playcmd} - Command for playing files.
${set.prefix}${set.npcmd} - Now playing command.
${set.prefix}${set.queuecmd} - Command for show list of files in queue.
${set.prefix}${set.creditscmd} - Command that show bot info.
${set.prefix}${set.helpmcmd} - Comand that shows help.
${set.prefix}${set.testcmd} - Change the test command.
${set.prefix}${set.stopcmd} - Stop receiving requests from play command.
${set.prefix}${set.resumecmd} - Resume receiving request from play command.
${set.prefix}${set.resetlimitcmd} - Reset request limit counter.
${set.prefix}${set.requestscmd} - See how many requests the user have used, and how many remain.`

module.exports = helptext;