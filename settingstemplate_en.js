var set = {};
//Edit the configuration file and rename this file to settings.js if it have other name.

//Media settings
//Media player executable paths, only leave one of both uncommented. (Without "//" at the beggining of the line)
set.mp = "C:\\Program Files\\MPC-HC\\mpc-hc64.exe"; //Media Player Classic.
//set.mp = "C:\\Program Files\\DAUM\\PotPlayer\\PotPlayerMini64.exe"; //PotPlayer.

//Media directories. (Where the files are stored, put double backslash insted of one, backslash at the end is mandatory)
set.mdirs = ["C:\\Users\\Harunoki__48\\Videos\\", "C:\\Users\\Harunoki__48\\Music\\"];

//Bot settings
set.channelname = 'H48Bot'; //Twitch.tv channel name.
set.botUsername = 'H48Bot'; //Twitch bot account username.
set.oauthpass = 'oauth:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; //Generate oauth here: https://twitchapps.com/tmi/
set.chatOutput = true; //Enables or disable the bot output on the chat.
set.conOutput = true; //Enable or disables connection messages on chat.
set.ignorebot = true; //Enable or disables if the messages sent by the bot are ignored.
set.lang = 'en' //Sets help language. Can be en or es

//Commands
set.prefix = '!'; //Change the prefix for the commands, by defaut they start with !
set.playcmd = 'play'; //Command for playing files.
set.npcmd = 'np'; //Now playing command.
set.queuecmd = 'queue'; //Command for show list of files in queue.
set.creditscmd = 'info'; //Command that show bot info.
set.helpcmd = 'help'; //Comand that shows help.
set.testcmd = 'ping'; //Change the test command.
set.stopcmd = 'stop'; //Stop receiving requests from play command.
set.resumecmd = 'resume'; //Resume receiving request from play command.
set.resetrccmd = 'reset'; //Reset request counter.
set.requestscmd = 'requests'; //See how many requests the user have used, and how many remain.
set.rmvcmd = 'remove'; //Remove song from queue.
set.unlrq = 'unlimit'; //Unlimit how many requests a user can do.
set.lrq = 'limit'; //Limit how many requests a user can do.

//Personalization
set.testresponse = 'pong!'; //Change the message send as a response to the test command.
set.selfilesext = 'both'; //To select which files search, can be: both, audio, video.
set.rlimit = 3; //Set request limit per user.
set.csrh = "0"; //Set what message to be send to cancel a search.
//Set startup messages to be send when connected.
set.cnnmsg = [`Greetings, ${set.botUsername} is connected, created by @Harunoki__48.`, `To add a file to the queue use the command "${set.prefix}play" then the name of the file.`];
set.npmsg = 'Now Playing'; //Message to be send in queue for the now playing file.
set.nqmsg = 'Next in queue'; //Message to be send in queue for next the file in queue.
set.chatepmsg = 'you didn\'t specify what to play, try again.'; //Message to be send in chat when play command is sent empty.
set.eqmsg = 'There\'s nothing in the queue.'; //Empty queue message 
set.stopmsg = 'Requests have been disabled.'; //Message to be send when requests are disabled.
set.resumemsg = 'Requests have been reenabled.'; //Message to be send when request is reenabled.
set.chatsrchnf = 'no results found for'; //Message to be send in chat when no results were found to a play command.
set.atq = 'added to the queue:'; //Message to be send when a file was added to the queue.
set.chatrs = ["there\'s many results for", "Which one do you want to play? To cancel the search send"]; //Message to be send when there's a results selection.
set.chatcsrch = 'you have canceled your search.'; //Message to be send in chat when user cancel a search.
set.psmsg = 'you have a pending selection'; //Message to be send when there's a pending selection.
set.rmmsg = ['you have requested', 'times.', 'you have', 'requests left.', 'time', 'You have reached the limit.']; //Messages to be send when user ask for how many requests have been done.
set.nrqmsg = 'you haven\t done any requests.' //Message to be send when there's no request done by the user
set.rlimitrmsg = 'you have reached the requests limit.' //Message to be send when the user reached the requests limit.
set.resetrcmsg = 'Request counter have been reset.' //Message to be sent when requests counter is resetted.
set.ownnerrlmsg = 'You\'re the owner of the channel you don\'t have limits.' //Message to be send when the channel owner uses the request command.
set.botignmsg = 'Bot messages are being ignored.' //Message to be displayed in console when bot messages are being ignored.
set.ulusermsg = 'your requests have been unlimited.' //Message to be send when viewer use request command and owner unlimited number of requests for them.
set.lusermsg = 'your requests have been limited.' //Message to be send when owner limited number of requests for a viewer.
set.alusermsg = 'is already limited.' //Message to be send when owner tries to limit number of requests for a already limited viewer.
set.aulusermsg = 'is already unlimited.' //Message to be send when owner tries to limit number of requests for a already unlimited viewer.

//Debugging Settings
set.debugOutput = false; //Enables or disable the bot debug output on console.
set.decisionDebug = false; //Enables or disable the bot debug output on console related to the decisions when bot returns multiple results.
set.searchDebug = false; //Enables or disable the bot debug output on console related to the file search results.
set.conepmsg = 'sent play command empty.'; //Message to be displayed in console when play command is sent empty
set.consrchnf = 'didnt found results for'; //Message to be displayed in console when no results were found to a play command
set.conrs = ["searched", "with many results."]; //Message to be send when there's a results selection.
set.concsrch = 'canceled the search.'; //Message to be displayed in console when user cancel a search.
set.results = 'Results:'; //Message to be displayed on console when a user searches using play

module.exports = set;
