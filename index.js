const tmi = require('tmi.js'), path = require('path'), fs = require('fs'), { getAudioDurationInSeconds } = require('get-audio-duration')

var songfiles = [], songnames = [], songsjson = [], decisiones = [], queue = [];

//Import Settings from settings.js
const settings = require(process.cwd() + '/settings.js');
const mp = settings.set.mp;
const mdirs = settings.set.mdirs;
const channelname = settings.set.channelname;
const botUsername = settings.set.botUsername;
const oauthpass = settings.set.oauthpass
const chatOutput = settings.set.chatOutput;
const debugOutput = settings.set.debugOutput;
const decisionDebug = settings.set.decisionDebug;
const searchDebug = settings.set.searchDebug;
const conmsg = settings.set.conmsg;
const ignorebot = settings.set.conmsg;
const prefix = settings.set.prefix;
const testcmd = settings.set.testcmd;
const testresponse = settings.set.testresponse;
const selfilesext = settings.set.selfilesext;
const conOutput = settings.set.conOutput;
const npmsg = settings.set.npmsg;
const nqmsg = settings.set.nqmsg;
const playcmd = settings.set.playcmd;
const queuecmd = settings.set.queuecmd;
const epmsg = settings.set.epmsg;
//End of Settings

//File Extensions
var filesext = []
const vidext = ['.mp4', '.mkv', '.flv', '.webm', '.avi', '.wmv', '.mgp', '.mpeg'];
const audext = ['.mp3', '.mka', '.flac', '.wav', '.aac', '.ogg', '.mp2', '.ac3'];
if (selfilesext === 'both') {
  filesext = vidext.concat(audext);
} else if (selfilesext === 'audio') {
  filesext = audext;
} else if (selfilesext === 'video') {
  filesext = vidext
} else {
  filesext = []
}


//TMI Settings
const options = {
  options: {
    debug: debugOutput,
  },
  connection: {
    cluster: 'aws',
    reconnect: true,
  },
  identity: {
    username: botUsername,
    password: oauthpass
  },
  channels: [channelname],
};

//Create TMI Client
const client = new tmi.client(options);

function con(output) {
  if (conOutput) { console.log(output) };
}
function debug(output) {
  if (debugOutput) { console.log(output) }
}

//Scans each Media Directory
con('Indexing files...')
debug('Lista de archivos:');
mdirs.forEach(function (mdir) {
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
            getAudioDurationInSeconds(`${mdir}${basesong}${ext}`).then((duration) => {
              var songjson = {
                id: i,
                name: basesong,
                extension: ext,
                dir: mdir,
                fullpath: mdir + basesong + ext,
                duration: duration
              };
              songsjson.push(songjson);
              debug('json:');
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
    if (searchDebug) { console.log(songsjson); }
  });
})
con('Files indexed.')

//Add selected file to the player queue
function addtoqueue(filejson) {
  queue.push(filejson);
  //Media Player Commands
  var pp = `"${mp}" "${filejson.fullpath}" /add`;
  var mpc = `"${mp}" "${filejson.fullpath}" /add /fullscreen`;
  var { exec } = require("child_process");
  if (path.basename(mp) == 'mpc-hc64.exe' || path.basename(mp) == 'mpc-hc.exe') {
    console.log(`* ${mpc}`);
    exec(mpc);
  }
  if (path.basename(mp) == 'PotPlayerMini64.exe' || path.basename(mp) == 'PotPlayerMini.exe') {
    console.log(`* ${pp}`);
    exec(pp);
  }
};

//Set functions for message and connection
client.on('message', message);
client.on('connected', connected);
//Establish connection
client.connect();

//Connected function
function connected(address, port) {
  conmsg.forEach(function (msg) {
    if (chatOutput) { client.action(channelname, msg); }
  })
};


//Message function
function message(channel, tags, msg, self) {
  //Ignore Bot own messages
  if (ignorebot) {
    if (self) { return; }
    if (tags.username == botUsername.toLowerCase()) {
      return;
    };
  }

  //Gets the messages of the chat and turn it to lower case to be then processed.
  const comando = msg.trim().toLowerCase();

  //Command output function
  function comandos(comando) {
    console.log(`* Command: ${comando}`);
  };

  //Function to send a message in chat
  function chat(message) {
    if (chatOutput) {
      client.say(channel, message);
    }
  }

  function searchsong() {
    var busqueda = comando.substr(6);
    if (busqueda == '' || busqueda == ' ') {
      chat(`@${tags.username} ${epmsg}`);
      con(`* ${tags.username} sent play command empty.`);
      return;
    }

    if (searchDebug) {
      songnames.forEach(function (song) {
        con(song.toLowerCase())
        con(song.toLowerCase().includes(busqueda))
      })
    }

    var resultados = songfiles.filter(function (archivo) { return archivo.toLowerCase().includes(busqueda); })
    con('\n* Resultados:')
    con(resultados)

    if (resultados.length == 0 || resultados === undefined) {
      chat(`@${tags.username} no se encontraron resultados para "${busqueda}".`);
      con(`* ${tags.username} busco "${busqueda}" sin resultados.`);
    } else if (resultados.length == 1) {
      songsjson.forEach(function (songjson) {
        if (songjson.name + songjson.extension == resultados[0]) {
          addtoqueue(songjson);
          var ext = path.extname(resultados[0]);
          chat(`@${tags.username} ha añadido ${path.basename(resultados[0], ext)} a la cola.`);
          con(`* ${tags.username} añadio ${path.basename(resultados[0], ext)}" a la cola.`);
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
      if (decisionDebug) {
        console.log('\n* Decisiones:');
        con(decisiones)
        con('\n* Decisiones length:');
        con(decisiones.length);
      }
      chat(`@${tags.username} hay varios resultados para  "${busqueda}": ${opciones}\n. ¿Cual desea reproducir? Para cancelar la busqueda envíe "0"`);
      con(`* ${tags.username} busco "${busqueda}" con varios resultados.`);
    }
    else {
      debug('Error')
    }
  }

  //Test Command
  if (comando === `${prefix}${testcmd}`) {
    comandos(comando);
    chat(`${testresponse} @${tags.username}`);
    con(`* ${tags.username} ${testcmnd} ${testresponse}`);
  };

  //Queue Command
  if (comando === `${prefix}${queuecmd}`) {
    debug(queue);
    var qchat = ''
    queue.forEach(function (qsong, qc) {
      if (qc == 0) {
        qchat += (`${npmsg}: ${qsong.name}`)
      }
      else if (qc == 1) {
        qchat += (`, ${nqmsg}: [${qc}]. ${qsong.name}`)
      }
      else {
        qchat += (`, [${qc}]. ${qsong.name}`)
      }
    })
    chat(qchat);
  }

  //Decision selection
  if (decisiones.length >= 1 && !comando.startsWith(`${prefix}${playcmd} `)) {
    if (decisionDebug) {
      console.log('\n* Decisiones length:');
      con(decisiones.length);
      con('Seleccion:')
    }
    decisiones.forEach(function (decision, i) {
      if (decisionDebug) { con(decision.username); }
      if (decision.username == tags.username) {
        if (comando == 0) {
          chat(`@${tags.username} has cancelado tu busqueda.`);
          con(`* ${tags.username} canceló la busqueda.`);
          if (decisionDebug) {
            console.log('Busqueda');
            con(decision.busqueda)
          }
          //Erases the decision once fullfiled
          decisiones = decisiones.filter(function (value, index, arr) {
            return !(value.busqueda == decision.busqueda && value.username == decision.username);
          })
        }
        decision.opciones.forEach(function (elecciones, j) {
          if (decisionDebug) { console.log(j + ' ' + elecciones) }
          if (comando == j + 1) {
            songsjson.forEach(function (song) {
              if (song.name + song.extension == elecciones) {
                addtoqueue(song);
              }
            })
            var ext = path.extname(elecciones);
            chat(`@${tags.username} ha añadido ${path.basename(elecciones, ext)} a la cola.`);
          }
          con(`* ${tags.username} añadio ${path.basename(elecciones, ext)}" a la cola.`);
          if (decisionDebug) {
            console.log('Busqueda');
            con(decision.busqueda)
          }
          //Erases the decision once fullfiled
          decisiones = decisiones.filter(function (value, index, arr) {
            return !(value.busqueda == decision.busqueda && value.username == decision.username);
          })
        })
      }
    })
  }
  else if (comando.startsWith(`${prefix}${playcmd} `)) {
    comandos(comando);
    // Pending selection check
    if (decisiones.length >= 1) {
      con('Pending selection check')
      var matches = 0;
      decisiones.forEach(function (decision) {
        if (decision.username == tags.username) {
          con(`* Pending selection for @${decision.username}:`)
          con(`* Pending selections :${decision.opciones}`)
          matches++;
          if (chatOutput) {
            chat(`@${tags.username} Tienes una cancion pendiente por elegir.`);
            chat(`@${tags.username} hay varios resultados para  "${decision.busqueda}": ${decision.opcioneschat}\n. ¿Cual desea reproducir? Para cancelar la busqueda envíe "0"`);
          }
        }
      })
      if (matches == 0) {
        searchsong();
      }
    } else {
      searchsong();
    }
    return;
  }
}
