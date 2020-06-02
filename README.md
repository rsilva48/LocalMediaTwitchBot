# Local Media Twitch Bot
Twitch Bot that adds files that are locally stored on a drive to a media player playlist or queue.

Viewers can use commands to add files to the media player playlist, they're limited by default to a certain number of requests.

Supported players: MPC-HC and PotPlayer.

## Installation

### Downloading releases

* Download the latest release here: https://github.com/Harunoki/LocalMediaTwitchBot/releases/latest/ or selecting your platform below:
  * **Windows**: https://github.com/Harunoki/LocalMediaTwitchBot/releases/latest/download/Win.zip
  * **Linux**: https://github.com/Harunoki/LocalMediaTwitchBot/releases/latest/download/Linux.zip
  * **macOS**: https://github.com/Harunoki/LocalMediaTwitchBot/releases/latest/download/macOS.zip

* Extract the .zip file and modify **settings.js**.


### Downloading source code
* Clone the repo or download it as a zip and extract it.

* Install Node.js, you can get it here: https://nodejs.org/.

* Modify the **settingstemplate.js** and save it as **settings.js**.


To install the dependencies use the following command on the CLI:
```
npm install
```

## How to use

### Using release executable

Run the **localmediatwitchbot-**_platfform_ executable after the configuration of **settings.js**.


### Using source code

To run the bot use the following command on the CLI after the configuration of **settings.js**:
```
node index.js
```

### Commands

All of these commands can be edited in settings.js.

* **!play** - To add a file to the queue use the command followed by the name of the file.
* **!ping** - Test command that returns pong! to the chat by default.
* **!queue** - Show a list of files in queue. **WIP**
* **!np** - Show now playing file. **WIP**
* **!stop** - Allows channel owner to disable requests from play command.
* **!resume** - Allows channel owner to enable requests from play command.
* **!reset** - Allows the channel owner to reset the requests count.
* **!unlimit** - Allows the channel owner to unlimit how many requests a viewer can do.
* **!limit** - Allows the channel owner to limit how many requests a viewer can do.

Example:
```
!play some song
!ping //Returns pong! @username
```

## Credits

* This project use **tmi.js**: https://tmijs.com/.

* Twitch Chatbot Documentation: https://dev.twitch.tv/docs/irc/.

* Binaries created using **pkg**: https://github.com/vercel/pkg/.
