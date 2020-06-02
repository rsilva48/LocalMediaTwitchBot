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
set.lang = 'es' //Sets help language. Can be en or es

//Commands
set.prefix = '!'; //Change the prefix for the commands, by defaut they start with !
set.playcmd = 'play'; //Command for playing files.
set.npcmd = 'np'; //Now playing command
set.queuecmd = 'list'; //Command for show list of files in queue.
set.creditscmd = 'info'; //Command that show bot info.
set.helpcmd = 'help'; //Comand that shows help.
set.testcmd = 'hola'; //Change the test command
set.stopcmd = 'stop'; //Stop receiving requests from play command.
set.resumecmd = 'resume'; //Resume receiving request from play command.
set.resetrccmd = 'reset'; //Reset request counter.
set.requestscmd = 'requests'; //See how many requests the user have used, and how many remain.
set.rmvcmd = 'remove'; //Remove song from queue.
set.unlrq = 'unlimit'; //Unlimit how many requests a user can do.
set.lrq = 'limit'; //Limit how many requests a user can do.

//Personalization
set.testresponse = 'Hola!'; //Change the message send as a response to the test command
set.selfilesext = 'both'; //To select which files search, can be: both, audio, video.
set.rlimit = 3; //Set request limit per user.
set.csrh = "0"; //Set what message to be send to cancel a search.
//Set startup messages to be send when connected.
set.cnnmsg = [`Buenas, ${set.botUsername} esta conectado, creado por @Harunoki__48.`, `Para añadir una cancion a la cola utilizar el comando "${set.prefix}play" seguido del nombre del anime.`];
set.npmsg = 'Reproduciendo ahora'; //Message to be send in queue for the now playing file.
set.nqmsg = 'Siguente en la cola'; //Message to be send in queue for next the file in queue.
set.chatepmsg = 'no has especificado que deseas reproducir, intenta nuevamente.'; //Message to be send in chat when play command is sent empty
set.eqmsg = 'La cola de reproduccion esta vacia.'; //Empty queue message 
set.stopmsg = 'Las peticiones han sido deshabilitadas.'; //Message to be send when requests are disabled.
set.resumemsg = 'Las peticiones han sido rehabilitadas.'; //Message to be send when request is reenabled.
set.chatsrchnf = 'no se encontraron resultados para'; //Message to be send in chat when no results were found to a play command.
set.atq = 'añadio a la cola'; //Message to be send when a file was added to the queue.
set.chatrs = ["hay varios resultados para", "¿Cual desea reproducir? Para cancelar la busqueda envíe"]; //Message to be send when there's a results selection.
set.chatcsrch = 'has cancelado tu busqueda.'; //Message to be send in chat when user cancel a search.
set.psmsg = 'tienes una seleccion pendiente.'; //Message to be send when there's a pending selection.
set.rmmsg = ['has pedido', 'veces.', 'tienes', 'peticiones restantes.', 'vez', 'Haz alcanzado el limite.']; //Messages to be send when user ask for how many requests have been done.
set.nrqmsg = 'no has hecho ninguna peticion.' //Message to be send when there's no request done by the user
set.rlimitrmsg = 'has alcanzado el limite de peticiones.' //Message to be send when the user reached the requests limit.
set.resetrcmsg = 'Se ha reiniciado el contador de peticiones.' //Message to be sent when requests counter is resetted.
set.ownnerrlmsg = 'Eres el dueño del canal no tienes limites.' //Message to be send when the channel owner uses the request command.
set.botignmsg = 'Los mensajes del bot estan siendo ignorados.' //Message to be displayed in console when bot messages are being ignored.
set.ulusermsg = 'tus peticiones han sido ilimitadas.' //Message to be send when viewer use request command and owner unlimited number of requests for them.
set.lusermsg = 'tus peticiones han sido limitadas.' //Message to be send when owner limited number of requests for a viewer.
set.alusermsg = 'ya esta limitado.' //Message to be send when owner tries to limit number of requests for a already limited viewer.
set.aulusermsg = 'ya esta ilimitado.' //Message to be send when owner tries to limit number of requests for a already unlimited viewer.

//Debugging Settings
set.debugOutput = false; //Enables or disable the bot debug output on console.
set.decisionDebug = false; //Enables or disable the bot debug output on console related to the decisions when bot returns multiple results.
set.searchDebug = false; //Enables or disable the bot debug output on console related to the file search results.
set.conepmsg = 'envio el comando play vacio.'; //Message to be displayed in console when play command is sent empty
set.consrchnf = 'no encontro resultados para'; //Message to be displayed on console when no results were found to a play command
set.conrs = ["busco", "con varios resultados."]; //Message to be send when there's a results selection.
set.concsrch = 'canceló la busqueda.'; //Message to be send in chat when user cancel a search.
set.results = 'Resultados:'; //Message to be displayed on console when a user searches using play

module.exports = set;
