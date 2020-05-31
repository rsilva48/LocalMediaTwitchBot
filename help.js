//Import Settings from settings.js.
const set = require(process.cwd() + '/settings');
var helptext = ''
if (set.lang === 'en') {
    helptext = `${set.prefix}${set.playcmd} - Play files.
    ${set.prefix}${set.npcmd} - Show what\'s playing now.
    ${set.prefix}${set.queuecmd} - Show the list of files in queue.
    ${set.prefix}${set.creditscmd} - Show bot info.
    ${set.prefix}${set.helpmcmd} - Shows commands.
    ${set.prefix}${set.testcmd} - Change the test command.
    ${set.prefix}${set.stopcmd} - Stop receiving requests from ${set.prefix}${set.playcmd} command.
    ${set.prefix}${set.resumecmd} - Resume receiving request from ${set.prefix}${set.playcmd} command.
    ${set.prefix}${set.resetlimitcmd} - Reset request limit for users.
    ${set.prefix}${set.requestscmd} - See how many requests the user have used, and how many remains.`
}
else if (set.lang === 'es') {
    helptext = `${set.prefix}${set.playcmd} - Reproduce archivos.
    ${set.prefix}${set.npcmd} - Muestra que esta reproduciendose ahora.
    ${set.prefix}${set.queuecmd} - Muestra la lista de archivos en cola.
    ${set.prefix}${set.creditscmd} - Muestra informacion del bot.
    ${set.prefix}${set.helpmcmd} - Muestra los comandos.
    ${set.prefix}${set.testcmd} - Change the test command.
    ${set.prefix}${set.stopcmd} - Detiene las peticiones del comando ${set.prefix}${set.playcmd}.
    ${set.prefix}${set.resumecmd} - Resume las peticiones del comando ${set.prefix}${set.playcmd}.
    ${set.prefix}${set.resetlimitcmd} - Reinicia el limite de las peticiones para los usuarios.
    ${set.prefix}${set.requestscmd} - Muestra cuantas peticiones el usuario ha usado y cuantas le quedan.`
}
const help = helptext;
module.exports = helptext;