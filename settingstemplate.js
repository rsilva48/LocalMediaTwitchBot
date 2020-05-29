var set={};
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
set.oauthpass = 'oauth:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; //Generate oauthpass here: https://twitchapps.com/tmi/
set.chatOutput = true; //Enables or disable the bot output on the chat.
set.conOutput = true; //Enable or disables connection messages on chat.
set.ignorebot = false; //Enable or disables if the messages sent by the bot are ignored.

//Personalization
set.testresponse = 'pong!'; //Change the message send as a response to the test command
set.selfilesext = 'both' //To select which files search, can be: both, audio, video.
//Set startup messages to be send when connected.
set.conmsg = [`Greetings, ${botUsername} is connected, created by @Harunoki__48.`, `To add a file to the queue use the command "${prefix}play" then the name of the file.`];
set.npmsg = 'Now Playing'; //Message to be send in queue for the now playing file.
set.nqmsg = 'Next in queue'; //Message to be send in queue for next the file in queue.
set.epmsg = 'you didn\'t specify what to play, try again.' //Message to be send when play command is sent empty

//Commands
set.prefix = '!'; //Change the prefix for the commands, by defaut they start with !
set.playcmd = 'play'; //Command for playing files.
set.queuecmd = 'queue'; //Command for show list of files in queue.
set.testcmd = 'ping'; //Change the test command

//Debugging Settings
set.debugOutput = false; //Enables or disable the bot debug output on console.
set.decisionDebug = false; //Enables or disable the bot debug output on console related to the decisions when bot returns multiple results.
set.searchDebug = false; //Enables or disable the bot debug output on console related to the file search results.

module.exports={set}
