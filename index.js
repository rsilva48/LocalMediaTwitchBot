const tmi = require('tmi.js'), path = require('path'), fs = require('fs'), moment = require('moment'), { getVideoDurationInSeconds } = require('get-video-duration');

var songfiles = [], songnames = [], songsjson = [], decisiones = [], queue = [], requests = true, rcount = [], urcount = 0;

//Import Settings from settings.js.
const set = require(process.cwd() + '/settings.js'), helpmsg = require('./help.js');

//File Extensions.
var filesext = []
const vidext = ['.mp4', '.mkv', '.flv', '.webm', '.avi', '.wmv', '.mgp', '.mpeg'];
const audext = ['.mp3', '.mka', '.flac', '.wav', '.aac', '.ogg', '.mp2', '.ac3'];
if (set.selfilesext === 'both') {
  filesext = vidext.concat(audext);
} else if (set.selfilesext === 'audio') {
  filesext = audext;
} else if (set.selfilesext === 'video') {
  filesext = vidext
} else {
  filesext = []
}


//TMI Settings.
const options = {
  options: {
    debug: set.debugOutput,
  },
  connection: {
    cluster: 'aws',
    reconnect: true,
  },
  identity: {
    username: set.botUsername,
    password: set.oauthpass
  },
  channels: [set.channelname],
};

//Create TMI Client.
const client = new tmi.client(options);

//Console output function.
function con(output) {
  if (set.conOutput) { console.log(output) };
}

//Debug console output function.
function debug(output) {
  if (set.debugOutput) { console.log(output) };
}

//Scans each Media Directory.
con('Indexing files...')
debug('Lista de archivos:');
set.mdirs.forEach(function (mdir) {
  fs.readdir(mdir, function (err, archivos) {
    if (err) { return console('Error al escanear el directorio' + err); }
    debug('Lista de archivos:')
    var i = 0;
    archivos.forEach(function (archivo) {
      var ext = path.extname(archivo);
      var basesong = path.basename(archivo, ext);
      if (ext.startsWith('.')) {
        filesext.forEach(function (searchext) {
          if (searchext.toLowerCase() == ext.toLowerCase()) {
            songfiles.push(archivo);
            getVideoDurationInSeconds(`${mdir}${basesong}${ext}`).then((duration) => {
              var songjson = {
                id: i,
                name: basesong,
                extension: ext,
                dir: mdir,
                fullpath: mdir + basesong + ext,
                duration: duration
              }
              songsjson.push(songjson);
              //debug('json:');
              debug(songjson);
            })
            debug(`[${i + 1}]. ${basesong}`);
            debug(`${mdir}${basesong}${ext}`)
            songnames.push(basesong);
            i += 1;
          }
        })
      }
    }
    )
    if (set.searchDebug) { console.log(songsjson); }
  });
})
con('Files indexed.')

//Add selected file to the player queue.
function addtoqueue(filejson, username) {
  urqcount = 0;
  var urqc = {};
  rcount.forEach(function (rq) {
    if (set.channelname.toLowerCase() === username.toLowerCase()) {
      urcount = 0;
    }
    else if (rq.username.toLowerCase() == username.toLowerCase()) {
      urqcount++;
      if (typeof rq.count == 'number' && rq.count !== 0) {
        rq.count++;
      }
    }
  })
  if (urqcount == 0) {
    urqc.username = username;
    urqc.count = 1;
    rcount.push(urqc)
  }
  queue.push(filejson);
  //Media Player Commands
  var pp = `"${set.mp}" "${filejson.fullpath}" /add`;
  var mpc = `"${set.mp}" "${filejson.fullpath}" /add /fullscreen`;
  var { exec } = require("child_process");
  if (path.basename(set.mp) == 'mpc-hc64.exe' || path.basename(set.mp) == 'mpc-hc.exe') {
    console.log(`* ${mpc}`);
    exec(mpc);
  }
  if (path.basename(set.mp) == 'PotPlayerMini64.exe' || path.basename(set.mp) == 'PotPlayerMini.exe') {
    console.log(`* ${pp}`);
    exec(pp);
  }
};

//Set functions for message and connection.
client.on('message', message);
client.on('connected', connected);
//Establish connection
client.connect();

//Connected function.
function connected(address, port) {
  set.cnnmsg.forEach(function (msg) {
    if (set.chatOutput) { client.action(set.channelname, msg); }
  })
};


//Message function.
function message(channel, tags, msg, self) {
  //Resets user request count
  urcount = 0;
  //Ignore Bot own messages
  if (set.ignorebot) {
    con(set.botignmsg);
    if (self) { return; }
    if (tags.username == set.botUsername.toLowerCase()) {
      return;
    };
  }

  //Log chat to chatlog,txt
  fs.appendFileSync(process.cwd() + '/chatlog.txt', msg + '\n', "UTF-8", { 'flags': 'a+' });

  //Gets the messages of the chat and turn it to lower case to be then processed.
  const comando = msg.trim().toLowerCase();

  //Command output function.
  function comandos(comando) {
    console.log(`* Command: ${comando}`);
  };

  //Function to send a message in chat.
  function chat(message) {
    if (set.chatOutput) {
      client.say(channel, message);
    }
  }

  //Function that searches for the play command.
  function search() {
    var busqueda = comando.substr(6);
    if (busqueda == '' || busqueda == ' ') {
      chat(`@${tags.username} ${set.chatepmsg}`);
      con(`* ${tags.username} ${set.conepmsg}`);
      return;
    }

    if (set.searchDebug) {
      songnames.forEach(function (song) {
        con(song.toLowerCase())
        con(song.toLowerCase().includes(busqueda))
      })
    }

    var resultados = songfiles.filter(function (archivo) { return archivo.toLowerCase().includes(busqueda); })
    con(`\n* ${set.results}`)
    con(resultados)

    if (resultados.length == 0 || resultados === undefined) {
      chat(`@${tags.username} ${set.chatsrchnf} "${busqueda}".`);
      con(`* ${tags.username} ${set.consrchnf} "${busqueda}".`);
    } else if (resultados.length == 1) {
      songsjson.forEach(function (songjson) {
        if (songjson.name + songjson.extension == resultados[0]) {
          addtoqueue(songjson, tags.username);
          var ext = path.extname(resultados[0]);
          chat(`@${tags.username} ${set.atq} "${path.basename(resultados[0], ext)}"`);
          con(`* ${tags.username} ${set.atq} "${path.basename(resultados[0], ext)}"`);
        }
      })

    } else if (resultados.length > 1) {
      var opciones = '';
      resultados.forEach(function (cancion, i) {
        var ext = path.extname(cancion);
        opciones += `\n[${i + 1}]. ${path.basename(cancion, ext)},`;
      })
      decisiones.push({
        'username': `${tags.username}`,
        'opciones': resultados,
        'busqueda': busqueda,
        'opcioneschat': opciones
      });
      if (set.decisionDebug) {
        console.log('\n* Decisiones:');
        con(decisiones)
        con('\n* Decisiones length:');
        con(decisiones.length);
      }
      chat(`@${tags.username} ${set.chatrs[0]}  "${busqueda}": ${opciones}. ${set.chatrs[1]} "${set.csrh}"`);
      con(`* ${tags.username} ${set.conrs[0]} "${busqueda}" ${set.conrs[1]}`);
    }
    else {
      debug('Error')
    }
  }

  //Test Command.
  if (comando === `${set.prefix}${set.testcmd}`) {
    comandos(comando);
    chat(`${set.testresponse} @${tags.username}`);
    con(`* ${tags.username} ${set.testcmd} ${set.testresponse}`);
  }

  //Stop Command.
  if (comando === set.prefix + set.stopcmd && requests === true && set.channelname.toLowerCase() === tags.username.toLowerCase()) {
    requests = false;
    chat(set.stopmsg);
    con(set.stopmsg);
  }

  //Resume Command.
  if (comando === set.prefix + set.resumecmd && requests === false && set.channelname.toLowerCase() === tags.username.toLowerCase()) {
    requests = true;
    chat(set.resumemsg);
    con(set.resumemsg);
  }

  //Queue Command.
  if (comando === set.prefix + set.queuecmd || comando === set.prefix + set.npcmd) {
    debug(queue);
    var qchat = ''
    if (queue.length === 0) {
      chat(`${set.eqmsg}`);
    }
    else {
      queue.forEach(function (qsong, qc) {
        if (qc == 0) {
          qchat += (`${set.npmsg}: ${qsong.name}`)
        }
        else if (qc == 1 && comando != set.prefix + set.npcmd) {
          qchat += (`, ${set.nqmsg}: [${qc}]. ${qsong.name}`)
        }
        else if (comando != set.prefix + set.npcmd) {
          qchat += (`, [${qc}]. ${qsong.name}`)
        }
      })
      chat(qchat);
    }
  }

  //Help Command
  if (comando === set.prefix + set.helpcmd) {
    chat(helpmsg);
  }

  //Reset Limit Command
  if (comando === set.prefix + set.resetrccmd && set.channelname.toLowerCase() === tags.username.toLowerCase()) {
    rcount = [];
    chat(set.resetrcmsg);
  }

  //Requests Command
  if (comando === set.prefix + set.requestscmd) {
    var matches = 0;
    if (set.channelname.toLowerCase() === tags.username.toLowerCase()) {
      chat(`@${tags.username} ${set.ownnerrlmsg}`);
    }
    else {
      rcount.forEach(function (rq) {
        if (rq.username.toLowerCase() === tags.username.toLowerCase()) {
          matches++;
          if (rq.count === 1) {
            chat(`@${tags.username} ${set.rmmsg[0]} ${rq.count} ${set.rmmsg[4]} ${set.rmmsg[2]} ${set.rlimit - rq.count} ${set.rmmsg[3]}`);
          }
          else if (rq.count === set.rlimit) {
            chat(`@${tags.username} ${set.rmmsg[0]} ${rq.count} ${set.rmmsg[1]} ${set.rmmsg[5]}`);
          }
          else {
            chat(`@${tags.username} ${set.rmmsg[0]} ${rq.count} ${set.rmmsg[1]} ${set.rmmsg[2]} ${set.rlimit - rq.count} ${set.rmmsg[3]}`);
          }
        }
      })
      if (matches === 0) {
        chat(`@${tags.username} ${set.nrqmsg} ${set.rmmsg[2]} ${set.rlimit} ${set.rmmsg[3]}`);
      }
    }
  }

  //Set user request count urcount variable
  if (comando.startsWith(set.prefix + set.playcmd + ' ')) {
    if (set.channelname.toLowerCase() === tags.username.toLowerCase()) {
      urcount = 0;
    }
    else {
      rcount.forEach(function (rq) {
        if (rq.username.toLowerCase() === tags.username.toLowerCase()) {
          urcount = rq.count;
        }
      })
    }
  }

  //Decision selection.
  if (decisiones.length >= 1 && !comando.startsWith(set.prefix)) {
    if (set.decisionDebug) {
      console.log('\n* Decisiones length:');
      con(decisiones.length);
      con('Seleccion:')
    }
    decisiones.forEach(function (decision, i) {
      if (set.decisionDebug) { con(decision.username); }
      if (decision.username == tags.username) {
        if (comando == set.csrh) {
          chat(`@${tags.username} ${set.chatcsrch}`);
          con(`* ${tags.username} ${set.concsrch}`);
          if (set.decisionDebug) {
            console.log('Busqueda');
            con(decision.busqueda)
          }
          //Erases the decision once fullfiled
          decisiones = decisiones.filter(function (value, index, arr) {
            return !(value.busqueda == decision.busqueda && value.username == decision.username);
          })
        }
        decision.opciones.forEach(function (elecciones, j) {
          if (set.decisionDebug) { console.log(j + ' ' + elecciones) }
          if (comando == `${j + 1}`) {
            songsjson.forEach(function (song) {
              if (song.name + song.extension == elecciones) {
                addtoqueue(song, tags.username);
              }
            })
            var ext = path.extname(elecciones);
            chat(`@${tags.username} ${set.atq} "${path.basename(elecciones, ext)}"`);
            con(`* ${tags.username} ${set.atq} "${path.basename(elecciones, ext)}"`);
            //Erases the decision once fullfiled
            decisiones = decisiones.filter(function (value, index, arr) {
              return !(value.busqueda == decision.busqueda && value.username == decision.username);
            })
          }
          if (set.decisionDebug) {
            console.log('Busqueda');
            con(decision.busqueda)
          }
        })
      }
    })
  }
  else if (comando.startsWith(set.prefix + set.playcmd + ' ')) {
    comandos(comando);
    // Pending selection check.
    if (decisiones.length >= 1) {
      con('Pending selection check')
      var matches = 0;
      decisiones.forEach(function (decision) {
        if (decision.username == tags.username) {
          con(`* Pending selection for @${decision.username}:`)
          con(`* Pending selections :${decision.opciones}`)
          matches++;
          if (set.chatOutput) {
            chat(`@${tags.username} ${set.psmsg}`);
            chat(`@${tags.username} ${set.chatrs[0]}  "${decision.busqueda}": ${decision.opcioneschat}. ${set.chatrs[1]} "${set.csrh}"`);
          }
        }
      })
      if (matches === 0 && requests === true && urcount < set.rlimit) {
        search();
      }
    } else if (requests === true && urcount < set.rlimit) {
      search();
    }
    else if (requests === false) {
      chat(`@${tags.username} ` + set.stopmsg);
    }
    else {
      chat(`@${tags.username} ` + set.rlimitrmsg);
    }
    return;
  }
}
